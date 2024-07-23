import { AttackItem, itemStore, type Item } from '$lib/item';
import { derived } from 'svelte/store';
import type { EquipState, HeroState } from './types';
import { attributeStore } from './attributes';
import { slotStore } from './equip';
import {
	AffinityType,
	AttackType,
	AttributeType,
	calcCorrect,
	calcNeededSouls,
	DynamicAttack,
	DynamicAttributes,
	DynamicDamageNegation,
	DynamicDefense,
	DynamicGuard,
	DynamicResistance,
	DynamicStats,
	list
} from '$lib/core';
import type { DataDefaults } from '$lib/data';
import { attributeRecord } from '$lib/records';
import { HERO_MAX_LEVEL } from '$lib/config';
import { appState } from '$lib/state';
import { heroTypes } from './data';

export const heroState = derived(
	[appState, attributeStore, slotStore, itemStore],
	([config, attributeState, slots, items]) => {
		const equip: EquipState = {
			rune: null,
			pouch: null,
			pouch2: null,
			pouch3: null,
			pouch4: null,
			head: null,
			chest: null,
			legs: null,
			hand: null,
			mainHand: null,
			offHand: null
		};

		for (const [slotName, slot] of Object.entries(slots)) {
			if (slot.selectedItemId && items[slot.selectedItemId]) {
				equip[slotName as keyof EquipState] = items[slot.selectedItemId];
			}
		}

		const type = heroTypes.find((t) => t.id === config.heroType)!;
		const attributes = new DynamicAttributes(attributeState);
		const level = attributes.getTotal() + type.level;

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

		const souls = [...Array<number>(level)].reduce(
			(p, c, index) => p + (index > 0 ? Math.floor(calcNeededSouls(index)) : 0),
			0
		);

		const hero: HeroState = {
			type,
			level,
			progress: level / HERO_MAX_LEVEL,
			souls,
			attributePoints: HERO_MAX_LEVEL - level,
			stats: new DynamicStats(),
			equip,
			effects: [],
			weightRatio: 0,
			attributes,
			attack: {
				mainHand: new DynamicAttack(),
				offHand: new DynamicAttack()
			},

			resistance: new DynamicResistance({
				immunity: baseResistance,
				focus: baseResistance,
				poise: baseResistance,
				robustness: baseResistance,
				vitality: baseResistance
			}),

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

			damageNegation: new DynamicDamageNegation(),
			guard: new DynamicGuard()
		};

		// Apply item modifications
		for (const item of Object.values(equip)) {
			if (!item) {
				continue;
			}

			// Summarize resistance
			if (item.resistance) {
				hero.resistance.add(item.resistance);
			}

			// Multiply damage negation
			if (item.damageNegation) {
				hero.damageNegation.multiply(item.damageNegation);
			}

			// Summarize guard
			if (item instanceof AttackItem) {
				hero.guard.add(item.guard);
			}

			// Summarize poise
			if (item.poise) {
				hero.stats.add({ poise: item.poise });
			}

			for (const mod of item.modifiers) {
				mod.modify(hero);
			}

			if (item.effects) {
				hero.effects.push(...item.effects);
			}

			// Sum item weights
			hero.stats.add({ weight: item.weight });
		}

		for (const attr of Object.values(attributeRecord)) {
			if (attr.modifier) {
				attr.modifier.modify(hero);
			}
		}

		const totalAttributes = hero.attributes.getTotalValue();

		for (const attrType of Object.values(AttributeType)) {
			totalAttributes[attrType] += type.attributes[attrType];
		}

		for (const [part, item] of Object.entries(equip) as [keyof EquipState, Item | null][]) {
			if (!item) {
				continue;
			}

			const slot = slots[part];

			if (item instanceof AttackItem) {
				if (slot.useWithTwoHands) {
					item.applyAttributes({
						...totalAttributes,
						str: totalAttributes.str * 1.5
					});
					item.scaleAttack(config.excludeStaminaFromAttackCalc ? [AttackType.STAMINA] : []);

					hero.equip[part] = item;
				} else {
					item.applyAttributes(totalAttributes);
					item.scaleAttack(config.excludeStaminaFromAttackCalc ? [AttackType.STAMINA] : []);

					hero.equip[part] = item;
				}

				if (item.scaledAttack) {
					for (const damage of list(item.scaledAttack)) {
						if (part === 'mainHand') {
							hero.attack.mainHand.add({ [damage.key]: item.scaledAttack[damage.key] });
						} else if (part === 'offHand') {
							hero.attack.offHand.add({ [damage.key]: item.scaledAttack[damage.key] });
						}
					}
				}
			} else {
				hero.equip[part] = item.applyAttributes(totalAttributes);
			}
		}

		hero.weightRatio = (hero.stats.get('weight') * 100) / hero.stats.get('equipLoad');

		return hero;
	}
);

export const sharedDataState = derived(
	[attributeStore, itemStore, slotStore, appState],
	([attributes, items, slots, app]) => {
		const itemModifications: Record<string, { affinity?: AffinityType; tier?: number }> = {};

		for (const item of Object.values(items)) {
			if (!item.modified) {
				continue;
			}

			const mod: { affinity?: AffinityType; tier?: number } = {};

			if (item instanceof AttackItem && item.affinity) {
				mod.affinity = item.affinity;
			}

			if (item.tier > 0) {
				mod.tier = item.tier;
			}

			itemModifications[item.id] = mod;
		}

		const equip: Record<string, string> = {};

		for (const [slotName, slot] of Object.entries(slots)) {
			if (slot.selectedItemId && items[slot.selectedItemId]) {
				equip[slotName] = slot.selectedItemId;
			}
		}

		return {
			heroType: app.heroType,
			attributes,
			itemModifications,
			equip
		} satisfies DataDefaults;
	}
);
