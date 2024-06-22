import { writable } from 'svelte/store';
import { type AttributeState } from './state';

export const attributeStore = writable<Partial<AttributeState>>({});
