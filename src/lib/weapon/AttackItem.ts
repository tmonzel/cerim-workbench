import { AttackType, AttributeType, GuardType, type Attack, type GraphMutation, type Guard } from '$lib/core';
import { attackCorrectRecord, mutationRecord, upgradeSchemata } from '$lib/data';
import { Item, type ItemConfig, type Upgradable } from '$lib/item';
import { AffinityType } from './affinity';
import { scalingAttributes } from './scaling';
import type { AttackInfo, UpgradeSchema, WeaponEntity, WeaponRequirements, WeaponScaling } from './types';

export class AttackItem extends Item implements Upgradable {
	attack: Attack = {};
	attackInfo: AttackInfo;
	guard?: Guard;
	affinities: Map<string, ItemConfig>;
	scaling: WeaponScaling = {};
	config!: ItemConfig;
	possibleUpgrades: number;
	schema?: UpgradeSchema;
	requirements: WeaponRequirements;
	tier: number;

	attackMutations: Partial<Record<AttackType, GraphMutation[]>>;
	private _affinity: AffinityType | null;

	get affinity(): AffinityType | null {
		return this._affinity;
	}

	constructor(id: string, entity: WeaponEntity) {
		super(id, entity);

		this.attackMutations = {};
		this.guard = entity.guard;
		this.affinities = new Map(Object.entries(entity.affinities ?? {}));
		this._affinity = null;
		this.possibleUpgrades = entity.upgrades ? entity.upgrades.length : 0;
		this.requirements = entity.requirements;
		this.attackInfo = entity.attackInfo;
		this.tier = entity.tier ?? 0;

		if (entity.config) {
			this.setConfig(entity.config);
		}
	}

	setConfig(config: ItemConfig): void {
		this.config = config;
		this.effects = [];
		this.schema = typeof config.schema === 'string' ? upgradeSchemata[config.schema] : upgradeSchemata['0'];

		this.update();
	}

	setAffinity(affinity: AffinityType | null): void {
		let config: ItemConfig;

		if (affinity) {
			config = this.affinities.get(affinity) ?? this.data.config!;
		} else {
			config = this.data.config!;
		}

		this._affinity = affinity;
		this.setConfig(config);
	}

	upgrade(tier: number): void {
		this.tier = tier;
		this.update();
	}

	updateEffects(): void {
		if (!this.config.effects || !this.schema) {
			return;
		}

		const ids: number[] = [];

		for (const [index, id] of Object.entries(this.config.effects)) {
			let effectId = id;

			const effectOffsets = this.schema.effects[Number(index)];

			if (this.tier > 0 && effectOffsets[this.tier]) {
				effectId = id + effectOffsets[this.tier];
			}

			ids.push(effectId);
		}

		this.applyEffects(ids);
	}

	update(): void {
		if (!this.config || !this.schema) {
			return;
		}

		if (this.config.guard) {
			this.guard = this.config.guard;
		}

		if (this.config.mutations) {
			if (typeof this.config.mutations === 'string') {
				for (const t of Object.values(AttackType)) {
					this.attackMutations[t] = mutationRecord[this.config.mutations];
				}
			} else if (Array.isArray(this.config.mutations)) {
				for (const t of Object.values(AttackType)) {
					this.attackMutations[t] = this.config.mutations;
				}
			} else if (typeof this.config.mutations === 'object') {
				for (const t of Object.values(AttackType)) {
					this.attackMutations[t] = this.config.mutations[t]
						? mutationRecord[this.config.mutations[t]]
						: mutationRecord['0'];
				}
			}
		} else {
			for (const t of Object.values(AttackType)) {
				this.attackMutations[t] = mutationRecord['0'];
			}
		}

		this.updateEffects();

		this.possibleUpgrades = this.schema.tiers ?? 25;

		if (!this.config.attack || !this.schema.attack) {
			return;
		}

		const attack: Attack = {};
		const guard: Partial<Guard> = {};
		const maxTiers = this.possibleUpgrades;
		const attributeScaling: WeaponScaling = {};

		if (this.possibleUpgrades > 0) {
			for (const t of Object.values(AttackType)) {
				if (!this.config.attack[t] || !this.schema.attack[t] || maxTiers === 0) {
					continue;
				}

				const base = this.config.attack[t];
				const multiplier = this.schema.attack[t][this.tier];

				attack[t] = base * multiplier;
			}

			if (this.schema.guard && this.config.guard) {
				for (const t of Object.values(GuardType)) {
					if (!this.config.guard[t] || maxTiers === 0 || !this.schema.guard[t]) {
						continue;
					}

					const base = this.config.guard[t];
					const multiplierRange = this.schema.guard[t];
					const diff = multiplierRange[1] - multiplierRange[0];

					const multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
					guard[t] = base * multiplier;
				}

				if (this.guard) {
					this.guard = { ...this.guard, ...guard };
				}
			}

			const attackCorrect = attackCorrectRecord[this.config.attackCorrectId ?? '0'];

			for (const attrType of scalingAttributes) {
				const attackTypes: AttackType[] = [];

				if (attackCorrect[attrType]) {
					attackTypes.push(...attackCorrect[attrType]);
				}

				if (this.config.cast === 'sorceries' && attrType === AttributeType.INTELLIGENCE) {
					attackTypes.push(AttackType.SORCERY);
				} else if (this.config.cast === 'incantations' && attrType === AttributeType.FAITH) {
					attackTypes.push(AttackType.INCANTATION);
				}

				if (
					!this.schema.scaling ||
					!this.schema.scaling[attrType] ||
					!this.config.scaling ||
					!this.config.scaling[attrType]
				) {
					continue;
				}

				const base = this.config.scaling[attrType] as number;

				const multiplierRange = this.schema.scaling[attrType];
				let multiplier = 1;

				if (multiplierRange.length > 2) {
					multiplier = multiplierRange[this.tier];
				} else {
					const diff = multiplierRange[1] - multiplierRange[0];
					multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
				}

				attributeScaling[attrType] = {
					base: base * multiplier,
					attackTypes
				};
			}
		}

		this.attack = attack;
		this.scaling = attributeScaling;
	}
}
