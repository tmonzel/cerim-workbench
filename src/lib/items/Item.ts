import { DamageMutator, DynamicDamage, DynamicNumber, FlatDamage, FlatResistance, FlatStat } from '$lib/core';
import type { AttributeState } from '$lib/state';
import type { ItemBaseDef, ItemDef, ItemModification, ItemType } from './types';
import { getModifierDef } from '$lib/modifiers';
import { PercentualStat } from '$lib/core/values/PercentualStat';
import { DynamicResistance } from '$lib/core/DynamicResistance';
import type { ResistanceValue } from '$lib/types';

export class Item {
  readonly damage: DynamicDamage;
  readonly weight: DynamicNumber;
  readonly armor: DynamicNumber;
  readonly resistance: DynamicResistance;
  readonly scalingFlags: string[];
  readonly modifications: ItemModification[] = [];

  constructor(
    protected base: ItemBaseDef,
    protected def: ItemDef 
  ) {
    this.damage = new DynamicDamage(this.base.damage ? new FlatDamage([this.base.damage]) : undefined);
    this.weight = new DynamicNumber(this.base.weight);
    this.armor = new DynamicNumber(this.base.armor);
    this.resistance = new DynamicResistance();

    this.scalingFlags = (this.base.effects ?? []).map(m => m.attr.toUpperCase());

    for(const affixDef of this.def.affixes ?? []) {
      const modifier = getModifierDef(affixDef.modifier);

      if(!modifier) {
        continue;
      }

      let value: FlatStat | PercentualStat | FlatDamage | FlatResistance;

      if(modifier.affects === 'damage' && modifier.type === 'flat') {
        value = new FlatDamage([modifier.values[affixDef.tier]]);
      } else if(modifier.affects === 'resistance' && modifier.type === 'flat') {
        const resist: ResistanceValue | ResistanceValue[] = modifier.values[affixDef.tier];

        if(Array.isArray(resist) && Array.isArray(resist[0])) {
          value = new FlatResistance(resist)
        } else {
          value = new FlatResistance([resist]);
        }
      } else {
        if(modifier.type === 'percentual') {
          value = new PercentualStat(modifier.values[affixDef.tier]);
        } else {
          value = new FlatStat(modifier.values[affixDef.tier]);
        }
      }

      const mod: ItemModification = {
        name: modifier.name,
        tier: affixDef.tier,
        scope: modifier.scope ?? 'hero',
        stat: modifier.affects,
        value 
      };

      this.modifications.push(mod);

      if(value instanceof FlatResistance) {
        this.resistance.base.add(value);
        
      }

      if(mod.scope === 'item') {
        // Item affected modifiers

        if(value instanceof FlatDamage) {
          this.damage.base.add(value);
        } 
        
        else if(value instanceof PercentualStat) {
          switch(mod.stat) {
            case 'damage':
            case 'weight':
            case 'armor':
              this[mod.stat].multiplier += value.getValue();
          }
        }
      }
    }
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

  applyAttributeChange(attributes: AttributeState): void {
    this.damage.added = [];

    const effects = this.base.effects ?? [];
    const damageScale = new FlatDamage();

    for(const effect of effects) {
      const attr = attributes[effect.attr];

      if(effect.affects === 'damage') {
        // Mutate damage
        const mutator = new DamageMutator(effect.value, effect.mutations ?? []);
        damageScale.add(mutator.mutate(attr.value));
      }
    }

    this.damage.added.push(damageScale);
  }
}