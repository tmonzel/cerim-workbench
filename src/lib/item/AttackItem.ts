import { getScalingId, list } from '$lib/core';
import {
	AffinityType,
	AttackType,
	AttributeType,
	DamageType,
	GuardType,
	StatusEffectType,
	type Attack,
	type GraphMutation,
	type Guard
} from '$lib/core/types';
import { attackCorrectRecord, mutationRecord, spEffectsMap, upgradeSchemata } from '$lib/data';
import { Item } from '$lib/item';
import type { AttackInfo, ItemAttributeScaling, ItemConfig, UpgradeSchema, WeaponEntity } from './types';

const scalingAttributes = [
	AttributeType.STRENGTH,
	AttributeType.DEXTERITY,
	AttributeType.INTELLIGENCE,
	AttributeType.FAITH,
	AttributeType.ARCANE
];

export class AttackItem extends Item {
	attack: Attack = {};
	attackInfo: AttackInfo;
	attackSpeed: number;
	statusEffects?: Partial<Record<StatusEffectType, number>>;
	guard: Guard;
	affinities: Map<string, ItemConfig>;
	scaling: ItemAttributeScaling = {};
	config!: ItemConfig;

	attackMutations: Partial<Record<AttackType, GraphMutation[]>>;
	private _affinity: AffinityType | null;

	get affinity(): AffinityType | null {
		return this._affinity;
	}

	constructor(id: string, entity: WeaponEntity) {
		super(id, entity);

		this.attackMutations = {};
		this.attackSpeed = entity.attackSpeed ?? 1;
		this.guard = entity.guard ?? { phy: 0, mag: 0, fir: 0, lit: 0, hol: 0, sta: 0, res: 0 };
		this.affinities = new Map(Object.entries(entity.affinities ?? {}));
		this._affinity = null;

		this.attackInfo = {
			crit: 100,
			damage: [DamageType.STANDARD],
			...entity.attackInfo
		};

		if (entity.config) {
			this.setConfig(entity.config);
		}
	}

	setConfig(config: ItemConfig): void {
		this.config = config;
		this.modifiers = [];

		if (config.effects) {
			for (const [i, id] of Object.entries(config.effects)) {
				const effect = spEffectsMap.get(id);

				if (effect && effect.modifiers) {
					this.setModifiers(effect.modifiers);
				}
			}
		}

		this.update();
	}

	getScalingFlags(): { attr: AttributeType; id: string }[] {
		return list(this.scaling ?? {}).map((s) => {
			return { attr: s.key as AttributeType, id: getScalingId(s.value.base) };
		});
	}

	setAffinity(affinity: AffinityType | null): void {
		let config: ItemConfig;

		if (affinity) {
			config = this.affinities.get(affinity) ?? this.data.config!;
		} else {
			config = this.data.config!;
		}

		this._affinity = affinity;
		this._modified = affinity !== AffinityType.STANDARD;
		this.setConfig(config);
	}

	update(): void {
		if (!this.config) {
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

		const schema: UpgradeSchema =
			typeof this.config.schema === 'string' ? upgradeSchemata[this.config.schema] : upgradeSchemata['0'];

		if (!schema) {
			return;
		}

		if (this.statusEffects) {
			this.statusEffects = {};
		}

		if (this.config.effects) {
			this.statusEffects = {};

			for (const [index, id] of Object.entries(this.config.effects)) {
				const effect = spEffectsMap.get(id);

				if (!effect || !effect.statusTypes) {
					continue;
				}

				const effectOffsets = schema.effects[Number(index)];

				if (this.tier > 0 && effectOffsets[this.tier]) {
					const upgradeSpEffect = spEffectsMap.get(effect.id + effectOffsets[this.tier]);

					if (upgradeSpEffect && upgradeSpEffect.statusTypes) {
						Object.assign(this.statusEffects, upgradeSpEffect.statusTypes);
					}
				} else {
					Object.assign(this.statusEffects, effect.statusTypes);
				}

				if (effect && effect.modifiers) {
					this.setModifiers(effect.modifiers);
				}
			}
		}

		this.possibleUpgrades = schema.tiers ?? 25;

		if (!this.config.attack || !schema.attack) {
			return;
		}

		const attack: Attack = {};
		const guard: Partial<Guard> = {};
		const maxTiers = this.possibleUpgrades;
		const attributeScaling: ItemAttributeScaling = {};

		if (this.possibleUpgrades > 0) {
			for (const t of Object.values(AttackType)) {
				if (!this.config.attack[t] || !schema.attack[t] || maxTiers === 0) {
					continue;
				}

				const base = this.config.attack[t];
				const multiplier = schema.attack[t][this.tier];

				attack[t] = base * multiplier;
			}

			if (schema.guard && this.config.guard) {
				for (const t of Object.values(GuardType)) {
					if (!this.config.guard[t] || maxTiers === 0 || !schema.guard[t]) {
						continue;
					}

					const base = this.config.guard[t];
					const multiplierRange = schema.guard[t];
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

				if (!schema.scaling || !schema.scaling[attrType] || !this.config.scaling || !this.config.scaling[attrType]) {
					continue;
				}

				const base = this.config.scaling[attrType] as number;

				const multiplierRange = schema.scaling[attrType];
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
