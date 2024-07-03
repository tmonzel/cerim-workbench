
import { calcAttributeScaling, getScalingId, list } from '$lib/core';
import { AffinityType, AttackType, AttributeType, DamageType, GuardType, StatusEffectType, type Attack, type AttributeDamageScaling, type AttributeMutation, type Defense, type Guard, type Resistance, type UpgradeSchema } from '$lib/core/types';
import { upgradeSchemata } from '$lib/data';
import { affinityRecord, mutationRecord, presetRecord } from '$lib/records';
import { FlatModifier } from './modifiers/FlatModifier';
import { PercentualModifier } from './modifiers/PercentualModifier';
import type { ItemAttackInfo, ItemConfig, ItemDef, ItemModifierDef, ItemPreset, ItemRequirements, ModifierType } from './types';

export class Item {
  readonly type: string;
  readonly name: string;
  readonly weight: number;
  readonly group: string;

  tier: number;
  possibleUpgrades: number;
  requirements: ItemRequirements;
  attackInfo: ItemAttackInfo;

  attack?: Attack;
  scaledAttack?: Attack;

  affinity: AffinityType = AffinityType.STANDARD;
  scaling?: AttributeDamageScaling;
  config!: ItemConfig;
  guard?: Guard;
  resistance?: Resistance;
  defense?: Defense;
  affinities?: Record<AffinityType, ItemConfig>;
  mutations: AttributeMutation[] = [];
  upgradeSchema?: UpgradeSchema;
  modifiers: (PercentualModifier | FlatModifier)[] = [];
  iconUrl?: string;
  crit?: number;
  statusEffects?: Partial<Record<StatusEffectType, number>>;
  description?: string;
  effects?: string[];
  attackSpeed?: number;

  constructor(
    readonly id: string, 
    protected def: ItemDef,
  ) {
    this.type = def.type;
    this.name = def.name;
    this.tier = def.tier ?? 0;
    this.iconUrl = def.iconUrl;
    this.weight = def.weight ?? 0;
    this.possibleUpgrades = def.upgrades ? def.upgrades.length : (def.maxTiers ?? 0);
    this.description = def.description;
    this.group = def.group;
    this.requirements = def.requirements ?? {};
    this.effects = def.effects;
    this.attackSpeed = def.attackSpeed;
    this.defense = def.defense;
    this.resistance = def.resistance;
    this.guard = def.guard;
    this.affinities = def.affinities;
    this.attackInfo = def.attackInfo ?? {};

    if(def.modifiers) {
      this.setModifiers(def.modifiers);
    }

    if(def.defaults) {
      if(typeof def.defaults === 'string') {
        this.applyPreset(presetRecord[def.defaults]);
      } else {
        this.applyPreset(def.defaults);
      }
    }

    if(def.config) {
      this.applyConfig(def.config);
    } else {
      this.changeAffinity(AffinityType.STANDARD);
    }

    if(this.isWeapon()) {
      this.attackInfo = { crit: 100, damage: [DamageType.STANDARD], ...this.attackInfo }
    }
  }

  isWeapon(): boolean {
    return this.attack !== undefined;
  }

  changeAffinity(affinity: AffinityType): void {
    if(!this.def.affinities || !this.def.affinities[affinity]) {
      return;
    }

    this.affinity = affinity;
    this.applyConfig(this.def.affinities[affinity]);
  }

  applyPreset(preset: ItemPreset): void {
    if(preset.affinities) {
      for(const aff of list(preset.affinities)) {
        if(this.affinities && this.affinities[aff.key]) {
          this.affinities[aff.key] = { ...preset.affinities[aff.key], ...this.affinities[aff.key] }
        }
      }
    }

    if(preset.maxTiers !== undefined && this.possibleUpgrades === 0) {
      this.possibleUpgrades = preset.maxTiers;
    }
  }

  applyConfig(config: ItemConfig): void {
    this.config = config;
    this.update();
  }

  setModifiers(modifiers: Record<ModifierType, ItemModifierDef>): void {
    const newModifiers: (FlatModifier | PercentualModifier)[] = [];

    for(const mod of list(modifiers)) {
      switch(mod.key) {
        case 'percentual':
          newModifiers.push(new PercentualModifier(mod.value));
          break;
        case 'flat':
        default:
          newModifiers.push(new FlatModifier(mod.value));
      }
    }

    this.modifiers = newModifiers;
  }

  upgrade(tier: number): void {
    this.tier = tier;

    if(this.def.upgrades && this.tier > 0) {
      const upgrade = this.def.upgrades[this.tier - 1];

      if(upgrade.modifiers) {
        this.setModifiers(upgrade.modifiers);
      }
      
      this.iconUrl = upgrade.iconUrl;

    } else {
      if(this.def.modifiers) {
        this.setModifiers(this.def.modifiers);
      }

      this.iconUrl = this.def.iconUrl;
    }

    this.update();
  }

