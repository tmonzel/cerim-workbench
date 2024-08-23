import { writable } from 'svelte/store';
import type { AccessoryItem } from './AccessoryItem';
import type { ProtectItem } from './ProtectItem';
import type { InventoryItem } from './InventoryItem';
import type { AttackItem } from './AttackItem';

export const accessoryStore = writable<Record<string, AccessoryItem>>({});
export const armorStore = writable<Record<string, ProtectItem>>({});
export const inventoryStore = writable<Record<string, InventoryItem>>({});
export const weaponStore = writable<Record<string, AttackItem>>({});
