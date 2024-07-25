import type { ItemRow } from '../types';

export interface ArmorRow extends ItemRow {
	iconIdF: number;
	iconIdM: number;

	protectorCategory: number;

	headEquip: number;
	bodyEquip: number;
	armEquip: number;
	legEquip: number;

	toughnessRecoverCorrection: number;
	toughnessCorrectRate: number;
	toughnessDamageCutRate: number;

	corectSARecover: number;
	saDurability: number;
	partsDamageRate: number;

	// Defense
	defensePhysics: number;
	defenseMagic: number;
	defenseFire: number;
	defenseThunder: number;
	defenseDark: number;
	defenseSlash: number;
	defenseBlow: number;
	defenseThrust: number;

	// Damage Neg
	neutralDamageCutRate: number;
	slashDamageCutRate: number;
	blowDamageCutRate: number;
	thrustDamageCutRate: number;
	magicDamageCutRate: number;
	fireDamageCutRate: number;
	thunderDamageCutRate: number;
	darkDamageCutRate: number;

	// Immunity
	resistPoison: number;
	resistDisease: number;

	// Robustness
	resistBlood: number;
	resistFreeze: number;

	// Vitality
	resistCurse: number;

	// Focus
	resistSleep: number;
	resistMadness: number;
}
