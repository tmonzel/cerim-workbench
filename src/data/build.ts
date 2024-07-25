import { writeFileSync } from 'fs';
import {
	parseAttackCorrectData,
	parseCalcCorrectData,
	parseReinforceData,
	parseSpEffectData
} from './parsers';
import { parseWeapons } from './weapon/parser';
import { parseArmors } from './armor/parser';

// Build item data
/*writeFileSync(
	`./static/data/items.json`,
	JSON.stringify({
		weapons: parseWeapons(`./mat/EquipParamWeapon.param.xml`),
		armors: parseArmors(`./mat/EquipParamProtector.param.xml`)
	})
);

// Build calculation data
writeFileSync(
	`./static/data/data.json`,
	JSON.stringify({
		upgradeSchemata: parseReinforceData(`./mat/ReinforceParamWeapon.param.xml`),
		mutations: parseCalcCorrectData(`./mat/CalcCorrectGraph.param.xml`),
		attackCorrect: parseAttackCorrectData('./mat/AttackElementCorrectParam.param.xml'),
		spEffects: parseSpEffectData('./mat/SpEffectParam.param.xml')
	})
);*/
