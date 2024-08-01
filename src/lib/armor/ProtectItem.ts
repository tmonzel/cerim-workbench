import { DamageType, type DamageNegation, type Resistance } from '$lib/core';
import { spEffectsMap } from '$lib/data';
import { Item } from '$lib/item';
import type { ArmorEntity, ArmorWeightClass } from './types';

export class ProtectItem extends Item {
	readonly resistance: Resistance;
	readonly resistanceAvg: number;

	readonly damageNegation: DamageNegation;
	readonly damageNegationAvg: number;

	readonly poise: number;
	readonly weightClass: ArmorWeightClass;

	constructor(id: string, entity: ArmorEntity) {
		super(id, entity);

		this.damageNegation = entity.damageNegation ?? {
			[DamageType.STANDARD]: 0,
			[DamageType.STRIKE]: 0,
			[DamageType.SLASH]: 0,
			[DamageType.PIERCE]: 0,
			[DamageType.HOLY]: 0,
			[DamageType.LIGHTNING]: 0,
			[DamageType.FIRE]: 0,
			[DamageType.MAGIC]: 0
		};

		this.resistance = entity.resistance ?? {
			immunity: 0,
			robustness: 0,
			focus: 0,
			vitality: 0
		};

		this.resistanceAvg =
			Math.round(
				((this.resistance.immunity + this.resistance.robustness + this.resistance.focus + this.resistance.vitality) /
					4) *
					10
			) / 10;

		const damageNegationValues = [
			this.damageNegation.standard,
			this.damageNegation.strike,
			this.damageNegation.slash,
			this.damageNegation.pierce,
			this.damageNegation.mag,
			this.damageNegation.fir,
			this.damageNegation.lit,
			this.damageNegation.hol
		];

		this.damageNegationAvg =
			Math.round((damageNegationValues.reduce((p, c) => p + c, 0) / damageNegationValues.length) * 10) / 10;

		this.poise = entity.poise;
		this.weightClass = entity.weightClass;

		if (entity.config && entity.config.effects) {
			for (const id of Object.values(entity.config.effects)) {
				const effect = spEffectsMap.get(id);

				if (effect && effect.modifiers) {
					this.setModifiers(effect.modifiers);
				}
			}
		}
	}
}
