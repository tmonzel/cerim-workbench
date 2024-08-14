import type { DynamicAttack } from '$lib/core';
import type { AttackItem } from '$lib/weapon';
import { derived } from 'svelte/store';
import { heroState } from './state';
import { calcScaledAttack } from '$lib/weapon/scaling';
import { heroAttack, heroEquip } from '$lib/state';

export type AttackState = {
	weapon: AttackItem;
	attributes: Record<string, number>;
	attack: DynamicAttack;
};

export const attackState = derived([heroAttack, heroState, heroEquip], ([attack, hero, equip]) => {
	let attributes = hero.attributes;

	if (attack.twoHanding) {
		attributes = { ...attributes, str: attributes.str * 1.5 };
	}

	const weapon = equip[attack.activeHand];

	if (!weapon) {
		return null;
	}

	const scaledAttack = calcScaledAttack(weapon, attributes);
	scaledAttack.addGroup(hero.attack);

	return {
		weapon,
		attributes,
		attack: scaledAttack
	};
});
