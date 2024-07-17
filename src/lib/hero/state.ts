import { AttackItem, itemStore, type Item } from '$lib/item';
import { derived } from 'svelte/store';
import type { EquipState, HeroState } from './types';
import { attributeStore } from './attributes';
import { slotStore } from './equip';
import {
	AffinityType,
	calcCorrect,
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
import { appState } from '$lib/state';
import { attributeRecord } from '$lib/records';

export const heroState = derived(
	[attributeStore, slotStore, appState, itemStore],
	([attributes, slots, app, items]) => {
		const numDistributedPoints = Object.values(attributes).reduce((p, c) => p + c, 0);
		const level = Math.floor(numDistributedPoints / app.attributePointsPerLevel);

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
			progress: level / app.maxLevel,
			attributePoints: app.attributePointsPerLevel * app.maxLevel - numDistributedPoints,
			stats: new DynamicStats(),
			equip,
			effects: [],
			attributes: new DynamicAttributes(attributes),
			attack: new DynamicAttack(),

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

			// Summarize damage negation
			if (item.damageNegation) {
				hero.damageNegation.add(item.damageNegation);
			}

			// Summarize guard
			if (item instanceof AttackItem) {
				hero.guard.add(item.guard);
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

		for (const [part, item] of Object.entries(equip) as [keyof EquipState, Item | null][]) {
			if (!item) {
				continue;
			}

			const slot = slots[part];

			if (item instanceof AttackItem) {
				if (slot.useWithTwoHands) {
					hero.equip[part] = item.applyAttributes({
						...totalAttributes,
						str: totalAttributes.str * 1.5
					});
				} else {
					hero.equip[part] = item.applyAttributes(totalAttributes);
				}

				if (item.scaledAttack) {
					for (const damage of list(item.scaledAttack)) {
						hero.attack.add({ [damage.key]: item.scaledAttack[damage.key] });
					}
				}
			} else {
				hero.equip[part] = item.applyAttributes(totalAttributes);
			}
		}

		return hero;
	}
);

export const sharedDataState = derived([attributeStore, itemStore], ([attributes, items]) => {
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

	return {
		attributes,
		itemModifications
	} satisfies DataDefaults;
});
