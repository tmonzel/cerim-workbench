import { writeFileSync } from 'fs';
import { parseArmors } from './parser';

writeFileSync(
	`./static/data/armors.json`,
	JSON.stringify({
		data: parseArmors(`./mat/EquipParamProtector.param.xml`)
	})
);
