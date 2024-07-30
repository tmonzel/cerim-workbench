import { writeFileSync } from 'fs';
import { parseAttackCorrectData, parseCalcCorrectData, parseReinforceData, parseSpEffectData } from './parsers';

import './weapon/build';
import './armor/build';
import './accessory/build';

// Build calculation data
writeFileSync(
	`./static/data/data.json`,
	JSON.stringify({
		upgradeSchemata: parseReinforceData(`./mat/ReinforceParamWeapon.param.xml`),
		mutations: parseCalcCorrectData(`./mat/CalcCorrectGraph.param.xml`),
		attackCorrect: parseAttackCorrectData('./mat/AttackElementCorrectParam.param.xml'),
		spEffects: parseSpEffectData('./mat/SpEffectParam.param.xml')
	})
);
