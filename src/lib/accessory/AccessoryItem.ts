import { spEffectsMap } from '$lib/data';
import { Item, type Upgradable } from '$lib/item';
import type { AccessoryEntity } from './types';

export class AccessoryItem extends Item implements Upgradable {
	possibleUpgrades = 0;

	constructor(id: string, data: AccessoryEntity) {
		super(id, data);

		this.possibleUpgrades = data.upgrades ? data.upgrades.length : 0;

		if (data.effects) {
			for (const id of data.effects) {
				const effect = spEffectsMap.get(id);

				if (effect && effect.modifiers) {
					this.setModifiers(effect.modifiers);
				}
			}
		}
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
	}
}
