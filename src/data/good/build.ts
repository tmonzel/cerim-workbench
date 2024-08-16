import { writeFileSync } from 'fs';
import { iconExists, mapFmgXml, prepareXml } from '../helpers';
import type { GoodRow } from './type';
import { GoodsType, type GoodEntity } from '$lib/inventory';

export function parseGoods(xmlFile: string): Record<string, GoodEntity> {
	const { rows, defaults } = prepareXml<GoodRow>(xmlFile);
	const entities: Record<string, GoodEntity> = {};

	const infoMessages = {
		...mapFmgXml(`./mat/GoodsInfo.fmg.xml`),
		...mapFmgXml(`./mat/GoodsInfo_dlc01.fmg.xml`)
	};

	for (let i = 0; i < rows.length; i++) {
		const row = { ...defaults, ...rows[i] };
		const iconId = String(row.iconId).padStart(5, '0');

		if (row.goodsType !== GoodsType.GREAT_RUNE) {
			// Only include great runes for now
			continue;
		}

		if (!iconExists(iconId)) {
			console.log(`Good#${row.id} icon image missing for #${iconId} (skipping)`);
			continue;
		}

		if (!row.paramdexName || row.paramdexName === '') {
			console.log(`Good#${row.id} without name (skipping)`);
			continue;
		}

		let effects: number[] = [row.refId_default];

		if (row.id === 191) {
			// Godricks Great Rune
			effects = [600];
		}

		if (row.id === 192) {
			// Radahns Great Rune
			effects = [610];
		}

		if (row.id === 193) {
			// Morgotts Great Rune
			effects = [620];
		}

		// Register base variant
		entities[`good#${row.id}`] = {
			id: row.id,
			name: row.paramdexName,
			weight: row.weight,
			rarity: row.rarity,
			iconId,
			effects,
			type: row.goodsType,
			effectInfo: infoMessages[row.id]
		};
	}

	return entities;
}

writeFileSync(
	`./static/data/goods.json`,
	JSON.stringify({
		data: parseGoods(`./mat/EquipParamGoods.param.xml`)
	})
);
