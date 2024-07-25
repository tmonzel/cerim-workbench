import { Item } from '$lib/item';
import type { ItemData } from '$lib/item/types';

export class Armor extends Item {
	constructor(id: string, data: ItemData) {
		super(id, data);
	}

	update(): void {
		//throw new Error('Method not implemented.');
	}
}
