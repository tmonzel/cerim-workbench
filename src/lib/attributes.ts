import { writable } from 'svelte/store';
import type { Attribute, AttributeType } from './core';

export const attributeRecord: Record<AttributeType, Attribute> = {
  vig: {
    name: "Vigor",
    color: "#4ade80",
  },

  end: {
    name: "Endurance",
    color: "#fbbf24",
  },

  str: {
    name: "Strength",
    color: "#f87171",
  },

  dex: {
    name: "Dexterity",
    color: "#f0abfc",
  },
  
  mnd: {
    name: "Mind",
    color: "#db2777",
  },

  int: {
    name: "Intelligence",
    color: "#67e8f9",
  },

  fth: {
    name: "Faith",
    color: "#bef264",
  },

  arc: {
    name: "Arcane",
    color: "#f3e8ff",
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