  update(): void {
    if(!this.config) {
      return;
    }

    if(this.config.guard) {
      this.guard = this.config.guard;
    }

    if(this.config.mutations) {
      if(typeof this.config.mutations === 'string') {
        this.mutations = mutationRecord[this.config.mutations];
      } else {
        this.mutations = this.config.mutations as AttributeMutation[];
      }
    } else {
      this.mutations = mutationRecord['weapon:default'];
    }

    if(this.config.apply) {
      this.statusEffects = {};

      for(const se of list(this.config.apply)) {
        const range = se.value;
        const diff = range[1] - range[0];

        this.statusEffects[se.key] = range[0] + this.tier * (diff / this.possibleUpgrades);
      }
    }

    let schema: UpgradeSchema = {};

    if(this.config.schema) {
      schema = upgradeSchemata[this.config.schema];
    } else {
      schema = upgradeSchemata[affinityRecord[this.affinity] ? affinityRecord[this.affinity].schema : '0'];
    }
    
    if(!this.config.attack || !schema.attack) {
      return;
    }

    const attack: Attack = {};
    const guard: Partial<Guard> = {};
    const maxTiers = this.possibleUpgrades;
    const attributeScaling: Partial<Record<AttributeType, { base: number, allowedDamageTypes: AttackType[] }>> = {};

    if(this.possibleUpgrades > 0) {
      for(const t of Object.values(AttackType)) {
        if(!this.config.attack[t] || !schema.attack[t] || maxTiers === 0) {
          continue;
        }
        
        const base = this.config.attack[t]!;
        const multiplierRange = schema.attack[t];
        const diff = multiplierRange[1] - multiplierRange[0];

        const multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
        attack[t] = base * multiplier;
        
      }

      if(schema.guard && this.config.guard) {
        for(const t of Object.values(GuardType)) {
          if(!this.config.guard[t] || maxTiers === 0 || !schema.guard[t]) {
            continue;
          }
          
          const base = this.config.guard[t];
          const multiplierRange = schema.guard[t];
          const diff = multiplierRange[1] - multiplierRange[0];
  
          const multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
          guard[t] = base * multiplier;
        }

        if(this.guard) {
          this.guard = { ...this.guard, ...guard }
        }
      }

      for(const attrType of Object.values(AttributeType)) {
        if(!schema.scaling || !schema.scaling[attrType] || !this.config.scaling || !this.config.scaling[attrType]) {
          continue
        }

        const scalingVal = this.config.scaling[attrType];

        let base = 0;
        let allowedDamageTypes: AttackType[] = [];

        if(Array.isArray(scalingVal)) {
          base = scalingVal[0];
          allowedDamageTypes = typeof scalingVal[1] === 'string' ? [scalingVal[1]] : scalingVal[1];
        } else {
          base = scalingVal as number;

          switch(attrType) {
            case AttributeType.STRENGTH:
              allowedDamageTypes = [AttackType.PHYSICAL];
              break;
            case AttributeType.DEXTERITY:
              allowedDamageTypes = [AttackType.PHYSICAL, AttackType.LIGHTNING];
            break;
            case AttributeType.INTELLIGENCE:
              allowedDamageTypes = [AttackType.MAGIC, AttackType.PHYSICAL, AttackType.SORCERY];
            break;
            case AttributeType.FAITH:
              allowedDamageTypes = [AttackType.FIRE, AttackType.HOLY, AttackType.INCANTATION];
              break;
            case AttributeType.ARCANE:
              allowedDamageTypes = [AttackType.PHYSICAL];
          }
        }

        const multiplierRange = schema.scaling[attrType];
        let multiplier = 1;

        if(multiplierRange.length > 2) {
          multiplier = multiplierRange[this.tier];
        } else {
          const diff = multiplierRange[1] - multiplierRange[0];
          multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
        }
        
        attributeScaling[attrType] = {
          base: base * multiplier,
          allowedDamageTypes
        };
      }
    }
    
    this.attack = attack;
    this.scaling = attributeScaling;
  }

  getScalingFlags(): { attr: AttributeType; id: string }[] {
    return list(this.scaling ?? {}).map(s => {
      return { attr: s.key as AttributeType, id: getScalingId(s.value.base) };
    });
  }

  checkRequirements(attributes: Partial<Record<AttributeType, number>>): boolean {
    if(!this.requirements.attributes) {
      return true;
    }

    for(const [k, v] of Object.entries(this.requirements.attributes)) {
      const type = k as AttributeType;
      const attrValue = attributes[type] ?? 0;

      if(attrValue < v) {
        return false;
      }
    }

    return true;
  }

  scaleDamage(attributes: Partial<Record<AttributeType, number>>, ignoreRequirements: boolean = false): Attack {
    if(!this.attack || !this.scaling) {
      return {};
    }

    const scaledAttack = { ...this.attack };

    for(const [t, attrScale] of Object.entries(this.scaling)) {
      const attrType = t as AttributeType;

      if(!attributes[attrType] || !this.config.scaling) {
        continue;
      }
      
      const attrTotal = attributes[attrType] ?? 0;
      
      for(const damageType of Object.values(AttackType)) {
        if(!this.attack[damageType] || !attrScale.allowedDamageTypes.includes(damageType)) {
          continue;
        }
        
        const attrScaling = calcAttributeScaling(attrTotal, this.mutations ?? []) / 100;
        const upgradeScaling = attrScale.base / 100;

        let elementBase = this.attack[damageType] ?? 0;
        elementBase *= attrScaling + upgradeScaling;

        if(this.config.cast === 'sorceries' && attrType === AttributeType.INTELLIGENCE) {
          if(this.checkRequirements(attributes) || ignoreRequirements) {
            scaledAttack[AttackType.SORCERY] = (1 + (upgradeScaling * attrScaling)) * 100;
          } else {
            scaledAttack[AttackType.SORCERY] = 60;
          }
        } else if(this.config.cast === 'incantations' && attrType === AttributeType.FAITH) {
          if(this.checkRequirements(attributes) || ignoreRequirements) {
            scaledAttack[AttackType.INCANTATION] = (1 + (upgradeScaling * attrScaling)) * 100;
          } else {
            scaledAttack[AttackType.INCANTATION] = 60;
          }
        } else if(scaledAttack[damageType] !== undefined) {
          scaledAttack[damageType]! += elementBase;
        }
      }
    }

    return scaledAttack
  }

  applyScaling(attributes: Partial<Record<AttributeType, number>>): Item {
    if(!this.scaling || !this.attack) {
      return this;
    }
    
    this.scaledAttack = this.scaleDamage(attributes);

    return this;
  }
}