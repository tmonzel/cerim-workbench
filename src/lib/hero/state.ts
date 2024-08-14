import { derived } from 'svelte/store';
import {
	AttributeType,
	calcCorrect,
	calcNeededSouls,
	DamageType,
	DynamicAttack,
	DynamicValue,
	statTypes
} from '$lib/core';
import { ProtectItem } from '$lib/armor';
import type { HeroState } from './types';
import type { ItemEffect } from '$lib/item';
import { heroAttributes, heroEquip, heroType } from '$lib/state';
import { heroTypes } from './data';

export const HERO_MAX_LEVEL = 713;

export const heroTypeState = derived(heroType, (type) => {
	return heroTypes[type];
});

export const heroEffectState = derived(heroEquip, (equip) => {
	const effects: ItemEffect[] = [];

	for (const item of Object.values(equip)) {
		if (!item) {
			continue;
		}

		for (const effect of item.effects) {
			if (!effect.activated) {
				continue;
			}

			effects.push(effect);
		}
	}

	return effects;
});

export const heroModifiedAttributes = derived(heroEffectState, (effects) => {
	const modifiedAttributes: Record<string, number> = {
		[AttributeType.VIGOR]: 0,
		[AttributeType.ENDURANCE]: 0,
		[AttributeType.STRENGTH]: 0,
		[AttributeType.DEXTERITY]: 0,
		[AttributeType.MIND]: 0,
		[AttributeType.INTELLIGENCE]: 0,
		[AttributeType.FAITH]: 0,
		[AttributeType.ARCANE]: 0
	};

	for (const effect of effects) {
		if (!effect.modifiers) {
			continue;
		}

		for (const mod of effect.modifiers) {
			if (mod.type === 'attributes') {
				modifiedAttributes[mod.key] = mod.value;
			}
		}
	}

	return modifiedAttributes;
});

export const heroState = derived(
	[heroEquip, heroAttributes, heroModifiedAttributes, heroTypeState],
	([equip, attributes, modifiedAttributes, type]) => {
		const level = Object.values(attributes).reduce((p, c) => p + c, 0) + type.level;

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
			level,
			progress: level / HERO_MAX_LEVEL,
			souls,
			attributePoints: HERO_MAX_LEVEL - level,
			attack: new DynamicAttack(),
			weight: 0,
			poise: 0,
			attributes: {
				vig: type.attributes.vig + attributes.vig + modifiedAttributes.vig,
				end: type.attributes.end + attributes.end + modifiedAttributes.end,
				str: type.attributes.str + attributes.str + modifiedAttributes.str,
				dex: type.attributes.dex + attributes.dex + modifiedAttributes.dex,
				mnd: type.attributes.mnd + attributes.mnd + modifiedAttributes.mnd,
				int: type.attributes.int + attributes.int + modifiedAttributes.int,
				fth: type.attributes.fth + attributes.fth + modifiedAttributes.fth,
				arc: type.attributes.arc + attributes.arc + modifiedAttributes.arc
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

		// Apply item modifications
		for (const item of Object.values(equip)) {
			if (!item) {
				continue;
			}

			// Sum item weights
			hero.weight += item.weight;

			// Summarize resistance
			if (item instanceof ProtectItem) {
				hero.poise += item.poise;

				hero.stats.immunity.base += item.resistance.immunity;
				hero.stats.robustness.base += item.resistance.robustness;
				hero.stats.focus.base += item.resistance.focus;
				hero.stats.vitality.base += item.resistance.vitality;

				for (const damageType of Object.values(DamageType)) {
					hero.damageNegation[damageType].base =
						100 - (100 - hero.damageNegation[damageType].base) * (1 - item.damageNegation[damageType] / 100);
				}
			}

			for (const effect of item.effects) {
				if (!effect.activated) {
					continue;
				}

				applyEffectModify(effect, hero);
			}
		}

		for (const [name, stat] of Object.entries(statTypes)) {
			if (!stat.attributeScaling) {
				continue;
			}

			hero.stats[name].base += calcCorrect(
				hero.attributes[stat.attributeScaling.type],
				stat.attributeScaling.mutations
			);
		}

		return hero;
	}
);

export function applyEffectModify(effect: ItemEffect, hero: HeroState): void {
	for (const modifier of effect.modifiers ?? []) {
		const key = modifier.key;
		const value = modifier.value;

		switch (key) {
			case 'discovery':
			case 'staminaRecoverySpeed':
			case 'hp':
			case 'fp':
			case 'stamina':
			case 'equipLoad':
			case 'immunity':
			case 'robustness':
			case 'focus':
			case 'vitality':
				switch (modifier.operation) {
					case 'multiply':
						hero.stats[key].multiply(value);
						break;
					default:
						hero.stats[key].add(value);
				}
		}

		switch (modifier.type) {
			case 'attack':
				switch (modifier.operation) {
					case 'multiply':
						hero.attack.addMultiplier({ [key]: value });
						break;
					default:
						hero.attack.addOffset({ [key]: value });
				}
				break;

			case 'absorption':
				hero.damageNegation[key].base = 100 - (100 - hero.damageNegation[key].base) * value;
		}
	}
}
