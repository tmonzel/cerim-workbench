import { AttributeType } from './attributes';
import { DamageType } from './damage';
import { DynamicValue } from './DynamicValue';
import { calcCorrect, calcNeededSouls, createDynamicAttack, createDynamicNumber } from './helpers';
import { AttackType, type Hero, type HeroType } from './types';

const HERO_MAX_LEVEL = 713;

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
