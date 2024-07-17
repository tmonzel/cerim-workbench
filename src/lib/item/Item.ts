import {
	AttributeType,
	type DamageNegation,
	type ModifierData,
	type ModifierType,
	type Resistance,
	type SpEffect,
	type UpgradeSchema
} from '$lib/core/types';
import { spEffectsMap } from '$lib/data';
import { ItemModifier } from './ItemModifier';
import type { ItemCategory, ItemConfig, ItemData, ItemRarity } from './types';

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
	invalidAttributes: AttributeType[] = [];

	config!: ItemConfig;
	resistance?: Resistance;
	damageNegation?: DamageNegation;

	upgradeSchema?: UpgradeSchema;
	modifiers: ItemModifier[] = [];
	iconUrl?: string;
	description?: string;
	effects?: string[];

	spEffects: SpEffect[] = [];

	protected _appliedAttributes: Partial<Record<string, number>> = {};
	protected _modified = false;

	get modified(): boolean {
		return this._modified;
	}

	get appliedAttributes(): Partial<Record<string, number>> {
		return this._appliedAttributes;
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
		this.damageNegation = data.damageNegation;
		this.resistance = data.resistance;
		this.rarity = data.rarity;

		if (data.modifiers) {
			this.setModifiers(data.modifiers);
		}
	}

	isEquippable(): boolean {
		return this.invalidAttributes.length === 0;
	}

	setConfig(config: ItemConfig): void {
		this.config = config;
		this.modifiers = [];

		if (config.effects) {
			for (const id of config.effects) {
				const effect = spEffectsMap.get(id);

				if (effect && effect.modifiers) {
					this.setModifiers(effect.modifiers);
				}
			}
		}

		this.update();
	}

	abstract update(): void;

	setModifiers(modifiers: Partial<Record<ModifierType, ModifierData>>): void {
		const newModifiers: ItemModifier[] = [];

		for (const [type, data] of Object.entries(modifiers)) {
			newModifiers.push(new ItemModifier(data, type as ModifierType));
		}

		this.modifiers = newModifiers;
	}

	applyAttributes(attributes: Partial<Record<string, number>>): this {
		this._appliedAttributes = attributes;

		// Check and setup requirements
		this.invalidAttributes = [];

		if (this.attributeRequirements) {
			for (const [t, n] of Object.entries(this.attributeRequirements)) {
				if (typeof attributes[t] === 'number' && attributes[t] < n) {
					this.invalidAttributes.push(t as AttributeType);
				}
			}
		}

		return this;
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
