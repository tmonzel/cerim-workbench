
import { ArmorItem } from './items/ArmorItem';
import { DamageItem } from './items/DamageItem';
import type { Item } from './items/Item';
import { TalismanItem } from './items/TalismanItem';
import type { ItemAffix, ItemDef } from './types';

const groupToTypeMap: { [group: string]: new(def: ItemDef, affixes: ItemAffix[]) => Item } = {
  'axes': DamageItem,
  'swords': DamageItem,
  'hammers': DamageItem,
  'bows': DamageItem,
  'helmets': ArmorItem,
  'bodyArmors': ArmorItem,
  'gloves': ArmorItem,
  'shields': ArmorItem
}

export function createItem(def: ItemDef, affixes: ItemAffix[] = []): Item {
  const itemClass = groupToTypeMap[def.group];

  if(itemClass) {
    return new itemClass(def, affixes);
  }

  return new TalismanItem(def, affixes);
}
