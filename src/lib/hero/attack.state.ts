import { AttackType, AttributeType, calcTotal, validateRequirements, type Attack, type DynamicNumber } from '$lib/core';
import { derived } from 'svelte/store';
import { heroState } from './state';
import { heroAttack, heroEquip } from '$lib/state';
import { calculateAttributeAttack, calculateAttributeScaling, scalingAttributes } from '$lib/weapon/scaling';

export type AttributeAttackRecord = { value: number; attack: Attack };
export type AttributeAttackScaling = Partial<Record<AttributeType, AttributeAttackRecord[]>>;

export type AttackState = {
	scaling: AttributeAttackScaling;
	attack: Partial<Record<AttackType, DynamicNumber>>;
	attributes: Record<AttributeType, number>;
	invalidAttributes: AttributeType[];
	totalDamage: number;
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

	let totalDamage = 0;
	const scaling: AttributeAttackScaling = {};
	const scaledAttack: Partial<Record<AttackType, number>> = {};
	const invalidAttributes = validateRequirements(weapon.requirements ?? {}, attributes);

	for (const attackType of Object.values(AttackType)) {
		const attackBase = weapon.attack[attackType] ?? 0;

		if (!attackBase && attackType !== AttackType.SORCERY && attackType !== AttackType.INCANTATION) {
			continue;
		}

		let scalingTotal = 1;

		if (invalidAttributes.some((attr) => weapon.scaling![attr] !== undefined)) {
			scalingTotal = 0.6;
		} else {
			for (const attrType of Object.keys(weapon.scaling) as AttributeType[]) {
				scalingTotal += calculateAttributeScaling(weapon, attributes[attrType] ?? 0, attrType, attackType);
			}
		}

		if (weapon.config.cast === 'sorceries' && attackType === AttackType.SORCERY) {
			scaledAttack[AttackType.SORCERY] = scalingTotal * 100;
		} else if (weapon.config.cast === 'incantations' && attackType === AttackType.INCANTATION) {
			scaledAttack[AttackType.INCANTATION] = scalingTotal * 100;
		} else {
			scaledAttack[attackType] = attackBase * scalingTotal;
		}

		hero.attack[attackType].base += scaledAttack[attackType] ?? 0;
		totalDamage += calcTotal(hero.attack[attackType]);
	}

	// Precalculate attribute scaling curves
	for (const attr of scalingAttributes) {
		if (!weapon.scaling[attr]) {
			continue;
		}

		const data: AttributeAttackRecord[] = [];

		for (let i = 0; i < 99; i++) {
			const attack = calculateAttributeAttack(weapon, i, attr);
			data.push({ value: i, attack });

			//const newMax = Object.values(attack).find((v) => v > maxAttack);

			/*if (newMax) {
				maxAttack = newMax;
			}*/
		}

		scaling[attr] = data;
	}

	return {
		scaling,
		attack: hero.attack,
		attributes,
		invalidAttributes,
		totalDamage
	} satisfies AttackState;
});
