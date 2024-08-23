import { spEffectsMap } from '$lib/data';
import type { ItemEffect, ItemEntity, ItemRarity } from './types';

export class Item<T extends ItemEntity = ItemEntity> {
	readonly type: number;
	readonly name: string;
	readonly weight: number;
	readonly rarity: ItemRarity;

	iconId: string;
	effects: ItemEffect[] = [];
	description?: string;

	constructor(
		readonly id: string,
		protected entity: T
	) {
		this.type = entity.type;
		this.name = entity.name;
		this.iconId = entity.iconId;
		this.weight = entity.weight ?? 0;
		this.description = entity.description;
		this.rarity = entity.rarity;
	}

	protected applyEffects(ids: number[]): void {
		const effects: ItemEffect[] = [];

		for (const id of ids) {
			const effect = spEffectsMap.get(id);
			let activated = true;
			let target = 'self';

			if (!effect) {
				continue;
			}

			if ((effect?.trigger && effect.trigger.onBelowHp >= 0) || effect.category >= 10000) {
				activated = false;
			}

			if (effect.category >= 10000) {
				target = 'enemy';
			}

			effects.push({
				target,
				category: effect.category,
				duration: effect.duration,
				modifiers: effect.modifiers,
				activated
			});
		}

		this.effects = effects;
	}
}
