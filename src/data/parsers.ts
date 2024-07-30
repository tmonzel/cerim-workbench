import { AttackType, AttributeType, type AttackCorrect, type GraphMutation } from '$lib/core';
import type { SpEffect, UpgradeSchema } from '$lib/item';
import { prepareXml } from './helpers';
import { mapSpEffect } from './mappers';
import { type AttackCorrectParam, type CalcCorrectParam, type ReinforceParam, type SpEffectParam } from './types';

export function parseSpEffectData(file: string): Record<string, SpEffect> {
	const { rows, defaults } = prepareXml<SpEffectParam>(file);
	const record: Record<string, SpEffect> = {};

	for (const r of rows) {
		const spEff = mapSpEffect({ ...defaults, ...r });

		if (!spEff.modifiers) {
			continue;
		}

		record[r.id] = spEff;
	}

	return record;
}

export function parseReinforceData(file: string): Record<string, UpgradeSchema> {
	const { rows, defaults } = prepareXml<ReinforceParam>(file);
	const record: Record<string, UpgradeSchema> = {};

	for (const r of rows) {
		const row = { ...defaults, ...r };

		const id = row.id.toFixed();
		let schemaId = id.substring(0, id.length - 2);

		if (schemaId === '') {
			schemaId = '0';
		}

		if (!record[schemaId]) {
			record[schemaId] = {
				tiers: -1,
				attack: {
					phy: [],
					mag: [],
					fir: [],
					lit: [],
					hol: [],
					sta: []
				},
				scaling: {
					str: [],
					dex: [],
					int: [],
					fth: [],
					arc: []
				},
				guard: {
					phy: [],
					mag: [],
					fir: [],
					lit: [],
					hol: [],
					sta: [],
					res: []
				},
				effects: {
					[0]: [],
					[1]: []
				}
			};
		}

		const schema = record[schemaId];
		schema.tiers += 1;
		schema.attack.phy.push(row.physicsAtkRate);
		schema.attack.mag.push(row.magicAtkRate);
		schema.attack.fir.push(row.fireAtkRate);
		schema.attack.lit.push(row.thunderAtkRate);
		schema.attack.hol.push(row.darkAtkRate);
		schema.attack.sta.push(row.staminaAtkRate);

		schema.scaling.str.push(row.correctStrengthRate);
		schema.scaling.dex.push(row.correctAgilityRate);
		schema.scaling.int.push(row.correctMagicRate);
		schema.scaling.fth.push(row.correctFaithRate);
		schema.scaling.arc.push(row.correctLuckRate);

		schema.guard.phy.push(row.physicsGuardCutRate);
		schema.guard.mag.push(row.magicGuardCutRate);
		schema.guard.fir.push(row.fireGuardCutRate);
		schema.guard.lit.push(row.thunderGuardCutRate);
		schema.guard.hol.push(row.darkGuardCutRate);

		schema.guard.sta.push(row.staminaGuardDefRate);
		schema.guard.res.push(row.sleepGuardDefRate);

		schema.effects[0].push(row.spEffectId1);
		schema.effects[1].push(row.spEffectId2);
	}

	return record;
}

export function parseCalcCorrectData(xmlFile: string): Record<string, GraphMutation[]> {
	const { rows, defaults } = prepareXml<CalcCorrectParam>(xmlFile);

	const record: Record<string, GraphMutation[]> = {};

	for (const r of rows) {
		const row = { ...defaults, ...r };
		record[row.id] = [
			{
				breakpoint: row.stageMaxVal0,
				grow: row.stageMaxGrowVal0,
				exp: row.adjPt_maxGrowVal0
			},

			{
				breakpoint: row.stageMaxVal1,
				grow: row.stageMaxGrowVal1,
				exp: row.adjPt_maxGrowVal1
			},

			{
				breakpoint: row.stageMaxVal2,
				grow: row.stageMaxGrowVal2,
				exp: row.adjPt_maxGrowVal2
			},

			{
				breakpoint: row.stageMaxVal3,
				grow: row.stageMaxGrowVal3,
				exp: row.adjPt_maxGrowVal3
			},

			{
				breakpoint: row.stageMaxVal4,
				grow: row.stageMaxGrowVal4,
				exp: row.adjPt_maxGrowVal4
			}
		];
	}

	return record;
}

