import { get } from 'svelte/store';
import { itemMap } from './data';
import { heroAttack, heroType, type HeroAttackState } from './state';
import { AccessoryItem, AttackItem } from './item';
import { AffinityType } from './core';
import { attributeStore } from './attribute';
import { equipStore, type EquipState } from './equip';

export type ItemSnapshot = {
	id: string;
	tier?: number;
	affinity?: AffinityType;
};

export type SharedBuild = {
	type: string;
	attributes: Record<string, number>;
	equip?: Record<string, ItemSnapshot>;
	attack: HeroAttackState;
};

export function applySharedBuild(build: SharedBuild): void {
	heroType.set(build.type);
	attributeStore.set(build.attributes);
	heroAttack.set(build.attack);

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
	const currentType = get(heroType);
	const currentEquip = get(equipStore);
	const currentAttributes = get(attributeStore);
	const currentAttack = get(heroAttack);

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
		equip,
		attack: currentAttack
	};
}
