import { ItemCategory, type AccessoryEntity } from '$lib/item';
import { writeFileSync } from 'fs';
import { getIconUrl, iconExists, mapFmgXml, prepareXml } from '../helpers';
import type { AccessoryRow } from './type';

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
			console.log(`Accessory icon #${row.iconId} for ${row.paramdexName} does not exist (skipping)`);
			continue;
		}

		const entity: AccessoryEntity = {
			id: row.id,
			name: row.paramdexName,
			weight: row.weight,
			rarity: row.rarity,
			iconUrl: getIconUrl(row.iconId),
			effects: [row.refId],
			type: 'talisman',
			category: ItemCategory.TALISMAN,
			group: 'talismans'
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
