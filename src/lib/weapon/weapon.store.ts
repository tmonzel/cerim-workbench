import { writable } from 'svelte/store';
import type { AttackItem } from './AttackItem';

export const weaponStore = writable<Record<string, AttackItem>>({});
