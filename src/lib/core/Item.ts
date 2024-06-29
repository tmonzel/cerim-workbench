import { AffinityType, DamageType, AttributeType, type Defense, type ItemDef, type ItemRequirements, type Resistance, type Damage, type Guard, type ItemConfig, type AttributeMutation, type ItemPreset, type UpgradeSchema, GuardType, type ModifierType, type ItemModifierDef } from './types';
import type { AttributeState } from '$lib/attributes';
import { calcAttributeScaling, getScalingId, list } from './helpers';
import { mutationRecord, presetRecord, upgradeSchemata } from '$lib/data';
import { PercentualModifier } from './modifiers/PercentualModifier';
import { FlatModifier } from './modifiers/FlatModifier';

export class Item {
  tier = 0;
  
  damage?: Partial<Damage>;
  scaledDamage?: Partial<Damage>;
  affinity: AffinityType = AffinityType.STANDARD;
  scaling?: Partial<Record<AttributeType, { base: number, allowedDamageTypes: DamageType[] }>>;
  config!: ItemConfig;
  guard?: Guard;
  resistance?: Resistance;
  defense?: Defense;
  affinities?: Record<AffinityType, ItemConfig>;
  possibleUpgrades: number = 0;
  mutations: AttributeMutation[] = [];
  upgradeSchema?: UpgradeSchema;
  modifiers: (PercentualModifier | FlatModifier)[] = [];
  iconUrl?: string;

  slotted = false;

  get weight(): number {
    return this.def.weight ?? 0;
  }

  get group(): string {
    return this.def.group;
  }

  get name(): string {
    return this.def.name;
  }

  get type(): string {
    return this.def.type;
  }

  get requirements(): ItemRequirements {
    return this.def.requirements ?? {};
  }

  get description(): string | undefined {
    return this.def.description;
  }

  get effects(): string[] | undefined {
    return this.def.effects;
  }

  get attackSpeed(): number | undefined {
    return this.def.attackSpeed;
  }

  constructor(
    readonly id: string, 
    protected def: ItemDef,
  ) {
    this.tier = this.def.tier ?? 0;
    this.possibleUpgrades = def.maxTiers ?? 0;
    this.iconUrl = this.def.iconUrl;

    if(def.modifiers) {
      this.setModifiers(def.modifiers);
    }

    if(def.resistance) {
      this.resistance = def.resistance;
    }

    if(def.defense) {
      this.defense = def.defense;
    }

    if(def.guard) {
      this.guard = def.guard;
    }

    if(def.affinities) {
      this.affinities = def.affinities;
    }

    if(def.upgrades) {
      this.possibleUpgrades = def.upgrades.length;
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
  }

  isWeapon(): boolean {
    return this.damage !== undefined;
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

    let schema: UpgradeSchema = {};

    if(this.config.schema) {
      schema = upgradeSchemata[this.config.schema];
    } else {
      schema = upgradeSchemata['0'];
    }
    
    if(!this.config.attack || !schema.attack) {
      return;
    }

    const damage: Partial<Damage> = {};
    const guard: Partial<Guard> = {};
    const maxTiers = this.possibleUpgrades;
    const attributeScaling: Partial<Record<AttributeType, { base: number, allowedDamageTypes: DamageType[] }>> = {};

    if(this.possibleUpgrades > 0) {
      for(const t of Object.values(DamageType)) {
        if(!this.config.attack[t] || !schema.attack[t] || maxTiers === 0) {
          continue;
        }
        
        const base = this.config.attack[t]!;
        const multiplierRange = schema.attack[t];
        const diff = multiplierRange[1] - multiplierRange[0];

        const multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
        damage[t] = base * multiplier;
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
        let allowedDamageTypes: DamageType[] = [];

        if(Array.isArray(scalingVal)) {
          base = scalingVal[0];
          allowedDamageTypes = typeof scalingVal[1] === 'string' ? [scalingVal[1]] : scalingVal[1];
        } else {
          base = scalingVal as number;

          switch(attrType) {
            case AttributeType.STRENGTH:
              allowedDamageTypes = [DamageType.PHYSICAL];
              break;
            case AttributeType.DEXTERITY:
              allowedDamageTypes = [DamageType.PHYSICAL, DamageType.LIGHTNING];
            break;
            case AttributeType.INTELLIGENCE:
              allowedDamageTypes = [DamageType.MAGIC, DamageType.PHYSICAL];
            break;
            case AttributeType.FAITH:
              allowedDamageTypes = [DamageType.FIRE, DamageType.HOLY];
              break;
            case AttributeType.ARCANE:
              allowedDamageTypes = [DamageType.PHYSICAL];
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
    
    this.damage = damage;
    this.scaling = attributeScaling;
  }

  getScalingFlags(): { attr: AttributeType; id: string }[] {
    return list(this.scaling ?? {}).map(s => {
      return { attr: s.key as AttributeType, id: getScalingId(s.value.base) };
    });
  }

  checkRequirements(attributes: AttributeState): boolean {
    if(!this.requirements.attributes) {
      return true;
    }

    for(const [k, v] of Object.entries(this.requirements.attributes)) {
      const type = k as AttributeType;
      const attrValue = attributes[type].value + attributes[type].offset;

      if(attrValue < v) {
        return false;
      }
    }

    return true;
  }

  applyScaling(attributes: AttributeState): Item {
    if(!this.scaling || !this.damage) {
      return this;
    }
    
    this.scaledDamage = { ...this.damage };

    for(const [t, attrScale] of Object.entries(this.scaling)) {
      const attrType = t as AttributeType;

      if(!attributes[attrType] || !this.config.scaling) {
        continue;
      }
      
      const attrTotal = attributes[attrType].value + attributes[attrType].offset;

      
      
      for(const damageType of Object.values(DamageType)) {
        if(!this.damage[damageType] || !attrScale.allowedDamageTypes.includes(damageType)) {
          continue;
        }
        
        const attrScaling = calcAttributeScaling(attrTotal, this.mutations ?? []) / 100;
        const upgradeScaling = attrScale.base / 100;


        let elementBase = this.damage[damageType] ?? 0;
        elementBase *= attrScaling + upgradeScaling;

        if(this.config.cast === 'sorceries' && attrType === AttributeType.INTELLIGENCE) {
          if(this.checkRequirements(attributes)) {
            this.scaledDamage[DamageType.SORCERY] = (1 + (upgradeScaling * attrScaling)) * 100;
          } else {
            this.scaledDamage[DamageType.SORCERY] = 60;
          }
        } else if(this.config.cast === 'incantations' && attrType === AttributeType.FAITH) {
          if(this.checkRequirements(attributes)) {
            this.scaledDamage[DamageType.INCANTATION] = (1 + (upgradeScaling * attrScaling)) * 100;
          } else {
            this.scaledDamage[DamageType.INCANTATION] = 60;
          }
        } else if(this.scaledDamage[damageType] !== undefined) {
          this.scaledDamage[damageType]! += elementBase;
        }
      }
    }

    return this;
  }
}