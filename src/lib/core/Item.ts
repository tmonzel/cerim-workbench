import { AffinityType, DamageType, AttributeType, type Defense, type ItemConfig, type ItemDef, type ItemModifier, type ItemRequirements, type ItemType, type ItemUpgrade, type Resistance, type Damage, type Guard } from './types';
import type { AttributeState } from '$lib/attributes';
import { calcAttributeScaling, getScalingId } from './helpers';
import { upgradeSchemata } from '$lib/data';

export class Item {
  tier = 0;
  
  damage: Partial<Damage>;
  scaledDamage: Partial<Damage>;
  affinity: AffinityType = AffinityType.STANDARD;
  scaling?: Partial<Record<AttributeType, { base: number, allowedDamageTypes: DamageType[] }>>;
  config: ItemConfig;
  guard?: Guard;
  resistance?: Resistance;
  defense?: Defense;

  get weight(): number {
    return this.def.weight ?? 0;
  }

  get modifiers(): ItemModifier[] {
    return this.def.modifiers ?? [];
  }

  get group(): string {
    return this.def.group;
  }

  get name(): string {
    return this.def.name;
  }

  get caption(): string {
    return this.def.caption;
  }

  get upgrades(): Record<AffinityType, ItemUpgrade> | undefined {
    return this.def.upgrades;
  }

  get type(): ItemType {
    return this.def.type;
  }

  get requirements(): ItemRequirements {
    return this.def.requirements ?? {};
  }

  get iconUrl(): string | undefined {
    return this.def.iconUrl;
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

  get possibleUpgrades(): number {
    return this.def.tiers ?? 25;
  }

  constructor(
    readonly id: string, 
    protected def: ItemDef,
    protected options: { config?: ItemConfig } = {}
  ) {
    this.config = options.config ?? {};
    this.damage = {};
    this.scaledDamage = {};

    if(def.resistance) {
      this.resistance = def.resistance;
    }

    if(def.defense) {
      this.defense = def.defense;
    }

    if(def.guard) {
      this.guard = def.guard;
    }

    this.upgrade(this.def.tier ?? 0, this.def.affinity ?? AffinityType.STANDARD);
  }

  upgrade(tier: number, affinity: AffinityType = AffinityType.STANDARD): void {
    this.tier = tier;

    if(!this.def.upgrades || !this.def.upgrades[affinity]) {
      return;
    }

    const upgrade = this.def.upgrades[affinity];
    const schemaId = upgrade.schema ?? '0';
    const schema = upgradeSchemata[affinity] ? upgradeSchemata[affinity] : upgradeSchemata[schemaId];
    
    const damage: Partial<Damage> = {};
    const maxTiers = this.possibleUpgrades;
    const attributeScaling: Partial<Record<AttributeType, { base: number, allowedDamageTypes: DamageType[] }>> = {};
    
    if(!upgrade.attack || !schema.attack) {
      return;
    }

    for(const t of Object.values(DamageType)) {
      if(!upgrade.attack[t] || !schema.attack[t]) {
        continue;
      }

      const base = upgrade.attack[t]!;
      const multiplierRange = schema.attack[t];
      const diff = multiplierRange[1] - multiplierRange[0];

      const multiplier = multiplierRange[0] + tier * (diff / maxTiers);
      damage[t] = base * multiplier;
    }

    for(const attrType of Object.values(AttributeType)) {
      if(!schema.scaling || !schema.scaling[attrType] || !upgrade.scaling || !upgrade.scaling[attrType]) {
        continue
      }

      const scalingVal = upgrade.scaling[attrType];

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
            allowedDamageTypes = [DamageType.MAGIC];
          break;
          case AttributeType.FAITH:
            allowedDamageTypes = [DamageType.FIRE, DamageType.HOLY];
        }
      }

      const multiplierRange = schema.scaling[attrType];
      let multiplier = 1;

      if(multiplierRange.length > 2) {
        multiplier = multiplierRange[tier];
      } else {
        const diff = multiplierRange[1] - multiplierRange[0];
        multiplier = multiplierRange[0] + tier * (diff / maxTiers);
      }
      
      attributeScaling[attrType] = {
        base: base * multiplier,
        allowedDamageTypes
      };
    }
    
    this.damage = damage;
    this.scaledDamage = { ...this.damage };
    this.affinity = affinity;
    this.scaling = attributeScaling;
  }

  getScalingFlags(): { attr: string; id: string }[] {
    return Object.entries(this.scaling ?? {}).map(([attr, s]) => {
      return { attr, id: getScalingId(s.base) };
    });
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

      if(attrTotal === 0) {
        continue;
      }
      
      for(const damageType of Object.values(DamageType)) {
        if(!this.damage[damageType] || !attrScale.allowedDamageTypes.includes(damageType)) {
          continue;
        }
        
        const scaledValue = calcAttributeScaling(attrTotal, this.config.mutations ?? []);

        let elementBase = this.damage[damageType] ?? 0;
        
        elementBase *= attrScale.base / 100;
        elementBase *= scaledValue / 100;
        
        if(this.scaledDamage[damageType] !== undefined) {
          this.scaledDamage[damageType]! += elementBase;
        }
      }
    }

    return this;
  }
}