import { createItemStore } from '$lib/item/store';
import type { AccessoryItem } from './AccessoryItem';

export const accessoryStore = createItemStore<AccessoryItem>();
