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
	scaling?: ItemAttributeScaling;

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

	getAvailableAffinities(): { name: string; value: string }[] {
		return Array.from(this.affinities.keys()).map((key) => ({
			name: affinityRecord[key].name,
			value: key
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

	override applyAttributes(attributes: Partial<Record<string, number>>): this {
		super.applyAttributes(attributes);

		if (!this.scaling || !this.attack) {
			return this;
		}

		this.scaledAttack = this.scaleDamage(attributes);

		return this;
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

		if (this.config.apply) {
			this.statusEffects = {};

			for (const id of this.config.apply) {
				const upgradedId = id >= 105000 ? id + this.tier : id;

				if (!spEffectsMap.has(upgradedId)) {
					continue;
				}

				Object.assign(this.statusEffects, spEffectsMap.get(upgradedId));
			}
		}

		const schema: UpgradeSchema =
			typeof this.config.schema === 'string'
				? upgradeSchemata[this.config.schema]
				: upgradeSchemata['0'];

		if (!schema) {
			return;
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

				/*switch (attrType) {
					case AttributeType.STRENGTH:
						attackTypes = attackCorrect.str;
						break;
					case AttributeType.DEXTERITY:
						attackTypes = attackCorrect.dex;
						break;
					case AttributeType.INTELLIGENCE:
						attackTypes = [...attackCorrect.int];

						if (this.config.cast === 'sorceries') {
							attackTypes.push(AttackType.SORCERY);
						}

						break;
					case AttributeType.FAITH:
						attackTypes = [...attackCorrect.fth];

						if (this.config.cast === 'incantations') {
							attackTypes.push(AttackType.INCANTATION);
						}

						break;
					case AttributeType.ARCANE:
						attackTypes = attackCorrect.arc;
				}*/

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

	scaleDamage(
		attributes: Partial<Record<AttributeType, number>>,
		ignoreRequirements: boolean = false
	): Attack {
		if (!this.scaling) {
			return {};
		}

		const scaledAttack = { ...this.attack };

		for (const attackType of Object.values(AttackType)) {
			const attackBase = this.attack[attackType] ?? 0;

			if (
				!attackBase &&
				attackType !== AttackType.SORCERY &&
				attackType !== AttackType.INCANTATION
			) {
				continue;
			}

			let scalingTotal = 1;

			if (
				this.invalidAttributes.some((attr) => this.scaling![attr] !== undefined) &&
				!ignoreRequirements
			) {
				scalingTotal = 0.6;
			} else {
				for (const [t, attrScale] of Object.entries(this.scaling)) {
					if (!attrScale.attackTypes.includes(attackType)) {
						continue;
					}

					const attrType = t as AttributeType;
					const upgradeScaling = attrScale.base / 100;
					const attrTotal = attributes[attrType] ?? 0;
					let attrScaling: number;

					if (this.config.cast === 'sorceries' && attrType === AttributeType.INTELLIGENCE) {
						attrScaling = calcCorrect(attrTotal, this.attackMutations['mag'] ?? []) / 100;
					} else {
						attrScaling = calcCorrect(attrTotal, this.attackMutations[attackType] ?? []) / 100;
					}

					scalingTotal += attrScaling * upgradeScaling;
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

		/*for (const [t, attrScale] of Object.entries(this.scaling)) {
			const attrType = t as AttributeType;

			if (!attributes[attrType] || !this.config.scaling) {
				continue;
			}
			
			const attrTotal = attributes[attrType] ?? 0;
			let scalingTotal = 1;

			if (this.unqualifiedAttributes.includes(attrType)) {
				scalingTotal = 0.6;
			} else {

			}


			for (const damageType of Object.values(AttackType)) {
				if (!this.attack[damageType] || !attrScale.allowedDamageTypes.includes(damageType)) {
					continue;
				}

				const upgradeScaling = attrScale.base / 100;

				let elementBase = this.attack[damageType] ?? 0;
				elementBase *= upgradeScaling;

				const attrScaling = calcCorrect(attrTotal, this.attackMutations[damageType] ?? []) / 100;

				if (this.unqualifiedAttributes.includes(attrType)) {
					// Apply 40% penalty
					elementBase *= 0.6;
				} else {
					elementBase *= attrScaling;
				}

				if (this.config.cast === 'sorceries' && attrType === AttributeType.INTELLIGENCE) {
					if (this.isEquippable() || ignoreRequirements) {
						scaledAttack[AttackType.SORCERY] = (1 + upgradeScaling * attrScaling) * 100;
					} else {
						scaledAttack[AttackType.SORCERY] = 60;
					}
				} else if (this.config.cast === 'incantations' && attrType === AttributeType.FAITH) {
					if (this.isEquippable() || ignoreRequirements) {
						scaledAttack[AttackType.INCANTATION] = (1 + upgradeScaling * attrScaling) * 100;
					} else {
						scaledAttack[AttackType.INCANTATION] = 60;
					}
				} else if (scaledAttack[damageType] !== undefined) {
					scaledAttack[damageType]! += elementBase;
				}
			}
		}*/

		return scaledAttack;
	}
}
