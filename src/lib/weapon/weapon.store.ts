import { createItemStore } from '$lib/item/store';
import type { AttackItem } from './AttackItem';

export const weaponStore = createItemStore<AttackItem>();
