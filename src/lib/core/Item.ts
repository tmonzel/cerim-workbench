import { AffinityType, AttackDamageType, AttributeType, type DamageNegation, type ItemConfig, type ItemDef, type ItemModifier, type ItemRequirements, type ItemType, type ItemUpgrade, type Resistance } from './types';
import type { AttributeState } from '$lib/attributes';
import { calcAttributeScaling, getScalingId } from './helpers';
import { AttackDamageStat } from './stats';

export class Item {
  tier = 0;
  
  attack: AttackDamageStat;
  affinity: AffinityType = AffinityType.STANDARD;
  scaling?: Partial<Record<AttributeType, { base: number, allowedDamageTypes: AttackDamageType[] }>>;
  config: ItemConfig;

  resistance: Resistance = {
    immunity: 0,
    robustness: 0,
    focus: 0,
    vitality: 0,
    poise: 0
  }

  damageNegation: DamageNegation = {
    attack: {
      strike: 0,
      slash: 0,
      pierce: 0,
    },
    elemental: {
      phy: 0,
      mag: 0,
      fir: 0,
      lit: 0,
      hol: 0
    }
  }

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

  constructor(
    readonly id: string, 
    protected def: ItemDef,
    config?: ItemConfig
  ) {
    this.config = config ?? {};
    this.attack = new AttackDamageStat();

    Object.assign(this.resistance, def.resistance);
    Object.assign(this.damageNegation, def.damageNegation);

    this.upgrade(this.def.tier ?? 0, this.def.affinity ?? AffinityType.STANDARD);
  }

  getTotalResistance(): number {
    return Object.values(this.resistance).reduce((p, c) => p + c, 0);
  }

  getTotalDamageNegation(): number {
    return Object.values(this.damageNegation.attack).reduce((p, c) => p + c, 0);
  }

  getTotalElementalDamageNegation(): number {
    return Object.values(this.damageNegation.elemental).reduce((p, c) => p + c, 0);
  }

  upgrade(tier: number, affinity: AffinityType = AffinityType.STANDARD): void {
    this.tier = tier;

    if(!this.def.upgrades || !this.def.upgrades[affinity]) {
      return;
    }

    const upgrade = this.def.upgrades[affinity];
    const damage: Partial<Record<AttackDamageType, number>> = {};
    const maxTiers = this.def.tiers ?? 25;
    const attributeScaling: Partial<Record<AttributeType, { base: number, allowedDamageTypes: AttackDamageType[] }>> = {};
    
    if(!upgrade.attack || !this.config.attack) {
      return;
    }

    for(const t of Object.values(AttackDamageType)) {
      if(!upgrade.attack[t] || !this.config.attack[t]) {
        continue;
      }

      const base = upgrade.attack[t]!;
      const multiplierRange = this.config.attack[t];
      const diff = multiplierRange[1] - multiplierRange[0];
      const multiplier = multiplierRange[0] + tier * (diff / maxTiers);
      
      damage[t] = base * multiplier;
    }

    for(const attrType of Object.values(AttributeType)) {
      if(!this.config.scaling || !this.config.scaling[attrType] || !upgrade.scaling || !upgrade.scaling[attrType]) {
        continue
      }

      const scalingVal = upgrade.scaling[attrType];

      let base = 0;
      let allowedDamageTypes: AttackDamageType[] = [];

      if(Array.isArray(scalingVal)) {
        base = scalingVal[0];
        allowedDamageTypes = typeof scalingVal[1] === 'string' ? [scalingVal[1]] : scalingVal[1];
      } else {
        base = scalingVal as number;

        switch(attrType) {
          case AttributeType.STRENGTH:
            allowedDamageTypes = [AttackDamageType.PHYSICAL];
            break;
          case AttributeType.DEXTERITY:
            allowedDamageTypes = [AttackDamageType.PHYSICAL, AttackDamageType.LIGHTNING];
          break;
          case AttributeType.INTELLIGENCE:
            allowedDamageTypes = [AttackDamageType.MAGIC];
          break;
          case AttributeType.FAITH:
            allowedDamageTypes = [AttackDamageType.FIRE, AttackDamageType.HOLY];
        }
      }

      const multiplierRange = this.config.scaling[attrType];
      const tiers = this.def.tiers ?? 25;
      const diff = multiplierRange[1] - multiplierRange[0];
      const multiplier = multiplierRange[0] + this.tier * (diff / tiers);

      attributeScaling[attrType] = {
        base: base * multiplier,
        allowedDamageTypes
      };
    }

    this.attack = new AttackDamageStat(damage);
    this.affinity = affinity;
    this.scaling = attributeScaling;
  }

  getScalingFlags(): { name: string; id: string }[] {
    return Object.entries(this.scaling ?? {}).map(([attr, s]) => {
      return { name: attr.toUpperCase(), id: getScalingId(s.base) };
    });
  }

  applyScaling(attributes: AttributeState): Item {
    if(!this.scaling || !this.attack) {
      return this;
    }
    
    this.attack.reset();

    for(const [t, attrScale] of Object.entries(this.scaling)) {
      const attrType = t as AttributeType;

      if(!attributes[attrType] || !this.config.scaling) {
        continue;
      }
      
      const attrTotal = attributes[attrType].value + attributes[attrType].offset;

      if(attrTotal === 0) {
        continue;
      }

      for(const damageType of Object.values(AttackDamageType)) {
        if(!this.attack[damageType] || !attrScale.allowedDamageTypes.includes(damageType)) {
          continue;
        }

        const scaledValue = calcAttributeScaling(attrTotal, this.config.mutations ?? []);

        let elementBase = this.attack[damageType];
        elementBase *= attrScale.base / 100;
        elementBase *= scaledValue / 100;

        this.attack.add(new AttackDamageStat({ [damageType]: elementBase }));
      }
    }

    return this;
  }
}