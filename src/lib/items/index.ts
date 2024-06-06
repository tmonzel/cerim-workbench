import { Item } from './Item';
import type { ItemBaseDef, ItemDef } from './types';

const baseItems: Record<string, ItemBaseDef> = {};

export function registerItemBase(id: string, def: ItemBaseDef): void {
  baseItems[id] = def;
}

export function createItem(def: ItemDef): Item {
  const base = baseItems[def.base];

  return new Item(base, def);
}