import { derived, writable } from 'svelte/store';
import { attributeStore } from '$lib/attribute.store';
import type { Item } from './items/Item';

export const itemStore = writable<Item[]>([]);

export type EquipState = {
  neck: Item | null;
  head: Item | null;
  chest: Item | null;
  legs: Item | null;
  hand: Item | null;
  feet: Item | null;
  mainHand: Item | null;
  offHand: Item | null;
}

export const equipStore = writable<EquipState>({
  neck: null,
  head: null,
  chest: null,
  legs: null,
  hand: null,
  feet: null,
  mainHand: null,
  offHand: null
});

export const equipState = derived([equipStore, attributeStore], ([equip, attributes]) => {
  for(const item of Object.values(equip)) {
    if(!item) {
      continue;
    }

    item.applyAttributeChange(attributes);
  }

  return equip;
});
