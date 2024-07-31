import { derived, writable, type Readable } from 'svelte/store';
import type { ProtectItem } from './ProtectItem';

export const armorStore = writable<Record<string, ProtectItem>>({});

export function readArmorByType(type: number): Readable<ProtectItem[]> {
	return derived(armorStore, (items) => Object.values(items).filter((item) => item.type === type));
}
