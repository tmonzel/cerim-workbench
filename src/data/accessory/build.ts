import { writeFileSync } from 'fs';
import { getIconUrl, iconExists, mapFmgXml, prepareXml } from '../helpers';
import type { AccessoryRow } from './type';
import type { AccessoryEntity } from '$lib/accessory';
import type { ItemUpgrade } from '$lib/item';

export function parseAccessories(xmlFile: string): Record<string, AccessoryEntity> {
	const { rows, defaults } = prepareXml<AccessoryRow>(xmlFile);
	const entities: Record<string, AccessoryEntity> = {};

	const infoMessages = {
		...mapFmgXml(`./mat/AccessoryInfo.fmg.xml`),
		...mapFmgXml(`./mat/AccessoryInfo_dlc01.fmg.xml`)
	};

	const accessoriesByName: Record<string, AccessoryEntity> = {};
	const upgradesByName: Record<string, ItemUpgrade[]> = {};

	for (let i = 0; i < rows.length; i++) {
		const row = { ...defaults, ...rows[i] };

		if (!iconExists(row.iconId)) {
			console.log(`Accessory#${row.id} missing iconId ${row.iconId} (skipping)`);
			continue;
		}

		if (!row.paramdexName || row.paramdexName === '') {
			console.log(`Accessory#${row.id} without name (skipping)`);
			continue;
		}

		const effects: number[] = [row.refId];

		if (row.residentSpEffectId1) {
			effects.push(row.residentSpEffectId1);
		}

		if (row.residentSpEffectId2) {
			effects.push(row.residentSpEffectId2);
		}

		if (row.residentSpEffectId3) {
			effects.push(row.residentSpEffectId3);
		}

		if (row.residentSpEffectId4) {
			effects.push(row.residentSpEffectId4);
		}

		if (row.paramdexName.match(/\+\d+/) === null) {
			// Register base variant
			entities[`accessory#${row.id}`] = accessoriesByName[row.paramdexName] = {
				id: row.id,
				name: row.paramdexName,
				weight: row.weight,
				rarity: row.rarity,
				iconUrl: getIconUrl(row.iconId),
				effects,
				type: 1,
				effectInfo: infoMessages[row.id]
			};
		} else {
			// Register upgraded variant
			const baseName = row.paramdexName.replace(/\s\+\d+/, '');

			if (!upgradesByName[baseName]) {
				upgradesByName[baseName] = [];
			}

			upgradesByName[baseName].push({
				iconUrl: getIconUrl(row.iconId),
				effects,
				effectInfo: infoMessages[row.id]
			});
		}
	}

	for (const [baseName, upgrades] of Object.entries(upgradesByName)) {
		if (!accessoriesByName[baseName]) {
			continue;
		}

		accessoriesByName[baseName].upgrades = upgrades;
	}

	return entities;
}

writeFileSync(
	`./static/data/accessories_generated.json`,
	JSON.stringify({
		data: parseAccessories(`./mat/EquipParamAccessory.param.xml`)
	})
);
