import { AttributeType, FlatDamage, FlatResistance } from '$lib/core';
import { FlatAttribute } from '$lib/core/values/FlatAttribute';
import { getModifierDef } from '$lib/modifiers';
import type { AttributeValue, DamageValue, HeroStatTypes, RawStatValue, ResistanceValue } from '$lib/types';
import { get, writable } from 'svelte/store';
import { Item } from './Item';
import type { ItemConfig, ItemDef, ItemModification } from './types';
import { attributeRecord, attributeStore } from '$lib/attributes';

const baseItems: Record<string, ItemDef> = {};
export const itemStore = writable<Record<number, Item>>({});

export function registerItemBase(id: string, def: ItemDef): void {
  baseItems[id] = def;
}

export function addItem(id: number, def: ItemDef, config?: ItemConfig): void {
  itemStore.update((items) => ({ ...items, [id]: createItem(id, def, config) }));
}

const statValueMap: Record<HeroStatTypes, typeof FlatDamage | typeof FlatResistance | typeof FlatAttribute | typeof Number > = {
  damage: FlatDamage,
  resistance: FlatResistance,
  stamina: Number,
  focus: Number,
  armor: Number,
  weight: Number,
  poise: Number,
  equipLoad: Number,
  health: Number,
  attackSpeed: Number,
  robustness: Number,
  immunity: Number,
  vitality: Number,
  attributes: FlatAttribute
}

function mapRawStatValue(stat: HeroStatTypes, value: RawStatValue): number | FlatDamage | FlatResistance | FlatAttribute {
  const valueClass = statValueMap[stat];

  if(valueClass === Number) {
    return value as number;
  }

  if(valueClass === FlatDamage) {
    return new FlatDamage([value as DamageValue]);
  }

  if(valueClass === FlatResistance) {
    return new FlatResistance([value as ResistanceValue]);
  }

  if(valueClass === FlatAttribute) {
    if(typeof value === 'number') {
      return new FlatAttribute(Object.values(AttributeType).map(type => ([value, type])))
    }
    
    return new FlatAttribute(value as AttributeValue[]); 
  }

  return value as number;
}

export function createItem(id: number, def: ItemDef, config?: ItemConfig): Item {
  const item = new Item(id, def, config);
  
  for(const affixDef of def.affixes ?? []) {
    let mod!: ItemModification | undefined;

    if(affixDef.modifier && affixDef.tier) {
      const modifierDef = getModifierDef(affixDef.modifier);

      if(!modifierDef) {
        continue;
      }

      mod = {
        type: modifierDef.type ?? 'flat',
        name: modifierDef.name,
        tier: 0,
        scope: modifierDef.scope,
        stat: modifierDef.affects,
        value: modifierDef.type === 'percentual' ? modifierDef.values[affixDef.tier] as number : mapRawStatValue(modifierDef.affects, modifierDef.values[affixDef.tier])
      };
    } else if(affixDef.affects && affixDef.name && affixDef.value) {
      mod = {
        type: affixDef.type ?? 'flat',
        name: affixDef.name,
        tier: 0,
        scope: affixDef.scope,
        stat: affixDef.affects,
        value: affixDef.type === 'percentual' ? affixDef.value as number : mapRawStatValue(affixDef.affects, affixDef.value)
      };
    }

    if(!mod) {
      continue;
    }

    item.addModification(mod);
  }

  item.initStats();

  return item;
}
