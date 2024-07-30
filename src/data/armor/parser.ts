import { ItemCategory, type ArmorEntity } from '$lib/item/types';
import { existsSync } from 'fs';
import { EquipModelCategory } from '../types';
import { prepareXml } from '../helpers';
import type { ArmorRow } from './type';
import { DamageType } from '$lib';

export function parseArmors(xmlFile: string): Record<string, ArmorEntity> {
	const { rows, defaults } = prepareXml<ArmorRow>(xmlFile);
	const items: Record<string, ArmorEntity> = {};

	for (let i = 0; i < rows.length; i++) {
		const row = { ...defaults, ...rows[i] };
		const id = row.id.toFixed();

		if (!row.paramdexName || row.paramdexName == '') {
			console.log(`Armor name missing for #${id} (skipping)`);
			continue;
		}

		if (
			row.paramdexName === 'Head' ||
			row.paramdexName === 'Body' ||
			row.paramdexName === 'Arms' ||
			row.paramdexName === 'Legs'
		) {
			continue;
		}

		const iconId = String(row.iconIdF).padStart(5, '0');
		const iconFile = `./static/images/items_webp/MENU_Knowledge_${iconId}.webp`;

		if (!existsSync(iconFile)) {
			console.log(`Armor image file ${iconFile} for ${row.paramdexName} does not exist (skipping)`);
			continue;
		}

		let type = '';
		let group = '';
		let category: ItemCategory = ItemCategory.ARMOR;
		const effects: number[] = [];

		if (row.residentSpEffectId !== -1) {
			effects.push(row.residentSpEffectId);
		}

		if (row.residentSpEffectId2 !== -1) {
			effects.push(row.residentSpEffectId2);
		}

		if (row.residentSpEffectId3 !== -1) {
			effects.push(row.residentSpEffectId3);
		}

		switch (row.equipModelCategory) {
			case EquipModelCategory.HEAD:
				type = 'helm';
				group = 'helmets';
				category = ItemCategory.HELMET;
				break;
			case EquipModelCategory.ARMS:
				type = 'gauntlet';
				group = 'gauntlets';
				category = ItemCategory.ARMS;
				break;
			case EquipModelCategory.BODY:
				type = 'armor';
				group = 'armors';
				category = ItemCategory.ARMOR;
				break;
			case EquipModelCategory.LEGS:
				type = 'leg';
				group = 'legs';
				category = ItemCategory.LEGS;
		}

		if (type === '' || group === '') {
			continue;
		}

		const item: ArmorEntity = {
			name: row.paramdexName,
			weight: row.weight,
			rarity: row.rarity,
			category,
			type,
			group,
			config: {
				effects
			},
			poise: row.toughnessCorrectRate * 1000,
			resistance: {
				immunity: 0,
				robustness: 0,
				focus: 0,
				vitality: 0
			},
			damageNegation: {
				[DamageType.STANDARD]: 0,
				[DamageType.STRIKE]: 0,
				[DamageType.SLASH]: 0,
				[DamageType.PIERCE]: 0,
				[DamageType.HOLY]: 0,
				[DamageType.LIGHTNING]: 0,
				[DamageType.FIRE]: 0,
				[DamageType.MAGIC]: 0
			},
			id: 0
		};

		(item.iconUrl = `/images/items_webp/MENU_Knowledge_${iconId}.webp`),
			(item.damageNegation = {
				standard: (1 - row.neutralDamageCutRate) * 100,
				slash: (1 - row.slashDamageCutRate) * 100,
				strike: (1 - row.blowDamageCutRate) * 100,
				pierce: (1 - row.thrustDamageCutRate) * 100,
				mag: (1 - row.magicDamageCutRate) * 100,
				fir: (1 - row.fireDamageCutRate) * 100,
				lit: (1 - row.thunderDamageCutRate) * 100,
				hol: (1 - row.darkDamageCutRate) * 100
			});

		item.resistance = {
			focus: (row.resistSleep + row.resistMadness) / 2,
			immunity: (row.resistDisease + row.resistPoison) / 2,
			robustness: (row.resistBlood + row.resistFreeze) / 2,
			vitality: row.resistCurse
		};

		items[`armor#${row.id}`] = item;
	}
	return items;
}
