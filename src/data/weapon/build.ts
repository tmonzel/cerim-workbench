import { writeFileSync } from 'fs';
import { parseWeapons } from './parser';

writeFileSync(
	`./static/data/weapons.json`,
	JSON.stringify({
		data: parseWeapons(`./mat/EquipParamWeapon.param.xml`)
	})
);
