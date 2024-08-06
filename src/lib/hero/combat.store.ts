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
	mainHand: WeaponAttackState;
	offHand: WeaponAttackState;
};

export const combatStore = writable<CombatState>({
	activeHand: 'mainHand',
	mainHand: {
		twoHanding: false
	},
	offHand: {
		twoHanding: false
	}
});

export type AttackInfoState = {
	weapon: AttackItem;
	attributes: Record<string, number>;
	attack: DynamicAttack;
};

function prepareAttributesForTwoHanding(attributes: Record<string, number>): Record<string, number> {
	return { ...attributes, str: attributes.str * 1.5 };
}

export const attackInfoState = derived([equipStore, heroState, combatStore], ([equip, hero, combat]) => {
	let attributes = hero.totalAttributes;

	const state = combat[combat.activeHand];

	if (state.twoHanding) {
		attributes = prepareAttributesForTwoHanding(attributes);
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
