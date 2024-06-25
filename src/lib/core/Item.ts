import { AffinityType, AttackDamageType, AttributeType, type DamageNegation, type ItemAffix, type ItemConfig, type ItemDef, type ItemModification, type ItemRequirements, type ItemType, type ItemUpgrade, type Resistance } from './types';
import { DynamicResistance } from './DynamicResistance';
import { DynamicAttribute } from './DynamicAttribute';
import { FlatAttribute } from './values/FlatAttribute';
import { DynamicAttack } from './DynamicAttack';
import { AttackDamage } from './values/AttackDamage';
import type { AttributeState } from '$lib/attributes';
import type { AttributeValue, DamageValue, ResistanceValue } from '$lib/types';
import { DynamicDamage } from './DynamicDamage';
import { DynamicNumber } from './DynamicNumber';
import { FlatDamage } from './values/FlatDamage';
import { FlatResistance } from './values/FlatResistance';
import { calcAttributeScaling, getScalingId } from './helpers';

export type ItemStats = {
  damage: DynamicDamage;
  hp: DynamicNumber;
  fp: DynamicNumber;
  stamina: DynamicNumber;
  armor: DynamicNumber;
  weight: DynamicNumber;
  equipLoad: DynamicNumber;
  attackSpeed: DynamicNumber;
  resistance: DynamicResistance;
  attributes: DynamicAttribute;
  immunity: DynamicNumber;
}

export class Item {
  stats!: ItemStats;
  tier = 0;
  
  attack: DynamicAttack = new DynamicAttack();
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

  readonly modifications: ItemModification[] = [];

  get modifiers(): ItemAffix[] {
    return this.def.affixes ?? [];
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

  constructor(
    readonly id: string, 
    protected def: ItemDef,
    config?: ItemConfig
  ) {
    this.config = config ?? {};

    Object.assign(this.resistance, def.resistance);
    Object.assign(this.damageNegation, def.damageNegation);

    this.initialize();
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

  initialize(): void {
    const stats = {
      damage: new DynamicDamage(new FlatDamage()),
      weight: new DynamicNumber(this.def.weight),
      armor: new DynamicNumber(this.def.armor),
      resistance: new DynamicResistance(),
      attackSpeed: new DynamicNumber(this.def.attackSpeed),
      stamina: new DynamicNumber(),
      equipLoad: new DynamicNumber(),
      hp: new DynamicNumber(),
      fp: new DynamicNumber(),
      immunity: new DynamicNumber(),
      attributes: new DynamicAttribute()
    };

    for(const affix of this.modifiers) {
      if(affix.scope === 'hero') {
        continue;
      }

      if(affix.type === 'percentual') {
        switch(affix.affects) {
          case 'stamina':
          case 'weight':
          case 'attackSpeed':
          case 'hp':
          case 'fp':
          case 'equipLoad':
            stats[affix.affects].multiplier += (affix.value as number) - 1;
        }
        
        continue;
      }

      if(affix.type === 'flat') {
        switch(affix.affects) {
          case 'damage':
            stats.damage.added.add(new FlatDamage(affix.value as DamageValue[]));
            break;
          case 'resistance':
            stats.resistance.added.add(new FlatResistance(affix.value as ResistanceValue[]));
            break;
          case 'attributes':
            stats.attributes.added.add(new FlatAttribute(affix.value as AttributeValue[]));
            break;
          case 'stamina':
          case 'weight':
          case 'attackSpeed':
          case 'hp':
          case 'fp':
            stats[affix.affects].added += affix.value as number;
        }
      }
    }

    this.stats = stats;
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

    this.attack = new DynamicAttack(new AttackDamage(damage));
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
        if(!this.attack.base[damageType] || !attrScale.allowedDamageTypes.includes(damageType)) {
          continue;
        }

        const scaledValue = calcAttributeScaling(attrTotal, this.config.mutations ?? []);

        let elementBase = this.attack.base[damageType];
        elementBase *= attrScale.base / 100;
        elementBase *= scaledValue / 100;

        this.attack.base.add(new AttackDamage({ [damageType]: elementBase }));
      }
    }

    return this;
  }
}