export function parseAttackCorrectData(xmlFile: string): Record<string, AttackCorrect> {
	const { rows, defaults } = prepareXml<AttackCorrectParam>(xmlFile);

	const record: Record<string, AttackCorrect> = {};

	for (const r of rows) {
		const row = { ...defaults, ...r };
		const atkCorrect: AttackCorrect = {
			[AttributeType.STRENGTH]: [],
			[AttributeType.DEXTERITY]: [],
			[AttributeType.INTELLIGENCE]: [],
			[AttributeType.FAITH]: [],
			[AttributeType.ARCANE]: []
		};

		// Strength
		if (row.isStrengthCorrect_byPhysics) {
			atkCorrect.str.push(AttackType.PHYSICAL);
		}

		if (row.isStrengthCorrect_byMagic) {
			atkCorrect.str.push(AttackType.MAGIC);
		}

		if (row.isStrengthCorrect_byFire) {
			atkCorrect.str.push(AttackType.FIRE);
		}

		if (row.isStrengthCorrect_byThunder) {
			atkCorrect.str.push(AttackType.LIGHTNING);
		}

		if (row.isStrengthCorrect_byDark) {
			atkCorrect.str.push(AttackType.HOLY);
		}

		// Dexterity
		if (row.isDexterityCorrect_byPhysics) {
			atkCorrect.dex.push(AttackType.PHYSICAL);
		}

		if (row.isDexterityCorrect_byMagic) {
			atkCorrect.dex.push(AttackType.MAGIC);
		}

		if (row.isDexterityCorrect_byFire) {
			atkCorrect.dex.push(AttackType.FIRE);
		}

		if (row.isDexterityCorrect_byThunder) {
			atkCorrect.dex.push(AttackType.LIGHTNING);
		}

		if (row.isDexterityCorrect_byDark) {
			atkCorrect.dex.push(AttackType.HOLY);
		}

		// Intelligence
		if (row.isMagicCorrect_byPhysics) {
			atkCorrect.int.push(AttackType.PHYSICAL);
		}

		if (row.isMagicCorrect_byMagic) {
			atkCorrect.int.push(AttackType.MAGIC);
		}

		if (row.isMagicCorrect_byFire) {
			atkCorrect.int.push(AttackType.FIRE);
		}

		if (row.isMagicCorrect_byThunder) {
			atkCorrect.int.push(AttackType.LIGHTNING);
		}

		if (row.isMagicCorrect_byDark) {
			atkCorrect.int.push(AttackType.HOLY);
		}

		// Faith
		if (row.isFaithCorrect_byPhysics) {
			atkCorrect.fth.push(AttackType.PHYSICAL);
		}

		if (row.isFaithCorrect_byMagic) {
			atkCorrect.fth.push(AttackType.MAGIC);
		}

		if (row.isFaithCorrect_byFire) {
			atkCorrect.fth.push(AttackType.FIRE);
		}

		if (row.isFaithCorrect_byThunder) {
			atkCorrect.fth.push(AttackType.LIGHTNING);
		}

		if (row.isFaithCorrect_byDark) {
			atkCorrect.fth.push(AttackType.HOLY);
		}

		// Arcane
		if (row.isLuckCorrect_byPhysics) {
			atkCorrect.arc.push(AttackType.PHYSICAL);
		}

		if (row.isLuckCorrect_byMagic) {
			atkCorrect.arc.push(AttackType.MAGIC);
		}

		if (row.isLuckCorrect_byFire) {
			atkCorrect.arc.push(AttackType.FIRE);
		}

		if (row.isLuckCorrect_byThunder) {
			atkCorrect.arc.push(AttackType.LIGHTNING);
		}

		if (row.isLuckCorrect_byDark) {
			atkCorrect.arc.push(AttackType.HOLY);
		}

		record[row.id] = atkCorrect;
	}

	return record;
}
