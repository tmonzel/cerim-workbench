import { ItemModifier } from './ItemModifier';
import type { ItemData, ItemRarity, SpEffectModifier } from './types';

export class Item {
	readonly type: number;
	readonly name: string;
	readonly weight: number;
	readonly rarity: ItemRarity;

	tier: number;

	modifiers: ItemModifier[] = [];
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

		if (data.modifiers) {
			this.setModifiers(data.modifiers);
		}
	}

	setModifiers(modifiers: SpEffectModifier[]): void {
		const newModifiers: ItemModifier[] = [];

		for (const m of modifiers) {
			newModifiers.push(new ItemModifier(m));
		}

		this.modifiers = newModifiers;
	}
}
