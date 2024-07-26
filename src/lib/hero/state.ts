import { calcScaledAttack, ProtectItem } from '$lib/item';
import { derived } from 'svelte/store';
import type { HeroState } from './types';
import { attributeStore } from './attributes';
import {
	AffinityType,
	AttributeType,
	calcCorrect,
	calcNeededSouls,
	DynamicAttack,
	DynamicAttributes,
	DynamicDamageNegation,
	DynamicDefense,
	DynamicNumber,
	DynamicResistance,
	DynamicStats
} from '$lib/core';
import type { DataDefaults } from '$lib/data';
import { appState } from '$lib/state';
import { attributeTypes, heroTypes } from './data';
import { protectionState } from './protection.state';
import { combatState } from './combat.state';
import { accessoryState } from './accessory.state';

export const HERO_MAX_LEVEL = 713;

export const heroState = derived(
	[appState, attributeStore, accessoryState, combatState, protectionState],
	([config, attributeState, accessories, combat, protection]) => {
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
			effects: [],
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
			poise: new DynamicNumber(),

			mainHandAttack: new DynamicAttack(),
			offHandAttack: new DynamicAttack()
		};

		// Apply item modifications
		for (const item of [...accessories, ...protection, combat.mainHand, combat.offHand]) {
			if (!item) {
				continue;
			}

			// Summarize resistance
			if (item instanceof ProtectItem) {
				hero.resistance.add(item.resistance);
				hero.damageNegation.multiply(item.damageNegation);
			}

			// Summarize poise
			if (item.poise) {
				hero.poise.add(item.poise);
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

		if (combat.mainHand) {
			hero.mainHandAttack = calcScaledAttack(combat.mainHand, totalAttributes);
		}

		if (combat.offHand) {
			hero.offHandAttack = calcScaledAttack(combat.offHand, totalAttributes);
		}

		hero.weightRatio = (hero.stats.get('weight') * 100) / hero.stats.get('equipLoad');

		return hero;
	}
);

export const sharedDataState = derived([attributeStore, appState], ([attributes, app]) => {
	const itemModifications: Record<string, { affinity?: AffinityType; tier?: number }> = {};

	/*for (const item of Object.values(items)) {
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
	}*/

	const equip: Record<string, string> = {};

	/*for (const [slotName, slot] of Object.entries(slots)) {
			if (slot.selectedItemId && items[slot.selectedItemId]) {
				equip[slotName] = slot.selectedItemId;
			}
		}*/

	return {
		heroType: app.heroType,
		attributes,
		itemModifications,
		equip
	} satisfies DataDefaults;
});
