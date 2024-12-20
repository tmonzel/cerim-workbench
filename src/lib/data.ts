import type { AttackCorrect } from './attack';
import { type GraphMutation } from './core';
import type { SpEffect } from './effect';
import {
	AccessoryItem,
	AttackItem,
	InventoryItem,
	ProtectItem,
	type AccessoryEntity,
	type ArmorEntity,
	type GoodEntity,
	type Item,
	type UpgradeSchema,
	type WeaponEntity
} from './item';
import { accessoryStore, armorStore, inventoryStore, weaponStore } from './item/stores';

const DATA_URL = './data';

export type DataSchema = {
	upgradeSchemata?: Record<string, UpgradeSchema>;
	mutations?: Record<string, GraphMutation[]>;
	attackCorrect?: Record<string, AttackCorrect>;
	spEffects?: Record<string, SpEffect>;
};

export async function fetchData<T>(url: string): Promise<T> {
	const response = await fetch(`${DATA_URL}${url}`);
	return response.json();
}

export const attackCorrectRecord: Record<string, AttackCorrect> = {};
export const mutationRecord: Record<string, GraphMutation[]> = {};
export const upgradeSchemata: Record<string, UpgradeSchema> = {};
export const spEffectsMap = new Map<number, SpEffect>();
export const itemMap = new Map<string, Item>();

export async function loadCalcData() {
	const data = await fetchData<DataSchema>(`/data.json`);

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
}

export async function loadWeapons() {
	// Fetching attack item data
	const weaponData = await fetchData<{ data: Record<string, WeaponEntity> }>(`/weapons.json`);
	const weapons: Record<string, AttackItem> = {};

	for (const id in weaponData.data) {
		weapons[id] = new AttackItem(id, weaponData.data[id]);
		itemMap.set(id, weapons[id]);
	}

	weaponStore.set(weapons);
}

export async function loadArmors() {
	// Fetching protector item data
	const armorData = await fetchData<{ data: Record<string, ArmorEntity> }>(`/armors.json`);
	const armors: Record<string, ProtectItem> = {};

	for (const id in armorData.data) {
		armors[id] = new ProtectItem(id, armorData.data[id]);
		itemMap.set(id, armors[id]);
	}

	armorStore.set(armors);
}

export async function loadAccessories() {
	// Fetching accessory item data
	const accessoryData = await fetchData<{ data: Record<string, AccessoryEntity> }>(`/accessories_generated.json`);

	const accessories: Record<string, AccessoryItem> = {};

	for (const id in accessoryData.data) {
		accessories[id] = new AccessoryItem(id, accessoryData.data[id]);
		itemMap.set(id, accessories[id]);
	}

	accessoryStore.set(accessories);
}

export async function loadInventory() {
	const { data } = await fetchData<{ data: Record<string, GoodEntity> }>(`/goods.json`);

	const items: Record<string, InventoryItem> = {};

	for (const id in data) {
		items[id] = new InventoryItem(id, data[id]);
		itemMap.set(id, items[id]);
	}

	inventoryStore.set(items);
}
