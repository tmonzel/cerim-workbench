import { AffinityType, AttackDamageType, AttributeType, DynamicDamage, DynamicNumber, FlatDamage, FlatResistance, getAttributeScalingParams, getScalingId } from '$lib/core';
import type { AttributeState } from '$lib/state';
import type { ItemConfig, ItemDef, ItemModification, ItemType, ItemUpgrade } from './types';
import { DynamicResistance } from '$lib/core/DynamicResistance';
import { type HeroStats } from '$lib/types';
import { DynamicAttribute } from '$lib/core/DynamicAttribute';
import type { FlatAttribute } from '$lib/core/values/FlatAttribute';
import { DynamicAttack } from '$lib/core/DynamicAttack';
import { AttackDamage } from '$lib/core/values/AttackDamage';

export class Item {
  stats: HeroStats;
  tier = 0;
  
  attack: DynamicAttack = new DynamicAttack();
  affinity: AffinityType = AffinityType.STANDARD;
  scaling?: Partial<Record<AttributeType, { base: number, allowedDamageTypes: AttackDamageType[] }>>;
  config: ItemConfig;

  readonly modifications: ItemModification[] = [];

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

  get requiredLevel(): number {
    return this.def.requiredLevel;
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
    readonly id: number, 
    protected def: ItemDef,
    config?: ItemConfig
  ) {
    this.config = config ?? {};
    this.stats = this.createStats();
    this.upgrade(this.def.tier ?? 0, this.def.affinity ?? AffinityType.STANDARD);
  }

  clone(): Item {
    const item = new Item(this.id, this.def);
    item.upgrade(this.tier, this.affinity);

    return item;
  }

  addModification(mod: ItemModification): void {
    this.modifications.push(mod);
  }

  initStats(): void {
    const stats = this.createStats();

    for(const mod of this.modifications) {
      if(!stats[mod.stat] || mod.scope === 'hero') {
        continue;
      }

      if(mod.type === 'percentual') {
        stats[mod.stat].multiplier += mod.value - 1;
        continue;
      }

      if(mod.type === 'flat') {
        switch(mod.stat) {
          case 'damage':
            stats.damage.added.add(mod.value as FlatDamage);
            break;
          case 'resistance':
            stats.resistance.added.add(mod.value as FlatResistance);
            break;
          case 'attributes':
            stats.attributes.added.add(mod.value as FlatAttribute);
            break;
          case 'stamina':
          case 'armor':
          case 'weight':
          case 'attackSpeed':
          case 'health':
          case 'vitality':
            stats[mod.stat].added += mod.value as number;
        }
      }
    }

    this.stats = stats;
  }

  upgrade(tier: number, affinity: AffinityType = AffinityType.STANDARD): void {
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
    this.tier = tier;
    this.affinity = affinity;
    this.scaling = attributeScaling;
    
  }

  getScalingFlags(): { name: string; id: string }[] {
    return Object.entries(this.scaling ?? {}).map(([attr, s]) => {
      return { name: attr.toUpperCase(), id: getScalingId(s.base) };
    });
  }

  private calcAttributeScaling(value: number): number {
    const params = getAttributeScalingParams(value);
    const ratio = (value - params.stat[0]) / (params.stat[1] - params.stat[0]);
    let growth = 0;

    if(params.exp[0] > 0) {
      growth = Math.pow(ratio, params.exp[0]);
    } else if(params.exp[0] < 0) {
      growth = 1 - Math.pow(1 - ratio, Math.abs(params.exp[0]));
    }

    return params.grow[0] + ((params.grow[1] - params.grow[0]) * growth);
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

        const scaledValue = this.calcAttributeScaling(attrTotal);

        let elementBase = this.attack.base[damageType];
        elementBase *= attrScale.base / 100;
        elementBase *= scaledValue / 100;

        this.attack.base.add(new AttackDamage({ [damageType]: elementBase }));
      }
    }

    return this;
  }

  private createStats(): HeroStats {
    return {
      damage: new DynamicDamage(new FlatDamage()),
      weight: new DynamicNumber(this.def.weight),
      armor: new DynamicNumber(this.def.armor),
      resistance: new DynamicResistance(),
      attackSpeed: new DynamicNumber(this.def.attackSpeed),
      stamina: new DynamicNumber(),
      equipLoad: new DynamicNumber(),
      health: new DynamicNumber(),
      poise: new DynamicNumber(),
      focus: new DynamicNumber(),
      robustness: new DynamicNumber(),
      immunity: new DynamicNumber(),
      vitality: new DynamicNumber(),
      attributes: new DynamicAttribute()
    }
  }
}