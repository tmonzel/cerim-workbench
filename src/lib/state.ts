import { AttributeType } from './attribute';
import { AttackType, calcCorrect, DamageType } from './core';
import { createHero, heroTypes } from './hero';
import { AttackItem, InventoryItem, ProtectItem, type AccessoryItem, type ItemEffect } from './item';
import { derived, writable } from 'svelte/store';
import { statTypes } from './stat/types';

export type HeroEquipState = {
	mainHand: AttackItem | null;
	offHand: AttackItem | null;

	head: ProtectItem | null;
	chest: ProtectItem | null;
	legs: ProtectItem | null;
	arms: ProtectItem | null;

	pouch: AccessoryItem | null;
	pouch2: AccessoryItem | null;
	pouch3: AccessoryItem | null;
	pouch4: AccessoryItem | null;

	greatRune: InventoryItem | null;
};

export type HeroAttackState = {
	excludeStaminaFromAttackCalc: boolean;
	activeHand: 'mainHand' | 'offHand';
	twoHanding: boolean;
};

export type UIState = {
	showRuneInfo: boolean;
};

export const heroType = writable<string>('wretch');
export const heroContext = writable<string>('dashboard');
export const heroAttributes = writable<Record<AttributeType, number>>({
	[AttributeType.VIGOR]: 0,
	[AttributeType.ENDURANCE]: 0,
	[AttributeType.STRENGTH]: 0,
	[AttributeType.DEXTERITY]: 0,
	[AttributeType.MIND]: 0,
	[AttributeType.INTELLIGENCE]: 0,
	[AttributeType.FAITH]: 0,
	[AttributeType.ARCANE]: 0
});

export const heroEquip = writable<HeroEquipState>({
	mainHand: null,
	offHand: null,
	head: null,
	chest: null,
	legs: null,
	arms: null,
	pouch: null,
	pouch2: null,
	pouch3: null,
	pouch4: null,
	greatRune: null
});

export const heroAttack = writable<HeroAttackState>({
	excludeStaminaFromAttackCalc: false,
	activeHand: 'mainHand',
	twoHanding: false
});

export const uiState = writable<UIState>({
	showRuneInfo: false
});

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
	const modifiedAttributes: Record<AttributeType, number> = {
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
				modifiedAttributes[mod.key as AttributeType] += mod.value;
			}
		}
	}

	return modifiedAttributes;
});

export const heroState = derived(
	[heroEquip, heroAttributes, heroModifiedAttributes, heroTypeState],
	([equip, attributes, modifiedAttributes, type]) => {
		const hero = createHero(type, attributes);

		for (const t of Object.values(AttributeType)) {
			hero.attributes[t] += modifiedAttributes[t];
		}

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
					hero.damageNegation[damageType].base = 100 - (100 - hero.damageNegation[damageType].base) * (1 - item.damageNegation[damageType] / 100);
				}
			}

			// Apply item effects
			for (const effect of item.effects) {
				if (!effect.activated) {
					continue;
				}

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
									hero.attack[key as AttackType].multiplier *= value;
									break;
								default:
									hero.attack[key as AttackType].offset += value;
							}
							break;

						case 'absorption':
							hero.damageNegation[key].base = 100 - (100 - hero.damageNegation[key].base) * value;
					}
				}
			}
		}

		for (const [name, stat] of Object.entries(statTypes)) {
			if (!stat.attributeScaling) {
				continue;
			}

			hero.stats[name].base += calcCorrect(hero.attributes[stat.attributeScaling.type], stat.attributeScaling.mutations);
		}

		return hero;
	}
);
