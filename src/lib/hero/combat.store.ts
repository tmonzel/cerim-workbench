import { derived, writable } from 'svelte/store';
import { equipStore } from './equip.store';
import { heroState } from './state';
import type { AttackItem } from '$lib/weapon';
import type { DynamicAttack } from '$lib/core';
import { calcScaledAttack } from '$lib/weapon/scaling';

export type WeaponAttackState = {
	twoHanding: boolean;
};

export type CombatState = {
	activeHand: 'mainHand' | 'offHand';
	twoHanding: boolean;
};

export const combatStore = writable<CombatState>({
	activeHand: 'mainHand',
	twoHanding: false
});

export type AttackInfoState = {
	weapon: AttackItem;
	attributes: Record<string, number>;
	attack: DynamicAttack;
};

export const attackInfoState = derived([equipStore, heroState, combatStore], ([equip, hero, combat]) => {
	let attributes = hero.totalAttributes;

	if (combat.twoHanding) {
		attributes = { ...attributes, str: attributes.str * 1.5 };
	}

	const weapon = equip[combat.activeHand];

	if (!weapon) {
		return null;
	}

	const attack = calcScaledAttack(weapon, attributes);
	attack.addGroup(hero.attack);

	return {
		weapon,
		attributes,
		attack
	};
});
