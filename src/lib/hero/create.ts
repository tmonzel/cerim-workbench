import {
	calcCorrect,
	calcNeededSouls,
	DynamicAttack,
	DynamicAttributes,
	DynamicDamageNegation,
	DynamicDefense,
	DynamicResistance,
	DynamicStats
} from '$lib/core';
import { HERO_MAX_LEVEL } from './state';
import type { HeroState, HeroType } from './types';

export function createHero(type: HeroType, attributeState: Record<string, number>): HeroState {
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

	return {
		type,
		level,
		progress: level / HERO_MAX_LEVEL,
		souls,
		attributePoints: HERO_MAX_LEVEL - level,
		attack: new DynamicAttack(),
		stats: new DynamicStats(),
		weight: 0,
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
			mag: baseDefense,
			poise: 0
		}),

		resistance: new DynamicResistance({
			immunity: baseResistance,
			focus: baseResistance,
			poise: baseResistance,
			robustness: baseResistance,
			vitality: baseResistance
		}),

		damageNegation: new DynamicDamageNegation()
	};
}
