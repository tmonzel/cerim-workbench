import { AffinityType, AttackDamageType, AttributeType, DynamicDamage, DynamicNumber, FlatDamage, FlatResistance, getAttributeScalingParams, type NumberRange, type ScalingBase } from '$lib/core';
import type { AttributeState } from '$lib/state';
import type { ItemDef, ItemModification, ItemType, ItemUpgrade } from './types';
import { DynamicResistance } from '$lib/core/DynamicResistance';
import { DamageType, type HeroStats } from '$lib/types';
import { DynamicAttribute } from '$lib/core/DynamicAttribute';
import type { FlatAttribute } from '$lib/core/values/FlatAttribute';
import { DynamicAttack } from '$lib/core/DynamicAttack';
import { AttackDamage } from '$lib/core/values/AttackDamage';

export class Item {
  stats: HeroStats;
  tier = 0;
  
  attack: DynamicAttack = new DynamicAttack();
  affinity: AffinityType = AffinityType.STANDARD;
  scaling?: ScalingBase;

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
    protected def: ItemDef
  ) {
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
    
    if(!upgrade.attack || !this.def.config.attack) {
      return;
    }

    for(const t of Object.values(AttackDamageType)) {
      if(!upgrade.attack[t] || !this.def.config.attack[t]) {
        continue;
      }

      const base = upgrade.attack[t]!;
      const multiplierRange = this.def.config.attack[t];
      const diff = multiplierRange[1] - multiplierRange[0];
      const multiplier = multiplierRange[0] + tier * (diff / maxTiers);
      
      damage[t] = base * multiplier;
    }

    this.attack = new DynamicAttack(new AttackDamage(damage));
    this.tier = tier;
    this.affinity = affinity;
    this.scaling = upgrade.scaling;
  }

  getScalingFlags(): string[] {
    return Object.keys(this.scaling ?? {}).map(attr => attr.toUpperCase());
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

    for(const [t, b] of Object.entries(this.scaling)) {
      const attrType = t as AttributeType;

      if(!attributes[attrType] || !this.def.config.scaling) {
        continue;
      }
      
      const attrTotal = attributes[attrType].value + attributes[attrType].offset;
      
      let base = 0;
      let allowedDamageTypes: string[] = [];

      if(Array.isArray(b)) {
        base = b[0];
        allowedDamageTypes = b[1];
      } else {
        base = b as number;

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

      if(attrTotal === 0) {
        continue;
      }

      for(const damageType of Object.values(AttackDamageType)) {
        if(!this.attack.base[damageType] || !allowedDamageTypes.includes(damageType)) {
          continue;
        }

        let elementBase = this.attack.base[damageType];

        const multiplierRange = this.def.config.scaling[attrType];
        const tiers = this.def.tiers ?? 25;
        const diff = multiplierRange[1] - multiplierRange[0];
        const multiplier = multiplierRange[0] + this.tier * (diff / tiers);
        const calculatedTypeBase = base * multiplier;

        const scaledValue = this.calcAttributeScaling(attrTotal);

        elementBase *= calculatedTypeBase / 100;
        elementBase *= scaledValue / 100;

        this.attack.base.add(new AttackDamage({ [damageType]: elementBase }));
      }

      /*for(const attrName of Object.keys(config.scaling) as AttributeType[]) {
        if(!attributes[attrName]) {
          continue;
        }

        let base = this.attack.base[type];
        
        const attrValue = attributes[attrName].value + attributes[attrName].offset;

        if(attrValue === 0) {
          continue;
        }

        const multiplierRange = this.scaling[attrName];
        const tiers = this.def.tiers ?? 25;
        const diff = multiplierRange[1] - multiplierRange[0];
        const multiplier = multiplierRange[0] + this.tier * (diff / tiers);
        const calculatedTypeBase = config.scaling[attrName] * multiplier;
        base *= calculatedTypeBase / 100;
        
        
        
        base *= result / 100;
        added += base;
      }
      
      this.attack.base.add(new AttackDamage({ [type]: added }));*/
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