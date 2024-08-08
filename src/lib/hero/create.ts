import {
	calcCorrect,
	calcNeededSouls,
	DynamicAttack,
	DynamicAttributes,
	DynamicDamageNegation,
	DynamicStats
} from '$lib/core';
import { HERO_MAX_LEVEL } from './state';
import { DiscoveryStat } from './stats/DiscoveryStat';
import { EquipLoadStat } from './stats/EquipLoadStat';
import { FireDefenseStat } from './stats/FireDefenseStat';
import { FocusStat } from './stats/FocusStat';
import { FPStat } from './stats/FPStat';
import { HolyDefenseStat } from './stats/HolyDefenseStat';
import { HPStat } from './stats/HPStat';
import { ImmunityStat } from './stats/ImmunityStat';
import { LightningDefenseStat } from './stats/LightningDefenseStat';
import { MagicDefenseStat } from './stats/MagicDefenseStat';
import { PierceDefenseStat } from './stats/PierceDefenseStat';
import { RobustnessStat } from './stats/RobustnessStat';
import { SlashDefenseStat } from './stats/SlashDefenseStat';
import { StaminaStat } from './stats/StaminaStat';
import { StandardDefenseStat } from './stats/StandardDefenseStat';
import { StrikeDefenseStat } from './stats/StrikeDefenseStat';
import { VitalityStat } from './stats/VitalityStat';
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
		poise: 0,
		totalAttributes: {},
		attributes,

		hp: new HPStat(),
		fp: new FPStat(),
		stamina: new StaminaStat(),
		discovery: new DiscoveryStat(),
		equipLoad: new EquipLoadStat(),

		// Resistance
		immunity: new ImmunityStat(baseResistance),
		robustness: new RobustnessStat(baseResistance),
		focus: new FocusStat(baseResistance),
		vitality: new VitalityStat(baseResistance),

		// Defense
		standardDefense: new StandardDefenseStat(baseDefense),
		strikeDefense: new StrikeDefenseStat(baseDefense),
		slashDefense: new SlashDefenseStat(baseDefense),
		pierceDefense: new PierceDefenseStat(baseDefense),

		magicDefense: new MagicDefenseStat(baseDefense),
		fireDefense: new FireDefenseStat(baseDefense),
		lightningDefense: new LightningDefenseStat(baseDefense),
		holyDefense: new HolyDefenseStat(baseDefense),

		damageNegation: new DynamicDamageNegation()
	};
}
