import { NumberStat } from '$lib/core/stats/NumberStat';
import { DamageStat } from '$lib/core/stats/DamageStat';
import { DamageMutator } from '$lib/core/mutators/DamageMutator';
import { ComplexDamage } from '$lib/core';
import type { AttributeState } from '$lib/state';
import type { ItemBaseDef, ItemDef, ItemType } from './types';
import { getModifierDef } from '$lib/modifiers';
import { ItemAffix } from './ItemAffix';

export class Item {
  readonly damage: DamageStat;
  readonly weight: NumberStat;
  readonly armor: NumberStat;
  readonly scalingFlags: string[];
  readonly affixes: ItemAffix[] = []

  constructor(
    protected base: ItemBaseDef,
    protected def: ItemDef 
  ) {
    this.damage = new DamageStat(this.base.damage ? [this.base.damage] : undefined);
    this.weight = new NumberStat(this.base.weight);
    this.armor = new NumberStat(this.base.armor);
    this.scalingFlags = (this.base.effects ?? []).map(m => m.attr.toUpperCase());

    for(const affixDef of this.def.affixes ?? []) {
      const modifierDef = getModifierDef(affixDef.modifier);

      if(!modifierDef) {
        continue;
      }
      
      this.affixes.push(
        new ItemAffix(modifierDef, affixDef)
      );
    }

    this.applyAffixes();
  }

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

  get attackSpeed(): number | undefined {
    return this.base.attackSpeed;
  }

  applyAffixes(): void {
    for(const affix of this.affixes) {
      if(affix.scope !== 'item') {
        continue;
      }

      affix.apply(this);
    }
  }

  applyAttributeChange(attributes: AttributeState): void {
    const effects = this.base.effects ?? [];
    const damageScale = new ComplexDamage();

    for(const effect of effects) {
      const attr = attributes[effect.attr];

      if(effect.affects === 'damage') {
        // Mutate damage
        const mutator = new DamageMutator(effect.value, effect.mutations ?? []);
        damageScale.add(mutator.mutate(attr.value).getValue());
      }
    }

    this.damage.setScale(damageScale);
  }
}