import { writable } from 'svelte/store';
import type { Item } from './Item';

export type ItemState = Record<string, Item>;

export const itemStore = writable<ItemState>({});
