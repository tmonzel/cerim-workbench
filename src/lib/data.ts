import { mutationRecord } from './records';
import {
	AffinityType,
	AttributeType,
	type AttackCorrect,
	type GraphMutation,
	type SpEffect,
	type UpgradeSchema
} from './core';
import { type ItemData } from './item/types';
import { AccessoryItem, AttackItem, itemStore, ProtectionItem, type ItemState } from './item';
import { writable } from 'svelte/store';
import { attributeStore, slotStore, type SlotState } from './hero';

export type DataSchema = {
	defaults?: DataDefaults;

	items?: {
		weapons: Record<string, ItemData>;
		armors: Record<string, ItemData>;
		accessories: Record<string, ItemData>;
	};

	upgradeSchemata?: Record<string, UpgradeSchema>;
	mutations?: Record<string, GraphMutation[]>;
	attackCorrect?: Record<string, AttackCorrect>;
	spEffects?: Record<string, SpEffect>;
};

export type DataDefaults = {
	attributes?: Record<AttributeType, number>;
	equip?: Record<string, string>;
	itemModifications?: Record<string, { tier?: number; affinity?: AffinityType }>;
};

export const attackCorrectRecord: Record<string, AttackCorrect> = {};
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
		const items: ItemState = {};

		for (const id in data.items.weapons) {
			items[id] = new AttackItem(id, data.items.weapons[id]);
		}

		for (const id in data.items.armors) {
			items[id] = new ProtectionItem(id, data.items.armors[id]);
		}

		for (const id in data.items.accessories) {
			items[id] = new AccessoryItem(id, data.items.accessories[id]);
		}

		itemStore.set(items);
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
	slotStore.update((state) => {
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
	});

	// Apply item defaults
	itemStore.update((store) => {
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
	});

	dataStore.set(data);
}
