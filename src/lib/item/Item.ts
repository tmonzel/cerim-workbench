
import { calcAttributeScaling, getScalingId, list } from '$lib/core';
import { AffinityType, AttackType, AttributeType, DamageType, GuardType, StatusEffectType, type Attack, type AttributeDamageScaling, type AttributeMutation, type DamageNegation, type Guard, type Resistance, type UpgradeSchema } from '$lib/core/types';
import { attackCorrectRecord, spEffectsMap, upgradeSchemata } from '$lib/data';
import { mutationRecord, presetRecord } from '$lib/records';
import { FlatModifier } from './modifiers/FlatModifier';
import { PercentualModifier } from './modifiers/PercentualModifier';
import type { ItemAttackInfo, ItemCategory, ItemConfig, ItemData, ItemModifierData, ItemPreset, ItemRequirements, ModifierType } from './types';

export class Item {
  readonly type: string;
  readonly name: string;
  readonly group: string;
  readonly weight: number;
  readonly category: ItemCategory;

  tier: number;
  possibleUpgrades: number;
  requirements: ItemRequirements;
  attackInfo: ItemAttackInfo;

  attack?: Attack;
  attackMutations: Partial<Record<AttackType, AttributeMutation[]>> = {};
  scaledAttack?: Attack;

  affinity?: AffinityType;
  scaling?: AttributeDamageScaling;
  config!: ItemConfig;
  guard?: Guard;
  resistance?: Resistance;
  damageNegation?: DamageNegation;
  affinities?: Partial<Record<AffinityType, ItemConfig>>;
  
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
    protected def: ItemData,
  ) {
    this.type = def.type;
    this.name = def.name;
    this.group = def.group;
    this.category = def.category;
    this.tier = def.tier ?? 0;
    this.iconUrl = def.iconUrl;
    this.weight = def.weight ?? 0;
    this.possibleUpgrades = def.upgrades ? def.upgrades.length : 0;
    this.description = def.description;
    this.requirements = def.requirements ?? {};
    this.effects = def.effects;
    this.attackSpeed = def.attackSpeed;
    this.damageNegation = def.damageNegation;
    this.resistance = def.resistance;
    this.guard = def.guard;
    this.affinities = def.affinities;
    this.attackInfo = def.attackInfo ?? {};

    if(def.modifiers) {
      this.setModifiers(def.modifiers);
    }

    /*if(def.defaults) {
      if(typeof def.defaults === 'string') {
        this.applyPreset(presetRecord[def.defaults]);
      } else {
        this.applyPreset(def.defaults);
      }
    }*/

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
    if(!this.affinities || !this.affinities[affinity]) {
      return;
    }

    this.affinity = affinity;
    this.applyConfig(this.affinities[affinity]);
  }

  applyPreset(preset: ItemPreset): void {
    if(preset.base) {
      Object.assign(preset, presetRecord[preset.base]);
    }

    /*if(preset.affinities) {
      for(const aff of list(preset.affinities)) {
        if(this.affinities && this.affinities[aff.key]) {
          this.affinities[aff.key] = { ...preset.affinities[aff.key], ...this.affinities[aff.key] }

          if(preset.config) {
            for(const configAff of list(preset.config)) {
              if(this.affinities[aff.key][configAff.key]) {
                Object.assign(this.affinities[aff.key][configAff.key], configAff.value);
                //this.affinities[aff.key][configAff.key] = { ...this.affinities[aff.key][configAff.key], ...configAff.value };
              } else {
                this.affinities[aff.key][configAff.key] = configAff.value;
              }
            }
          }
        }
      }
    }*/

    /*if(preset.maxTiers !== undefined && this.possibleUpgrades === 0) {
      this.possibleUpgrades = preset.maxTiers;
    }*/
  }

  applyConfig(config: ItemConfig): void {
    this.config = config;
    this.update();
  }

  setModifiers(modifiers: Record<ModifierType, ItemModifierData>): void {
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
        for(const t of Object.values(AttackType)) {
          this.attackMutations[t] = mutationRecord[this.config.mutations];
        }
      } else if(Array.isArray(this.config.mutations)) {
        for(const t of Object.values(AttackType)) {
          this.attackMutations[t] = this.config.mutations as AttributeMutation[];
        }
      } else if(typeof this.config.mutations === 'object') {
        for(const t of Object.values(AttackType)) {
          this.attackMutations[t] = this.config.mutations[t] ? mutationRecord[this.config.mutations[t]] : mutationRecord['0'];
        }
      }
    } else {
      for(const t of Object.values(AttackType)) {
        this.attackMutations[t] = mutationRecord['0'];
      }
    }

    if(this.config.apply) {
      this.statusEffects = {};

      for(const id of this.config.apply) {
        const upgradedId = id >= 105000 ? id + this.tier : id;

        if(!spEffectsMap.has(upgradedId)) {
          continue;
        }

        Object.assign(this.statusEffects, spEffectsMap.get(upgradedId));
      }
    }

    const schema: UpgradeSchema = typeof this.config.schema === 'string' ? upgradeSchemata[this.config.schema] : upgradeSchemata['0'];
    
    if(!schema) {
      return;
    }

    this.possibleUpgrades = schema.tiers ?? 25;
    
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
        const multiplier = schema.attack[t][this.tier];
        //const diff = multiplierRange[1] - multiplierRange[0];

        //const multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
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

      const scalingAttributes = [
        AttributeType.STRENGTH, 
        AttributeType.DEXTERITY,
        AttributeType.INTELLIGENCE,
        AttributeType.FAITH,
        AttributeType.ARCANE
      ];

      for(const attrType of scalingAttributes) {
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

          const attackCorrect = attackCorrectRecord[this.config.attackCorrectId ?? '0'];

          switch(attrType) {
            case AttributeType.STRENGTH:
              allowedDamageTypes = attackCorrect.str;
              break;
            case AttributeType.DEXTERITY:
              allowedDamageTypes = attackCorrect.dex;
            break;
            case AttributeType.INTELLIGENCE:
              allowedDamageTypes = [...attackCorrect.int, AttackType.SORCERY];
            break;
            case AttributeType.FAITH:
              allowedDamageTypes = [...attackCorrect.fth, AttackType.INCANTATION];
              break;
            case AttributeType.ARCANE:
              allowedDamageTypes = attackCorrect.arc;
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
        
        const attrScaling = calcAttributeScaling(attrTotal, this.attackMutations[damageType] ?? []) / 100;
        const upgradeScaling = attrScale.base / 100;

        let elementBase = this.attack[damageType] ?? 0;
        elementBase *= attrScaling;
        elementBase *= upgradeScaling;

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