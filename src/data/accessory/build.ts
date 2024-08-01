import { ItemCategory } from '$lib/item';
import { writeFileSync } from 'fs';
import { getIconUrl, iconExists, prepareXml } from '../helpers';
import type { AccessoryRow } from './type';
import type { AccessoryEntity } from '$lib/accessory';

export function parseAccessories(xmlFile: string): Record<string, AccessoryEntity> {
	const { rows, defaults } = prepareXml<AccessoryRow>(xmlFile);
	const entities: Record<string, AccessoryEntity> = {};

	/*const infoMessages = {
		...mapFmgXml(`./mat/AccessoryInfo.fmg.xml`),
		...mapFmgXml(`./mat/AccessoryInfo_dlc01.fmg.xml`)
	};*/

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

		const entity: AccessoryEntity = {
			id: row.id,
			name: row.paramdexName,
			weight: row.weight,
			rarity: row.rarity,
			iconUrl: getIconUrl(row.iconId),
			effects: [row.refId],
			type: 1,
			category: ItemCategory.TALISMAN
		};

		entities[`accessory#${row.id}`] = entity;
	}

	return entities;
}

writeFileSync(
	`./static/data/accessories_generated.json`,
	JSON.stringify({
		data: parseAccessories(`./mat/EquipParamAccessory.param.xml`)
	})
);
