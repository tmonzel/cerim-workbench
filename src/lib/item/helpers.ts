import { AttackType, AttributeType, calcCorrect, DynamicAttack, type Attack } from '$lib/core';
import type { AttackItem } from '$lib/item';

function calculateAttributeScaling(
	weapon: AttackItem,
	attrValue: number,
	attrType: AttributeType,
	attackType: AttackType
): number {
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

function scaleAttack(
	weapon: AttackItem,
	attributes: Record<string, number>,
	excludeAttackTypes?: AttackType[]
): Attack {
	const scaledAttack: Attack = {};
	const invalidAttributes = validateRequirements(weapon.attributeRequirements ?? {}, attributes);

	for (const attackType of Object.values(AttackType)) {
		const attackBase = weapon.attack[attackType] ?? 0;

		if (!attackBase && attackType !== AttackType.SORCERY && attackType !== AttackType.INCANTATION) {
			continue;
		}

		if (excludeAttackTypes && excludeAttackTypes.includes(attackType)) {
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
	}

	return scaledAttack;
}

export function calcScaledAttack(weapon: AttackItem, attributes: Record<string, number>): DynamicAttack {
	const scaledAttack = scaleAttack(weapon, attributes);
	const attack = new DynamicAttack();

	for (const key of Object.keys(scaledAttack) as AttackType[]) {
		attack.add({ [key]: scaledAttack[key] });
	}

	return attack;
}

export function validateRequirements(
	requirements: Record<string, number>,
	attributes: Record<string, number>
): string[] {
	const invalidAttributes = [];

	for (const [t, n] of Object.entries(requirements)) {
		if (typeof attributes[t] === 'number' && attributes[t] < n) {
			invalidAttributes.push(t);
		}
	}

	return invalidAttributes;
}
