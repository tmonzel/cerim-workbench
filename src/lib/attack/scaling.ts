import { AttributeType } from '$lib/attribute';
import { calcCorrect, calcTotal, validateRequirements, type DynamicNumber } from '$lib/core';
import type { AttackItem } from '$lib/item';
import { createDynamicAttack } from './helpers';
import { AttackType, type Attack, type AttributeAttackRecord } from './types';

export const scalingAttributes = [
	AttributeType.STRENGTH,
	AttributeType.DEXTERITY,
	AttributeType.INTELLIGENCE,
	AttributeType.FAITH,
	AttributeType.ARCANE
];

export type AttributeAttackScaling = Partial<Record<AttributeType, AttributeAttackRecord[]>>;

export type ScaledAttack = {
	scaling: AttributeAttackScaling;
	attack: Partial<Record<AttackType, DynamicNumber>>;
	attributes: Record<AttributeType, number>;
	invalidAttributes: AttributeType[];
	totalDamage: number;
};

export function getScalingLetter(base: number): string {
	const b = Math.floor(base);

	if (b <= 24) {
		return 'E';
	}

	if (b <= 59) {
		return 'D';
	}

	if (b <= 89) {
		return 'C';
	}

	if (b <= 139) {
		return 'B';
	}

	if (b <= 175) {
		return 'A';
	}

	return 'S';
}

export function calculateAttributeScaling(weapon: AttackItem, attrValue: number, attrType: AttributeType, attackType: AttackType): number {
	const scaling = weapon.scaling[attrType];

	if (!scaling || !scaling.attackTypes.includes(attackType)) {
		return 0;
	}

	const upgradeScaling = scaling.base / 100;
	let attrScaling: number;

	if (weapon.config.cast === 'sorceries' && attrType === AttributeType.INTELLIGENCE) {
		attrScaling = calcCorrect(attrValue, weapon.attackMutations['mag'] ?? []) / 100;
	} else {
		attrScaling = calcCorrect(attrValue, weapon.attackMutations[attackType] ?? []) / 100;
	}

	return attrScaling * upgradeScaling;
}

export function calculateAttributeAttack(weapon: AttackItem, attrValue: number, attrType: AttributeType): Attack {
	const attack: Attack = {};
	const config = weapon.scaling[attrType];

	for (const attackType of Object.values(AttackType)) {
		if (!config || !config.attackTypes.includes(attackType)) {
			continue;
		}

		const scaling = 1 + calculateAttributeScaling(weapon, attrValue, attrType, attackType);

		if (weapon.config.cast === 'sorceries' && attackType === AttackType.SORCERY) {
			attack[AttackType.SORCERY] = scaling * 100;
		} else if (weapon.config.cast === 'incantations' && attackType === AttackType.INCANTATION) {
			attack[AttackType.INCANTATION] = scaling * 100;
		} else if (weapon.attack[attackType]) {
			attack[attackType] = weapon.attack[attackType] * scaling;
		}
	}

	return attack;
}

export function calculateAttackScaling(
	baseAttack: Attack,
	weapon: AttackItem,
	attack: Record<AttackType, DynamicNumber>,
	attributes: Record<AttributeType, number>,
	twoHanding = false
): ScaledAttack {
	if (twoHanding) {
		attributes = { ...attributes, str: attributes.str * 1.5 };
	}

	let totalDamage = 0;
	const atk = createDynamicAttack();
	const scaling: AttributeAttackScaling = {};
	const scaledAttack: Partial<Record<AttackType, number>> = {};
	const invalidAttributes = validateRequirements(weapon.requirements ?? {}, attributes);

	for (const attackType of Object.values(AttackType)) {
		const attackBase = baseAttack[attackType] ?? 0;

		if (!attackBase && attackType !== AttackType.SORCERY && attackType !== AttackType.INCANTATION) {
			continue;
		}

		let scalingTotal = 1;

		for (const attrType of Object.keys(weapon.scaling) as AttributeType[]) {
			scalingTotal += calculateAttributeScaling(weapon, attributes[attrType] ?? 0, attrType, attackType);
		}

		if (invalidAttributes.some((attr) => weapon.scaling![attr] !== undefined)) {
			scalingTotal *= 0.6;
		}

		if (weapon.config.cast === 'sorceries' && attackType === AttackType.SORCERY) {
			scaledAttack[AttackType.SORCERY] = scalingTotal * 100;
		} else if (weapon.config.cast === 'incantations' && attackType === AttackType.INCANTATION) {
			scaledAttack[AttackType.INCANTATION] = scalingTotal * 100;
		} else {
			scaledAttack[attackType] = attackBase * scalingTotal;
		}

		atk[attackType].base += scaledAttack[attackType] ?? 0;

		// Add global hero attack
		atk[attackType].base += attack[attackType].base;
		atk[attackType].offset = attack[attackType].offset;
		atk[attackType].multiplier = attack[attackType].multiplier;

		totalDamage += calcTotal(atk[attackType]);
	}

	// Precalculate attribute scaling curves
	for (const attr of scalingAttributes) {
		if (!weapon.scaling[attr]) {
			continue;
		}

		const data: AttributeAttackRecord[] = [];

		// Attribute modifications and two handed mode increase the x pos above 99 so
		// we need to make some more iterations (need to improve this part in future versions)
		for (let i = 0; i < 100; i++) {
			data.push({ value: i, attack: calculateAttributeAttack(weapon, i, attr) });
		}

		scaling[attr] = data;
	}

	return {
		scaling,
		attack: atk,
		attributes,
		invalidAttributes,
		totalDamage
	};
}
