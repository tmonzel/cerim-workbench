import { AttributeType } from '$lib/core/types';
import { ItemModifier } from './ItemModifier';
import type { ItemCategory, ItemData, ItemRarity, ModifierData, ModifierType, SpEffect, UpgradeSchema } from './types';

export abstract class Item {
	readonly type: string;
	readonly name: string;
	readonly group: string;
	readonly weight: number;
	readonly category: ItemCategory;
	readonly rarity: ItemRarity;

	tier: number;
	possibleUpgrades: number;
	attributeRequirements?: Partial<Record<AttributeType, number>>;

	upgradeSchema?: UpgradeSchema;
	modifiers: ItemModifier[] = [];
	iconUrl?: string;
	description?: string;
	effects?: string[];
	effectInfo: string[];
	poise?: number;

	spEffects: SpEffect[] = [];

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
		this.group = data.group;
		this.category = data.category;
		this.tier = data.tier ?? 0;
		this.iconUrl = data.iconUrl;
		this.weight = data.weight ?? 0;
		this.possibleUpgrades = data.upgrades ? data.upgrades.length : 0;
		this.description = data.description;
		this.attributeRequirements =
			data.requirements && data.requirements.attributes ? data.requirements.attributes : undefined;
		this.effects = data.effects;
		this.rarity = data.rarity;
		this.poise = data.poise;
		this.effectInfo = data.effectInfo ?? [];

		if (data.modifiers) {
			this.setModifiers(data.modifiers);
		}
	}

	abstract update(): void;

	setModifiers(modifiers: Partial<Record<ModifierType, ModifierData>>): void {
		const newModifiers: ItemModifier[] = [];

		for (const [type, data] of Object.entries(modifiers)) {
			newModifiers.push(new ItemModifier(data, type as ModifierType));
		}

		this.modifiers = newModifiers;
	}

	upgrade(tier: number): void {
		this.tier = tier;
		this._modified = tier !== 0;

		if (this.data.upgrades && this.tier > 0) {
			const upgrade = this.data.upgrades[this.tier - 1];

			if (upgrade.modifiers) {
				this.setModifiers(upgrade.modifiers);
			}

			this.iconUrl = upgrade.iconUrl;
		} else {
			if (this.data.modifiers) {
				this.setModifiers(this.data.modifiers);
			}

			this.iconUrl = this.data.iconUrl;
		}

		this.update();
	}
}
