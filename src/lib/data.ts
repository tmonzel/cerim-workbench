import { AffinityType, AttributeType, type AttackCorrect, type GraphMutation } from './core';
import { type ItemData, type SpEffect } from './item/types';
import { writable } from 'svelte/store';
import { attributeStore } from './hero';
import { appState } from './state';
import { AttackItem } from './weapon/AttackItem';
import { weaponStore } from './weapon/weapon.store';
import type { UpgradeSchema, WeaponEntity } from './weapon';
import { armorStore, ProtectItem } from './armor';
import { AccessoryItem, accessoryStore } from './accessory';

export type DataSchema = {
	defaults?: DataDefaults;

	items?: {
		weapons: Record<string, WeaponEntity>;
		armors: Record<string, ItemData>;
		accessories: Record<string, ItemData>;
	};

	upgradeSchemata?: Record<string, UpgradeSchema>;
	mutations?: Record<string, GraphMutation[]>;
	attackCorrect?: Record<string, AttackCorrect>;
	spEffects?: Record<string, SpEffect>;
};

export type DataDefaults = {
	heroType: string;
	attributes?: Record<string, number>;
	equip?: Record<string, string>;
	itemModifications?: Record<string, { tier?: number; affinity?: AffinityType }>;
};

export const attackCorrectRecord: Record<string, AttackCorrect> = {};
export const mutationRecord: Record<string, GraphMutation[]> = {};
export const upgradeSchemata: Record<string, UpgradeSchema> = {};
export const spEffectsMap = new Map<number, SpEffect>();
export const dataStore = writable<DataSchema | null>(null);

export function loadData(data: DataSchema) {
	if (data.mutations) {
		for (const name in data.mutations) {
			mutationRecord[name] = data.mutations[name];
		}
	}

	if (data.upgradeSchemata) {
		for (const name in data.upgradeSchemata) {
			upgradeSchemata[name] = data.upgradeSchemata[name];
		}
	}

	if (data.attackCorrect) {
		for (const key in data.attackCorrect) {
			attackCorrectRecord[key] = data.attackCorrect[key];
		}
	}

	if (data.spEffects) {
		for (const id in data.spEffects) {
			spEffectsMap.set(Number(id), data.spEffects[id]);
		}
	}

	// Resolve item data
	if (data.items) {
		const weapons: Record<string, AttackItem> = {};
		const armors: Record<string, ProtectItem> = {};
		const accessories: Record<string, AccessoryItem> = {};

		for (const id in data.items.weapons) {
			weapons[id] = new AttackItem(id, data.items.weapons[id]);
		}

		for (const id in data.items.armors) {
			armors[id] = new ProtectItem(id, data.items.armors[id]);
		}

		for (const id in data.items.accessories) {
			accessories[id] = new AccessoryItem(id, data.items.accessories[id]);
		}

		armorStore.loadAll(armors);
		weaponStore.loadAll(weapons);
		accessoryStore.loadAll(accessories);
	}

	// Apply attribute defaults
	attributeStore.update((state) => {
		if (!data.defaults || !data.defaults.attributes) {
			return { ...state };
		}

		for (const t of Object.values(AttributeType)) {
			if (!data.defaults.attributes[t]) {
				continue;
			}

			state[t] = data.defaults.attributes[t];
		}

		return { ...state };
	});

	// Apply slot defaults
	/*slotStore.update((state) => {
		if (!data.defaults || !data.defaults.equip) {
			return { ...state };
		}

		const slotState = { ...state };

		for (const [k, v] of Object.entries(data.defaults.equip)) {
			const slotKey = k as keyof SlotState;

			if (slotState[slotKey]) {
				slotState[slotKey].selectItem(v);
			}
		}

		return slotState;
	});*/

	appState.update((state) => {
		if (!data.defaults || !data.defaults.heroType) {
			return { ...state };
		}

		return { ...state, heroType: data.defaults.heroType };
	});

	// Apply item defaults
	/*itemStore.update((store) => {
		if (!data.defaults || !data.defaults.itemModifications) {
			return { ...store };
		}

		for (const [id, mod] of Object.entries(data.defaults.itemModifications)) {
			const item = store[id];

			if (item && mod.tier && mod.tier > 0) {
				item.upgrade(mod.tier);
			}

			if (item instanceof AttackItem && mod.affinity && mod.affinity !== AffinityType.STANDARD) {
				item.setAffinity(mod.affinity);
			}
		}

		return { ...store };
	});*/

	dataStore.set(data);
}
