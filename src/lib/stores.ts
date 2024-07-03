import { writable } from 'svelte/store';
import type { AttributeState, SlotState } from './state';
import { AttributeType } from './core/types';

export const attributeStore = writable<AttributeState>({
  [AttributeType.VIGOR]: 0,
  [AttributeType.ENDURANCE]: 0,
  [AttributeType.STRENGTH]: 0,
  [AttributeType.DEXTERITY]: 0,
  [AttributeType.MIND]: 0,
  [AttributeType.INTELLIGENCE]: 0,
  [AttributeType.FAITH]: 0,
  [AttributeType.ARCANE]: 0
});

export const slotStore = writable<SlotState>({
  rune: null,
  pouch: null,
  pouch2: null,
  pouch3: null,
  pouch4: null,
  head: null,
  chest: null,
  legs: null,
  hand: null,
  mainHand: null,
  offHand: null,
});
