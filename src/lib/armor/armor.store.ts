import { createItemStore } from '$lib/item/store';
import type { ProtectItem } from './ProtectItem';

export const armorStore = createItemStore<ProtectItem>();
