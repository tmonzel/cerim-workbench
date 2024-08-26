import { createDynamicAttack, type AttackType } from './attack';
import { AttributeType } from './attribute';
import { calcCorrect, calcNeededSouls, DamageType, DynamicValue, type DynamicNumber } from './core';

const HERO_MAX_LEVEL = 713;

export type Hero = {
	level: number;
	attributePoints: number;

	progress: number;
	souls: number;

	weight: number;
	poise: number;

	attack: Record<AttackType, DynamicNumber>;
	attributes: Record<AttributeType, number>;
	damageNegation: Record<string, DynamicValue>;
	stats: Record<string, DynamicValue>;
};

export type HeroType = {
	id: string;
	name: string;
	level: number;
	attributes: Record<AttributeType, number>;
};

export function createHero(type: HeroType, attributes: Record<AttributeType, number>): Hero {
	const level = Object.values(attributes).reduce((p, c) => p + c, 0) + type.level;

	const souls = [...Array<number>(level)].reduce((p, c, index) => p + (index > 0 ? Math.floor(calcNeededSouls(index)) : 0), 0);

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
		level,
		progress: level / HERO_MAX_LEVEL,
		souls,
		attributePoints: HERO_MAX_LEVEL - level,
		attack: createDynamicAttack(),
		weight: 0,
		poise: 0,
		attributes: {
			vig: type.attributes.vig + attributes.vig,
			end: type.attributes.end + attributes.end,
			str: type.attributes.str + attributes.str,
			dex: type.attributes.dex + attributes.dex,
			mnd: type.attributes.mnd + attributes.mnd,
			int: type.attributes.int + attributes.int,
			fth: type.attributes.fth + attributes.fth,
			arc: type.attributes.arc + attributes.arc
		},

		stats: {
			hp: new DynamicValue(),
			fp: new DynamicValue(),
			stamina: new DynamicValue(),
			discovery: new DynamicValue(),
			equipLoad: new DynamicValue(),

			// Resistance
			immunity: new DynamicValue(baseResistance),
			robustness: new DynamicValue(baseResistance),
			focus: new DynamicValue(baseResistance),
			vitality: new DynamicValue(baseResistance),

			// Defense
			standardDefense: new DynamicValue(baseDefense),
			strikeDefense: new DynamicValue(baseDefense),
			slashDefense: new DynamicValue(baseDefense),
			pierceDefense: new DynamicValue(baseDefense),

			magicDefense: new DynamicValue(baseDefense),
			fireDefense: new DynamicValue(baseDefense),
			lightningDefense: new DynamicValue(baseDefense),
			holyDefense: new DynamicValue(baseDefense),

			staminaRecoverySpeed: new DynamicValue(45)
		},

		damageNegation: {
			[DamageType.STANDARD]: new DynamicValue(),
			[DamageType.STRIKE]: new DynamicValue(),
			[DamageType.SLASH]: new DynamicValue(),
			[DamageType.PIERCE]: new DynamicValue(),
			[DamageType.MAGIC]: new DynamicValue(),
			[DamageType.HOLY]: new DynamicValue(),
			[DamageType.LIGHTNING]: new DynamicValue(),
			[DamageType.FIRE]: new DynamicValue(),
			[DamageType.POISE]: new DynamicValue()
		}
	};
}

