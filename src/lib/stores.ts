import { createEntityStore } from './core';
import type { AccessoryItem, AttackItem, ProtectItem } from './item';

export const weaponStore = createEntityStore<AttackItem>();
export const armorStore = createEntityStore<ProtectItem>();
export const accessoryStore = createEntityStore<AccessoryItem>();
