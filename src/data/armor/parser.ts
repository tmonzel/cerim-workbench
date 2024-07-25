import { ItemCategory, type ItemData } from '$lib/item/types';
import { existsSync } from 'fs';
import { EquipModelCategory } from '../types';
import { prepareXml } from '../helpers';
import type { ArmorRow } from './type';

export function parseArmors(xmlFile: string): Record<string, ItemData> {
	const { rows, defaults } = prepareXml<ArmorRow>(xmlFile);
	const items: Record<string, ItemData> = {};

	for (let i = 0; i < rows.length; i++) {
		const row = { ...defaults, ...rows[i] };
		const id = row.id.toFixed();

		if (!row.paramdexName || row.paramdexName == '') {
			console.log(`Armor name missing for #${id} (skipping)`);
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

		const item: ItemData = {
			name: row.paramdexName,
			weight: row.weight,
			rarity: row.rarity,
			category,
			type,
			group,
			config: {
				effects
			},
			poise: row.toughnessCorrectRate * 1000
		};

		(item.iconUrl = `/images/items_webp/MENU_Knowledge_${iconId}.webp`),
			(item.damageNegation = {
				standard: row.neutralDamageCutRate,
				slash: row.slashDamageCutRate,
				strike: row.blowDamageCutRate,
				pierce: row.thrustDamageCutRate,
				mag: row.magicDamageCutRate,
				fir: row.fireDamageCutRate,
				lit: row.thunderDamageCutRate,
				hol: row.darkDamageCutRate
			});

		item.resistance = {
			focus: (row.resistSleep + row.resistMadness) / 2,
			immunity: (row.resistDisease + row.resistPoison) / 2,
			robustness: (row.resistBlood + row.resistFreeze) / 2,
			vitality: row.resistCurse
		};

		items[`${row.equipModelCategory}#${row.id}`] = item;
	}
	return items;
}
