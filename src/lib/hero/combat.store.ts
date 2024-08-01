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
	mainHand: WeaponAttackState;
	offHand: WeaponAttackState;
};

export const combatStore = writable<CombatState>({
	mainHand: {
		twoHanding: false
	},
	offHand: {
		twoHanding: false
	}
});

export type EquippedWeaponInfo = {
	weapon: AttackItem;
	attributes: Record<string, number>;
	attack: DynamicAttack;
};

export type AttackInfoState = {
	mainHand: EquippedWeaponInfo | null;
	offHand: EquippedWeaponInfo | null;
};

function prepareAttributesForTwoHanding(attributes: Record<string, number>): Record<string, number> {
	return { ...attributes, str: attributes.str * 1.5 };
}

export const attackInfoState = derived([equipStore, heroState, combatStore], ([equip, hero, combat]) => {
	const state: AttackInfoState = {
		mainHand: null,
		offHand: null
	};

	let attributes = hero.totalAttributes;

	if (equip.mainHand) {
		if (combat.mainHand.twoHanding) {
			attributes = prepareAttributesForTwoHanding(attributes);
		}

		state.mainHand = {
			weapon: equip.mainHand,
			attributes,
			attack: calcScaledAttack(equip.mainHand, attributes)
		};
	}

	if (equip.offHand) {
		if (combat.offHand.twoHanding) {
			attributes = prepareAttributesForTwoHanding(attributes);
		}

		state.offHand = {
			weapon: equip.offHand,
			attributes,
			attack: calcScaledAttack(equip.offHand, attributes)
		};
	}

	return state;
});
