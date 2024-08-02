import { derived, writable } from 'svelte/store';
import { equipStore } from './equip.store';
import { heroState } from './state';
import type { AttackItem } from '$lib/weapon';
import type { DynamicAttack } from '$lib/core';
import { calcScaledAttack } from '$lib/weapon/scaling';
import type { HeroState } from './types';

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

function createWeaponInfo(weapon: AttackItem, hero: HeroState, state: WeaponAttackState): EquippedWeaponInfo {
	let attributes = hero.totalAttributes;

	if (state.twoHanding) {
		attributes = prepareAttributesForTwoHanding(attributes);
	}

	const attack = calcScaledAttack(weapon, attributes);
	attack.addGroup(hero.attack);

	return {
		weapon,
		attributes,
		attack
	};
}

export const attackInfoState = derived([equipStore, heroState, combatStore], ([equip, hero, combat]) => {
	const state: AttackInfoState = {
		mainHand: null,
		offHand: null
	};

	if (equip.mainHand) {
		state.mainHand = createWeaponInfo(equip.mainHand, hero, combat.mainHand);
	}

	if (equip.offHand) {
		state.offHand = createWeaponInfo(equip.offHand, hero, combat.offHand);
	}

	return state;
});
