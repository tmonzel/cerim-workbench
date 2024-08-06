import { iconExists, prepareXml } from '../helpers';
import { affinityMap, mapAttackInfo, mapConfig, mapRequirements, weaponTypeMap } from './mappers';
import type { WeaponRow } from './type';
import type { WeaponEntity } from '$lib/weapon';

export function parseWeapons(xmlFile: string): Record<string, WeaponEntity> {
	const { rows, defaults } = prepareXml<WeaponRow>(xmlFile);
	const items: Record<string, WeaponEntity> = {};

	//const effectMessages = mapFmgXml(`./mat/WeaponEffect.fmg.xml`);

	for (let i = 0; i < rows.length; i++) {
		const row = { ...defaults, ...rows[i] };
		const id = row.id.toFixed();

		if (!row.paramdexName || row.paramdexName == '') {
			console.log(`Weapon name missing for #${id} (skipping)`);
			continue;
		}

		/*if (row.spEffectMsgId0 && effectMessages[row.spEffectMsgId0]) {
			item.effectInfo = [effectMessages[row.spEffectMsgId0]];
		}*/

		const weaponType = weaponTypeMap[row.wepType];

		if (!weaponType) {
			console.log(`Weapon type missing for ${row.paramdexName} #${id}`);
			continue;
		}

		const iconId = String(row.iconId).padStart(5, '0');

		if (!iconExists(iconId)) {
			console.log(`Weapon image file ${iconId} for ${row.paramdexName} does not exist (skipping)`);
			continue;
		}

		const item: WeaponEntity = {
			id: row.id,
			name: row.paramdexName,
			type: row.wepType,
			weight: row.weight,
			iconId,
			rarity: row.rarity,
			isLightSource: row.lanternWep === 1,
			upgradePrice: row.reinforcePrice,
			attackInfo: mapAttackInfo(row),
			requirements: mapRequirements(row)
		};

		if (items[`weapon#${row.originEquipWep}`]) {
			const item: WeaponEntity = items[`weapon#${row.originEquipWep}`];

			if (!item.affinities) {
				item.affinities = {};
			}

			item.affinities[affinityMap[row.id % 10000]] = mapConfig(row);
		} else if (row.originEquipWep === row.id) {
			item.config = mapConfig(row);

			items[`weapon#${row.id}`] = item;
		}
	}

	return items;
}
