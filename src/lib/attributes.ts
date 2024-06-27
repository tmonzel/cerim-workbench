import { writable } from 'svelte/store';
import { AttributeType } from './core';

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
