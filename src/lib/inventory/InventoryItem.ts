import { Item } from '$lib/item';
import type { GoodEntity } from './types';

export class InventoryItem extends Item {
	effectInfo?: string;

	constructor(id: string, entity: GoodEntity) {
		super(id, entity);

		this.effectInfo = entity.effectInfo;

		console.log(entity.effects);

		this.applyEffects(entity.effects ?? []);
	}
}
