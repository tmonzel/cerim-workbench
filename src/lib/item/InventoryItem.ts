import type { GoodEntity } from './entities';
import { Item } from './Item';

export class InventoryItem extends Item<GoodEntity> {
	effectInfo?: string;

	constructor(id: string, entity: GoodEntity) {
		super(id, entity);

		this.effectInfo = entity.effectInfo;

		this.applyEffects(entity.effects ?? []);
	}
}
