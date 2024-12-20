import type { AccessoryEntity } from './entities';
import { Item } from './Item';
import type { Upgradable } from './types';

export class AccessoryItem extends Item<AccessoryEntity> implements Upgradable {
	possibleUpgrades: number;
	tier: number;
	effectInfo?: string;

	constructor(id: string, entity: AccessoryEntity) {
		super(id, entity);

		this.tier = entity.tier ?? 0;
		this.possibleUpgrades = entity.upgrades ? entity.upgrades.length : 0;

		this.update();
	}

	upgrade(tier: number): void {
		this.tier = tier;
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
