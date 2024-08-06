import { spEffectsMap } from '$lib/data';
import { Item, type Upgradable } from '$lib/item';
import type { AccessoryEntity } from './types';

export class AccessoryItem extends Item implements Upgradable {
	possibleUpgrades = 0;
	effectInfo?: string;
	activated: boolean;
	isActivatable: boolean = false;

	constructor(
		id: string,
		private entity: AccessoryEntity
	) {
		super(id, entity);

		this.activated = true;
		this.possibleUpgrades = entity.upgrades ? entity.upgrades.length : 0;

		this.update();
	}

	applyEffects(ids: number[]): void {
		for (const id of ids) {
			const effect = spEffectsMap.get(id);

			if (effect?.trigger && effect.trigger.onBelowHp >= 0) {
				this.activated = false;
				this.isActivatable = true;
			}

			if (effect && effect.modifiers) {
				this.setModifiers(effect.modifiers);
			}
		}
	}

	upgrade(tier: number): void {
		this.tier = tier;
		this._modified = tier !== 0;

		this.update();
	}

	update(): void {
		if (this.entity.upgrades && this.tier > 0) {
			const upgrade = this.entity.upgrades[this.tier - 1];

			if (upgrade) {
				this.applyEffects(upgrade.effects ?? []);
				this.iconId = upgrade.iconId;
				this.effectInfo = upgrade.effectInfo;
			}
		} else {
			this.applyEffects(this.entity.effects ?? []);
			this.iconId = this.entity.iconId;
			this.effectInfo = this.entity.effectInfo;
		}
	}
}
