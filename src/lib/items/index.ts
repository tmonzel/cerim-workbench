import { AttributeEffect } from '$lib/effects';
import { createItemModification } from '$lib/modifiers';
import { Item } from './Item';
import type { ItemBaseDef, ItemDef } from './types';

const baseItems: Record<string, ItemBaseDef> = {};
const items: Item[] = [];

export function registerItemBase(id: string, def: ItemBaseDef): void {
  baseItems[id] = def;
}

export function addItem(def: ItemDef): void {
  items.push(createItem(def));
}

export function createItem(def: ItemDef): Item {
  const base = baseItems[def.base];
  const item = new Item(base, def);

  for(const affixDef of def.affixes ?? []) {
    const mod = createItemModification(affixDef.modifier, affixDef.tier);

    if(!mod) {
      continue;
    }

    item.addModification(mod);
  }

  for(const effectDef of base.effects ?? []) {
    item.addEffect(new AttributeEffect(effectDef));
  }

  item.initStats();

  return item;
}

export function findItems(): Item[] {
  return items;
}