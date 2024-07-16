import type { ItemCategory } from '$lib/item/types';

export class HeroEquipSlot {
	private _selectedItemId: null | string;

	viewMode = false;
	useWithTwoHands = false;

	get selectedItemId(): null | string {
		return this._selectedItemId;
	}

	constructor(readonly itemCategory: ItemCategory) {
		this._selectedItemId = null;
	}

	selectItem(id: null | string): this {
		this._selectedItemId = id;
		return this;
	}
}
