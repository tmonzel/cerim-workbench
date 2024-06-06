import { Item } from './Item';
import type { ItemBaseDef, ItemDef } from './types';

const baseItems: Record<string, ItemBaseDef> = {};
const items: Item[] = [];

export function registerItemBase(id: string, def: ItemBaseDef): void {
  baseItems[id] = def;
}

export function addItem(def: ItemDef): void {
  const base = baseItems[def.base];

  items.push(new Item(base, def));
}

export function findItems(): Item[] {
  return items;
}