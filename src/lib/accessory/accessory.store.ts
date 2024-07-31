import { writable } from 'svelte/store';
import type { AccessoryItem } from './AccessoryItem';

export const accessoryStore = writable<Record<string, AccessoryItem>>();
