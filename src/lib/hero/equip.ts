import { writable } from 'svelte/store';
import type { SlotState } from './types';
import { HeroEquipSlot } from './HeroEquipSlot';
import { ItemCategory } from '$lib/item/types';

export const slotStore = writable<SlotState>({
	rune: new HeroEquipSlot(ItemCategory.RUNE),
	pouch: new HeroEquipSlot(ItemCategory.TALISMAN),
	pouch2: new HeroEquipSlot(ItemCategory.TALISMAN),
	pouch3: new HeroEquipSlot(ItemCategory.TALISMAN),
	pouch4: new HeroEquipSlot(ItemCategory.TALISMAN),
	head: new HeroEquipSlot(ItemCategory.HELMET),
	chest: new HeroEquipSlot(ItemCategory.ARMOR),
	legs: new HeroEquipSlot(ItemCategory.LEGS),
	hand: new HeroEquipSlot(ItemCategory.ARMS),
	mainHand: new HeroEquipSlot(ItemCategory.WEAPON),
	offHand: new HeroEquipSlot(ItemCategory.WEAPON)
});
