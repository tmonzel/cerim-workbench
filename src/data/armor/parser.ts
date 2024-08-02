import { existsSync } from 'fs';
import { prepareXml } from '../helpers';
import type { ArmorRow } from './type';
import { DamageType } from '$lib';
import { ArmorWeightClass, type ArmorEntity } from '$lib/armor';

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

		// Skip defaults
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

		let weightClass: ArmorWeightClass = ArmorWeightClass.LIGHT;

		if (row.sortGroupId > 70) {
			weightClass = ArmorWeightClass.HEAVY;
		} else if (row.sortGroupId > 40) {
			weightClass = ArmorWeightClass.MEDIUM;
		}

		const item: ArmorEntity = {
			name: row.paramdexName,
			weight: row.weight,
			rarity: row.rarity,
			type: row.protectorCategory,
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
				standard: (1 - row.neutralDamageCutRate) * 100,
				slash: (1 - row.slashDamageCutRate) * 100,
				strike: (1 - row.blowDamageCutRate) * 100,
				pierce: (1 - row.thrustDamageCutRate) * 100,
				mag: (1 - row.magicDamageCutRate) * 100,
				fir: (1 - row.fireDamageCutRate) * 100,
				lit: (1 - row.thunderDamageCutRate) * 100,
				hol: (1 - row.darkDamageCutRate) * 100,
				poise: (1 - row.toughnessDamageCutRate) * 100
			},
			id: 0,
			weightClass
		};

		item.iconUrl = `/images/items_webp/MENU_Knowledge_${iconId}.webp`;

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
