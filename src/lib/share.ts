import { get } from 'svelte/store';
import { attributeStore, type AttributeState } from './hero';
import { itemMap } from './data';
import { AffinityType, AttackItem } from './weapon';
import { AccessoryItem } from './accessory';
import { appStore, equipStore, type AppState, type EquipState } from './state';

export type ItemSnapshot = {
	id: string;
	tier?: number;
	affinity?: AffinityType;
};

export type SharedBuild = {
	app: Partial<AppState>;
	attributes?: Partial<AttributeState>;
	equip?: Record<string, ItemSnapshot>;
};

export function applySharedBuild(build: SharedBuild): void {
	appStore.update((state) => ({ ...state, ...build.app }));
	attributeStore.update((state) => ({ ...state, ...build.attributes }));

	equipStore.update((state) => {
		const equip = { ...state };

		if (build.equip) {
			for (const [key, config] of Object.entries(build.equip)) {
				const slot = key as keyof EquipState;
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
	const app = get(appStore);
	const attributeState = get(attributeStore);
	const equipState = get(equipStore);

	const equip: Record<string, ItemSnapshot> = {};

	for (const [slot, item] of Object.entries(equipState)) {
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
		app,
		attributes: attributeState,
		equip
	};
}
