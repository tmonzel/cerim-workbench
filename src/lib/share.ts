import { get } from 'svelte/store';
import { itemMap } from './data';
import { AffinityType, AttackItem } from './weapon';
import { AccessoryItem } from './accessory';
import { heroAttributes, heroEquip, heroType, type HeroEquipState } from './state';

export type ItemSnapshot = {
	id: string;
	tier?: number;
	affinity?: AffinityType;
};

export type SharedBuild = {
	type: string;
	attributes: Record<string, number>;
	equip?: Record<string, ItemSnapshot>;
};

export function applySharedBuild(build: SharedBuild): void {
	heroEquip.update((state) => {
		const equip = { ...state };

		if (build.equip) {
			for (const [key, config] of Object.entries(build.equip)) {
				const slot = key as keyof HeroEquipState;
				const item = itemMap.get(config.id);

				if (!item) {
					continue;
				}

				if (config.tier && (item instanceof AttackItem || item instanceof AccessoryItem)) {
					item.upgrade(config.tier);
				}

				if (item instanceof AttackItem && config.affinity) {
					item.setAffinity(config.affinity);
				}

				equip[slot] = item;
			}
		}

		return equip;
	});
}

export function makeSharedBuildSnapshot(): SharedBuild {
	const currentType = get(heroType);
	const currentEquip = get(heroEquip);
	const currentAttributes = get(heroAttributes);
	const equip: Record<string, ItemSnapshot> = {};

	for (const [slot, item] of Object.entries(currentEquip)) {
		if (!item) {
			continue;
		}

		equip[slot] = {
			id: item.id
		};

		if ((item instanceof AttackItem || item instanceof AccessoryItem) && item.tier > 0) {
			equip[slot].tier = item.tier;
		}

		if (item instanceof AttackItem && item.affinity && item.affinity !== AffinityType.STANDARD) {
			equip[slot].affinity = item.affinity;
		}
	}

	return {
		type: currentType,
		attributes: currentAttributes,
		equip
	};
}
