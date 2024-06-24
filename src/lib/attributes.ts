import { writable } from 'svelte/store';
import type { Attribute, AttributeType } from './core';

export const attributeRecord: Record<AttributeType, Attribute> = {
  vig: {
    name: "Vigor",
    color: "var(--attr-vig)",
  },

  end: {
    name: "Endurance",
    color: "var(--attr-end)",
  },

  str: {
    name: "Strength",
    color: "var(--attr-str)",
  },

  dex: {
    name: "Dexterity",
    color: "var(--attr-dex)",
  },
  
  mnd: {
    name: "Mind",
    color: "var(--attr-mnd)",
  },

  int: {
    name: "Intelligence",
    color: "var(--attr-int)",
  },

  fth: {
    name: "Faith",
    color: "var(--attr-fth)",
  },

  arc: {
    name: "Arcane",
    color: "var(--attr-arc)",
  }
}

export type AttributeState = Record<AttributeType, { value: number; offset: number }>;

export const attributeStore = writable<AttributeState>({
  vig: {
    value: 0,
    offset: 0
  },

  end: {
    value: 0,
    offset: 0
  },

  str: {
    value: 0,
    offset: 0
  },

  dex: {
    value: 0,
    offset: 0
  },
  
  mnd: {
    value: 0,
    offset: 0
  },

  int: {
    value: 0,
    offset: 0
  },

  fth: {
    value: 0,
    offset: 0
  },

  arc: {
    value: 0,
    offset: 0
  }
});
