import { DynamicDamage, DynamicNumber, FlatDamage, FlatResistance } from '$lib/core';
import type { AttributeState } from '$lib/state';
import type { ItemBaseDef, ItemDef, ItemModification, ItemType } from './types';
import { DynamicResistance } from '$lib/core/DynamicResistance';
import type { HeroStats } from '$lib/hero';
import type { AttributeEffect } from '$lib/effects';

export class Item {
  stats: HeroStats;
  readonly modifications: ItemModification[] = [];
  readonly effects: AttributeEffect[] = [];

  get group(): string {
    return this.base.group;
  }

  get name(): string {
    return this.def.name ?? this.base.name;
  }

  get caption(): string {
    return this.base.caption;
  }

  get type(): ItemType {
    return this.base.type;
  }

  get requiredLevel(): number {
    return this.base.requiredLevel;
  }

  get iconUrl(): string | undefined {
    return this.base.iconUrl;
  }

  get description(): string | undefined {
    return this.base.description;
  }

  get effect(): string | undefined {
    return this.def.effect;
  }

  constructor(
    protected base: ItemBaseDef,
    protected def: ItemDef 
  ) {
    this.stats = this.createStats();
  }

  addModification(mod: ItemModification): void {
    this.modifications.push(mod);
  }

  initStats(): void {
    const stats = this.createStats();

    for(const mod of this.modifications) {
      if(!stats[mod.stat]) {
        continue;
      }

      if(mod.modifier.type === 'multiply') {
        stats[mod.stat].multiplier += mod.modifier.value - 1;
        continue;
      }

      if(mod.modifier.type === 'add') {
        switch(mod.stat) {
          case 'damage':
            stats.damage.added.add(mod.modifier.value as FlatDamage);
            break;
          case 'resistance':
            stats.resistance.added.add(mod.modifier.value as FlatResistance);
            break;
          case 'stamina':
          case 'armor':
          case 'weight':
          case 'attackSpeed':
          case 'health':
            stats[mod.stat].added += mod.modifier.value as number;
        }
      }
    }

    this.stats = stats;
  }

  addEffect(effect: AttributeEffect): void {
    this.effects.push(effect);
  }

  getScalingFlags(): string[] {
    return this.effects.map(e => e.attributeId.toUpperCase());
  }

  applyStatEffects(attributes: AttributeState): void {
    this.initStats();
    this.effects.forEach(effect => effect.apply(attributes, this.stats));
  }

  private createStats(): HeroStats {
    return {
      damage: new DynamicDamage(this.base.damage ? new FlatDamage([this.base.damage]) : undefined),
      weight: new DynamicNumber(this.base.weight),
      armor: new DynamicNumber(this.base.armor),
      resistance: new DynamicResistance(),
      attackSpeed: new DynamicNumber(this.base.attackSpeed),
      stamina: new DynamicNumber(),
      equipLoad: new DynamicNumber(),
      health: new DynamicNumber(),
      poise: new DynamicNumber(),
      focus: new DynamicNumber()
    }
  }
}