export const heroTypes: Record<string, HeroType> = {
	hero: {
		id: 'hero',
		name: 'Hero',
		level: 7,
		attributes: {
			[AttributeType.VIGOR]: 14,
			[AttributeType.ENDURANCE]: 12,
			[AttributeType.STRENGTH]: 16,
			[AttributeType.DEXTERITY]: 9,
			[AttributeType.MIND]: 9,
			[AttributeType.INTELLIGENCE]: 7,
			[AttributeType.FAITH]: 8,
			[AttributeType.ARCANE]: 11
		}
	},

	bandit: {
		id: 'bandit',
		name: 'Bandit',
		level: 5,
		attributes: {
			[AttributeType.VIGOR]: 10,
			[AttributeType.ENDURANCE]: 10,
			[AttributeType.STRENGTH]: 9,
			[AttributeType.DEXTERITY]: 13,
			[AttributeType.MIND]: 11,
			[AttributeType.INTELLIGENCE]: 9,
			[AttributeType.FAITH]: 8,
			[AttributeType.ARCANE]: 14
		}
	},

	astrologer: {
		id: 'astrologer',
		name: 'Astrologer',
		level: 6,
		attributes: {
			[AttributeType.VIGOR]: 9,
			[AttributeType.ENDURANCE]: 9,
			[AttributeType.STRENGTH]: 8,
			[AttributeType.DEXTERITY]: 12,
			[AttributeType.MIND]: 15,
			[AttributeType.INTELLIGENCE]: 16,
			[AttributeType.FAITH]: 7,
			[AttributeType.ARCANE]: 9
		}
	},

	warrior: {
		id: 'warrior',
		name: 'Warrior',
		level: 8,
		attributes: {
			[AttributeType.VIGOR]: 11,
			[AttributeType.ENDURANCE]: 11,
			[AttributeType.STRENGTH]: 10,
			[AttributeType.DEXTERITY]: 16,
			[AttributeType.MIND]: 12,
			[AttributeType.INTELLIGENCE]: 10,
			[AttributeType.FAITH]: 8,
			[AttributeType.ARCANE]: 9
		}
	},

	prisoner: {
		id: 'prisoner',
		name: 'Prisoner',
		level: 9,
		attributes: {
			[AttributeType.VIGOR]: 11,
			[AttributeType.ENDURANCE]: 11,
			[AttributeType.STRENGTH]: 11,
			[AttributeType.DEXTERITY]: 14,
			[AttributeType.MIND]: 12,
			[AttributeType.INTELLIGENCE]: 14,
			[AttributeType.FAITH]: 6,
			[AttributeType.ARCANE]: 9
		}
	},

	confessor: {
		id: 'confessor',
		name: 'Confessor',
		level: 10,
		attributes: {
			[AttributeType.VIGOR]: 10,
			[AttributeType.ENDURANCE]: 10,
			[AttributeType.STRENGTH]: 12,
			[AttributeType.DEXTERITY]: 12,
			[AttributeType.MIND]: 13,
			[AttributeType.INTELLIGENCE]: 9,
			[AttributeType.FAITH]: 14,
			[AttributeType.ARCANE]: 9
		}
	},

	wretch: {
		id: 'wretch',
		name: 'Wretch',
		level: 1,
		attributes: {
			[AttributeType.VIGOR]: 10,
			[AttributeType.ENDURANCE]: 10,
			[AttributeType.STRENGTH]: 10,
			[AttributeType.DEXTERITY]: 10,
			[AttributeType.MIND]: 10,
			[AttributeType.INTELLIGENCE]: 10,
			[AttributeType.FAITH]: 10,
			[AttributeType.ARCANE]: 10
		}
	},

	vagabond: {
		id: 'vagabond',
		name: 'Vagabond',
		level: 9,
		attributes: {
			[AttributeType.VIGOR]: 15,
			[AttributeType.ENDURANCE]: 11,
			[AttributeType.STRENGTH]: 14,
			[AttributeType.DEXTERITY]: 13,
			[AttributeType.MIND]: 10,
			[AttributeType.INTELLIGENCE]: 9,
			[AttributeType.FAITH]: 9,
			[AttributeType.ARCANE]: 7
		}
	},

	prophet: {
		id: 'prophet',
		name: 'Prophet',
		level: 7,
		attributes: {
			[AttributeType.VIGOR]: 10,
			[AttributeType.ENDURANCE]: 8,
			[AttributeType.STRENGTH]: 11,
			[AttributeType.DEXTERITY]: 10,
			[AttributeType.MIND]: 14,
			[AttributeType.INTELLIGENCE]: 7,
			[AttributeType.FAITH]: 16,
			[AttributeType.ARCANE]: 10
		}
	},

	samurai: {
		id: 'samurai',
		name: 'Samurai',
		level: 9,
		attributes: {
			[AttributeType.VIGOR]: 12,
			[AttributeType.ENDURANCE]: 13,
			[AttributeType.STRENGTH]: 12,
			[AttributeType.DEXTERITY]: 15,
			[AttributeType.MIND]: 11,
			[AttributeType.INTELLIGENCE]: 9,
			[AttributeType.FAITH]: 8,
			[AttributeType.ARCANE]: 8
		}
	}
};
