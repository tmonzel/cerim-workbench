import { derived } from 'svelte/store';
import type { HeroState } from './types';
import { attributeStore } from './attributes';
import {
	AttributeType,
	calcCorrect,
	calcNeededSouls,
	DamageType,
	DynamicAttack,
	DynamicAttributes,
	DynamicDamageNegation,
	DynamicDefense,
	DynamicResistance,
	DynamicStats,
	type DamageNegation
} from '$lib/core';
import { attributeTypes, heroTypes } from './data';
import { equipStore } from './equip.store';
import { calcScaledAttack } from '$lib/weapon/scaling';
import { ProtectItem } from '$lib/armor';
import { appStore } from '$lib/state';

export const HERO_MAX_LEVEL = 713;

export const heroState = derived([appStore, attributeStore, equipStore], ([config, attributeState, equip]) => {
	const type = heroTypes.find((t) => t.id === config.heroType)!;
	const attributes = new DynamicAttributes(attributeState);
	const level = attributes.getTotal() + type.level;

	const souls = [...Array<number>(level)].reduce(
		(p, c, index) => p + (index > 0 ? Math.floor(calcNeededSouls(index)) : 0),
		0
	);

	const baseDefense = calcCorrect(level + 79, [
		{ breakpoint: 1, grow: 40 },
		{ breakpoint: 150, grow: 100 },
		{ breakpoint: 170, grow: 120 },
		{ breakpoint: 240, grow: 135 },
		{ breakpoint: 792, grow: 155 }
	]);

	const baseResistance = calcCorrect(level + 79, [
		{ breakpoint: 1, grow: 75 },
		{ breakpoint: 150, grow: 105 },
		{ breakpoint: 190, grow: 145 },
		{ breakpoint: 240, grow: 160 },
		{ breakpoint: 792, grow: 180 }
	]);

	const hero: HeroState = {
		type,
		level,
		progress: level / HERO_MAX_LEVEL,
		souls,
		attributePoints: HERO_MAX_LEVEL - level,
		stats: new DynamicStats(),
		weightRatio: 0,
		totalAttributes: {},
		attributes,

		defense: new DynamicDefense({
			standard: baseDefense,
			pierce: baseDefense,
			slash: baseDefense,
			strike: baseDefense,
			fir: baseDefense,
			hol: baseDefense,
			lit: baseDefense,
			mag: baseDefense
		}),

		resistance: new DynamicResistance({
			immunity: baseResistance,
			focus: baseResistance,
			poise: baseResistance,
			robustness: baseResistance,
			vitality: baseResistance
		}),

		damageNegation: new DynamicDamageNegation(),
		mainHandAttack: new DynamicAttack(),
		offHandAttack: new DynamicAttack()
	};

	// Apply item modifications
	for (const item of Object.values(equip)) {
		if (!item) {
			continue;
		}

		// Sum item weights
		hero.stats.add({ weight: item.weight });

		// Summarize resistance
		if (item instanceof ProtectItem) {
			// Prepare damage negation
			const dn: DamageNegation = {
				[DamageType.STANDARD]: 1 - item.damageNegation.standard / 100,
				[DamageType.STRIKE]: 1 - item.damageNegation.strike / 100,
				[DamageType.SLASH]: 1 - item.damageNegation.slash / 100,
				[DamageType.PIERCE]: 1 - item.damageNegation.pierce / 100,
				[DamageType.HOLY]: 1 - item.damageNegation.hol / 100,
				[DamageType.LIGHTNING]: 1 - item.damageNegation.lit / 100,
				[DamageType.FIRE]: 1 - item.damageNegation.fir / 100,
				[DamageType.MAGIC]: 1 - item.damageNegation.mag / 100
			};

			hero.resistance.add(item.resistance);
			hero.damageNegation.multiply(dn);
			hero.stats.add({ poise: item.poise });
		}

		for (const mod of item.modifiers) {
			mod.modify(hero);
		}
	}

	for (const attr of Object.values(attributeTypes)) {
		if (attr.modifier) {
			attr.modifier.modify(hero);
		}
	}

	const totalAttributes = hero.attributes.getTotalValue();

	for (const attrType of Object.values(AttributeType)) {
		totalAttributes[attrType] += hero.type.attributes[attrType];
	}

	hero.totalAttributes = totalAttributes;

	if (equip.mainHand) {
		hero.mainHandAttack = calcScaledAttack(equip.mainHand, totalAttributes);
	}

	if (equip.offHand) {
		hero.offHandAttack = calcScaledAttack(equip.offHand, totalAttributes);
	}

	hero.weightRatio = (hero.stats.get('weight') * 100) / hero.stats.get('equipLoad');

	return hero;
});
