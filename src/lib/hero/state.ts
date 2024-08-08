import { derived } from 'svelte/store';
import { attributeStore } from './attributes';
import { AttributeType, DamageType } from '$lib/core';
import { heroTypes } from './data';
import { equipStore } from './equip.store';
import { ProtectItem } from '$lib/armor';
import { appStore } from '$lib/state';
import { createHero } from './create';
import { AccessoryItem } from '$lib/accessory';

export const HERO_MAX_LEVEL = 713;

export const heroState = derived([appStore, attributeStore, equipStore], ([config, attributeState, equip]) => {
	const type = heroTypes.find((t) => t.id === config.heroType)!;
	const hero = createHero(type, attributeState);

	// Apply item modifications
	for (const item of Object.values(equip)) {
		if (!item) {
			continue;
		}

		// Sum item weights
		hero.weight += item.weight;

		if (item instanceof AccessoryItem && !item.activated) {
			continue;
		}

		// Summarize resistance
		if (item instanceof ProtectItem) {
			hero.poise += item.poise;

			hero.immunity.add(item.resistance.immunity);
			hero.robustness.add(item.resistance.robustness);
			hero.focus.add(item.resistance.focus);
			hero.vitality.add(item.resistance.vitality);

			//hero.resistance.add(item.resistance);
			hero.damageNegation.setAll({
				[DamageType.STANDARD]:
					100 - (100 - hero.damageNegation.get('standard')) * (1 - item.damageNegation.standard / 100),
				[DamageType.STRIKE]: 100 - (100 - hero.damageNegation.get('strike')) * (1 - item.damageNegation.strike / 100),
				[DamageType.SLASH]: 100 - (100 - hero.damageNegation.get('slash')) * (1 - item.damageNegation.slash / 100),
				[DamageType.PIERCE]: 100 - (100 - hero.damageNegation.get('pierce')) * (1 - item.damageNegation.pierce / 100),
				[DamageType.HOLY]: 100 - (100 - hero.damageNegation.get('hol')) * (1 - item.damageNegation.hol / 100),
				[DamageType.LIGHTNING]: 100 - (100 - hero.damageNegation.get('lit')) * (1 - item.damageNegation.lit / 100),
				[DamageType.FIRE]: 100 - (100 - hero.damageNegation.get('fir')) * (1 - item.damageNegation.fir / 100),
				[DamageType.MAGIC]: 100 - (100 - hero.damageNegation.get('mag')) * (1 - item.damageNegation.mag / 100),
				[DamageType.POISE]: 100 - (100 - hero.damageNegation.get('poise')) * (1 - item.damageNegation.poise / 100)
			});
		}

		for (const mod of item.modifiers) {
			mod.modify(hero);
		}
	}

	const totalAttributes = hero.attributes.getTotalValue();

	for (const t of Object.values(AttributeType)) {
		totalAttributes[t] += hero.type.attributes[t];
	}

	hero.hp.update(totalAttributes);
	hero.fp.update(totalAttributes);
	hero.stamina.update(totalAttributes);
	hero.discovery.update(totalAttributes);
	hero.equipLoad.update(totalAttributes);

	hero.immunity.update(totalAttributes);
	hero.robustness.update(totalAttributes);
	hero.focus.update(totalAttributes);
	hero.vitality.update(totalAttributes);

	hero.standardDefense.update(totalAttributes);
	hero.strikeDefense.update(totalAttributes);
	hero.slashDefense.update(totalAttributes);
	hero.pierceDefense.update(totalAttributes);

	hero.magicDefense.update(totalAttributes);
	hero.fireDefense.update(totalAttributes);
	hero.lightningDefense.update(totalAttributes);
	hero.holyDefense.update(totalAttributes);

	hero.totalAttributes = totalAttributes;

	return hero;
});
