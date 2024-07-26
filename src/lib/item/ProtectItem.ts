import { DamageType, type DamageNegation, type Resistance } from '$lib/core';
import { Item } from './Item';
import type { ItemData } from './types';

export class ProtectItem extends Item {
	readonly resistance: Resistance;
	readonly damageNegation: DamageNegation;

	constructor(id: string, data: ItemData) {
		super(id, data);

		this.damageNegation = data.damageNegation ?? {
			[DamageType.STANDARD]: 0,
			[DamageType.STRIKE]: 0,
			[DamageType.SLASH]: 0,
			[DamageType.PIERCE]: 0,
			[DamageType.HOLY]: 0,
			[DamageType.LIGHTNING]: 0,
			[DamageType.FIRE]: 0,
			[DamageType.MAGIC]: 0
		};

		this.resistance = data.resistance ?? {
			immunity: 0,
			robustness: 0,
			focus: 0,
			vitality: 0
		};
	}

	update(): void {
		//throw new Error('Method not implemented.');
	}
}
