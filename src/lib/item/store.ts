import { writable } from 'svelte/store';
import type { Item } from './Item';

export const itemStore = writable<Record<string, Item>>({});
