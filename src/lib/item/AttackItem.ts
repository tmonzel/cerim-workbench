import { calcCorrect, getScalingId, list } from '$lib/core';
import {
	AffinityType,
	AttackType,
	AttributeType,
	DamageType,
	GuardType,
	StatusEffectType,
	type Attack,
	type GraphMutation,
	type Guard,
	type UpgradeSchema
} from '$lib/core/types';
import { attackCorrectRecord, spEffectsMap, upgradeSchemata } from '$lib/data';
import { affinityRecord, mutationRecord } from '$lib/records';
import { Item } from './Item';
import type { ItemAttackInfo, ItemAttributeScaling, ItemConfig, ItemData } from './types';

const scalingAttributes = [
	AttributeType.STRENGTH,
	AttributeType.DEXTERITY,
	AttributeType.INTELLIGENCE,
	AttributeType.FAITH,
	AttributeType.ARCANE
];

export class AttackItem extends Item {
	attack: Attack = {};
	scaledAttack?: Attack;
	attackInfo: ItemAttackInfo;
	attackSpeed: number;
	statusEffects?: Partial<Record<StatusEffectType, number>>;
	guard: Guard;
	affinities: Map<string, ItemConfig>;
	scaling: ItemAttributeScaling = {};

	private attackMutations: Partial<Record<AttackType, GraphMutation[]>>;
	private _affinity: AffinityType | null;

	get affinity(): AffinityType | null {
		return this._affinity;
	}

	constructor(id: string, data: ItemData) {
		super(id, data);

		this.attackMutations = {};
		this.attackSpeed = data.attackSpeed ?? 1;
		this.guard = data.guard ?? { phy: 0, mag: 0, fir: 0, lit: 0, hol: 0, sta: 0, res: 0 };
		this.affinities = new Map(Object.entries(data.affinities ?? {}));
		this._affinity = null;

		this.attackInfo = {
			crit: 100,
			damage: [DamageType.STANDARD],
			...data.attackInfo
		};

		if (data.config) {
			this.setConfig(data.config);
		}
	}

	getAvailableAffinities(): { name: string; value: AffinityType; iconUrl: string }[] {
		return Array.from(this.affinities.keys()).map((key) => ({
			name: affinityRecord[key].name,
			value: key as AffinityType,
			iconUrl: affinityRecord[key].iconUrl
		}));
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
			typeof this.config.schema === 'string'
				? upgradeSchemata[this.config.schema]
				: upgradeSchemata['0'];

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

				if (
					!schema.scaling ||
					!schema.scaling[attrType] ||
					!this.config.scaling ||
					!this.config.scaling[attrType]
				) {
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

	calculateAttributeScaling(
		attrValue: number,
		attrType: AttributeType,
		attackType: AttackType
	): number {
		const scaling = this.scaling[attrType];

		if (!scaling || !scaling.attackTypes.includes(attackType)) {
			return 0;
		}

		const upgradeScaling = scaling.base / 100;
		let attrScaling: number;

		if (this.config.cast === 'sorceries' && attrType === AttributeType.INTELLIGENCE) {
			attrScaling = calcCorrect(attrValue, this.attackMutations['mag'] ?? []) / 100;
		} else {
			attrScaling = calcCorrect(attrValue, this.attackMutations[attackType] ?? []) / 100;
		}

		return attrScaling * upgradeScaling;
	}

	calculateAttributeAttack(attrValue: number, attrType: AttributeType): Attack {
		const attack: Attack = {};
		const config = this.scaling[attrType];

		for (const attackType of Object.values(AttackType)) {
			if (!config || !config.attackTypes.includes(attackType)) {
				continue;
			}

			const scaling = 1 + this.calculateAttributeScaling(attrValue, attrType, attackType);

			if (this.config.cast === 'sorceries' && attackType === AttackType.SORCERY) {
				attack[AttackType.SORCERY] = scaling * 100;
			} else if (this.config.cast === 'incantations' && attackType === AttackType.INCANTATION) {
				attack[AttackType.INCANTATION] = scaling * 100;
			} else if (this.attack[attackType]) {
				attack[attackType] = this.attack[attackType] * scaling;
			}
		}

		return attack;
	}

	scaleAttack(excludeAttackTypes?: AttackType[]): void {
		const scaledAttack: Attack = {};

		for (const attackType of Object.values(AttackType)) {
			const attackBase = this.attack[attackType] ?? 0;

			if (
				!attackBase &&
				attackType !== AttackType.SORCERY &&
				attackType !== AttackType.INCANTATION
			) {
				continue;
			}

			if (excludeAttackTypes && excludeAttackTypes.includes(attackType)) {
				continue;
			}

			let scalingTotal = 1;

			if (this.invalidAttributes.some((attr) => this.scaling![attr] !== undefined)) {
				scalingTotal = 0.6;
			} else {
				for (const attrType of Object.keys(this.scaling) as AttributeType[]) {
					scalingTotal += this.calculateAttributeScaling(
						this.appliedAttributes[attrType] ?? 0,
						attrType,
						attackType
					);
				}
			}

			if (this.config.cast === 'sorceries' && attackType === AttackType.SORCERY) {
				scaledAttack[AttackType.SORCERY] = scalingTotal * 100;
			} else if (this.config.cast === 'incantations' && attackType === AttackType.INCANTATION) {
				scaledAttack[AttackType.INCANTATION] = scalingTotal * 100;
			} else {
				scaledAttack[attackType] = attackBase * scalingTotal;
			}
		}

		this.scaledAttack = scaledAttack;
	}
}
