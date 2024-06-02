import { writable } from 'svelte/store';

export type AttributeState = { 
  [name: string]: Attribute; 
}

export type Attribute = {
  label: string;
  value: number;
}

export const attributeStore = writable<AttributeState>({});
