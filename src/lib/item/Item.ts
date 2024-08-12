import type { ItemData, ItemEffect, ItemRarity } from './types';

export class Item {
	readonly type: number;
	readonly name: string;
	readonly weight: number;
	readonly rarity: ItemRarity;

	tier: number;

	effects: ItemEffect[] = [];
	iconId: string;
	description?: string;

	protected _modified = false;

	get modified(): boolean {
		return this._modified;
	}

	constructor(
		readonly id: string,
		protected data: ItemData
	) {
		this.type = data.type;
		this.name = data.name;
		this.tier = data.tier ?? 0;
		this.iconId = data.iconId;
		this.weight = data.weight ?? 0;
		this.description = data.description;

		this.rarity = data.rarity;
	}

	setEffects(effects: ItemEffect[]): void {
		this.effects = effects;
	}
}
