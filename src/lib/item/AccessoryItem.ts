import { Item } from './Item';
import type { ItemData } from './types';

export class AccessoryItem extends Item {
	constructor(id: string, data: ItemData) {
		super(id, data);
	}

	update(): void {
		//throw new Error('Method not implemented.');
	}
}
