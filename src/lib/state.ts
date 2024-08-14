import type { AccessoryItem } from './accessory';
import type { ProtectItem } from './armor';
import { AttributeType } from './core';
import type { InventoryItem } from './inventory';
import type { AttackItem } from './weapon';
import { writable } from 'svelte/store';

export type HeroEquipState = {
	mainHand: AttackItem | null;
	offHand: AttackItem | null;

	head: ProtectItem | null;
	chest: ProtectItem | null;
	legs: ProtectItem | null;
	arms: ProtectItem | null;

	pouch: AccessoryItem | null;
	pouch2: AccessoryItem | null;
	pouch3: AccessoryItem | null;
	pouch4: AccessoryItem | null;

	greatRune: InventoryItem | null;
};

export type HeroAttackState = {
	excludeStaminaFromAttackCalc: boolean;
	activeHand: 'mainHand' | 'offHand';
	twoHanding: boolean;
};

export type UIState = {
	showRuneInfo: boolean;
};

export const heroType = writable<string>('wretch');
export const heroContext = writable<string>('dashboard');
export const heroAttributes = writable<Record<AttributeType, number>>({
	[AttributeType.VIGOR]: 0,
	[AttributeType.ENDURANCE]: 0,
	[AttributeType.STRENGTH]: 0,
	[AttributeType.DEXTERITY]: 0,
	[AttributeType.MIND]: 0,
	[AttributeType.INTELLIGENCE]: 0,
	[AttributeType.FAITH]: 0,
	[AttributeType.ARCANE]: 0
});

export const heroEquip = writable<HeroEquipState>({
	mainHand: null,
	offHand: null,
	head: null,
	chest: null,
	legs: null,
	arms: null,
	pouch: null,
	pouch2: null,
	pouch3: null,
	pouch4: null,
	greatRune: null
});

export const heroAttack = writable<HeroAttackState>({
	excludeStaminaFromAttackCalc: false,
	activeHand: 'mainHand',
	twoHanding: false
});

export const uiState = writable<UIState>({
	showRuneInfo: false
});
