import { AttributeType } from '$lib/core/types';
import { writable } from 'svelte/store';
import type { AttributeState } from './types';
import { AttributeModifier } from './modifiers';

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

export const vigorModifier = new AttributeModifier("vig", {
  stats: {
    hp: [
      { "breakpoint": 1, "grow": 300, "exp": 1.5 },
      { "breakpoint": 25, "grow": 800, "exp": 1.1 },
      { "breakpoint": 40, "grow": 1450, "exp": -1.2 },
      { "breakpoint": 60, "grow": 1900, "exp": -1.2 },
      { "breakpoint": 99, "grow": 2100 }
    ]
  },
  defense: {
    fir: [
      { "breakpoint": 0, "grow": 0 },
      { "breakpoint": 20, "grow": 40 },
      { "breakpoint": 40, "grow": 50 },
      { "breakpoint": 60, "grow": 60 },
      { "breakpoint": 70, "grow": 70 }
    ]
  }
})