import { StatusEffectType, type ModifierConfig, type SpEffect } from '$lib';
import { SpEffectType, type SpEffectParam } from './types';

export function mapSpEffect(row: SpEffectParam): SpEffect {
	const effect: SpEffect = {
		id: row.id
	};

	const flatAttributesModifiers: ModifierConfig = {
		modify: {}
	};

	const flatResistanceModifiers: ModifierConfig = {
		modify: {}
	};

	const percentualStatModifiers: ModifierConfig = {
		modify: {}
	};

	if (row.addLifeForceStatus) {
		flatAttributesModifiers.modify.vig = row.addLifeForceStatus;
	}

	if (row.addEndureStatus) {
		flatAttributesModifiers.modify.end = row.addEndureStatus;
	}

	if (row.addStrengthStatus) {
		flatAttributesModifiers.modify.str = row.addStrengthStatus;
	}

	if (row.addDexterityStatus) {
		flatAttributesModifiers.modify.dex = row.addDexterityStatus;
	}

	if (row.addWillpowerStatus) {
		flatAttributesModifiers.modify.mnd = row.addWillpowerStatus;
	}

	if (row.addMagicStatus) {
		flatAttributesModifiers.modify.int = row.addMagicStatus;
	}

	if (row.addFaithStatus) {
		flatAttributesModifiers.modify.fth = row.addFaithStatus;
	}

	if (row.addLuckStatus) {
		flatAttributesModifiers.modify.arc = row.addLuckStatus;
	}

	if (row.changeSleepResistPoint || row.changeMadnessResistPoint) {
		flatResistanceModifiers.modify.focus =
			row.changeSleepResistPoint ?? row.changeMadnessResistPoint;
	}

	if (row.maxHpRate !== 1) {
		percentualStatModifiers.modify.hp = row.maxHpRate;
	}

	if (row.maxMpRate !== 1) {
		percentualStatModifiers.modify.fp = row.maxMpRate;
	}

	if (row.maxStaminaRate !== 1) {
		percentualStatModifiers.modify.stamina = row.maxStaminaRate;
	}

	switch (row.stateInfo) {
		case SpEffectType.HEMORRHAGE:
			effect.statusTypes = {
				[StatusEffectType.HEMORRHAGE]: row.bloodAttackPower
			};
			break;
		case SpEffectType.ROT:
			effect.statusTypes = { [StatusEffectType.ROT]: row.diseaseAttackPower };
			break;
		case SpEffectType.FROSTBITE:
			effect.statusTypes = { [StatusEffectType.FROSTBITE]: row.freezeAttackPower };
			break;
		case SpEffectType.MADNESS:
			effect.statusTypes = { [StatusEffectType.MADNESS]: row.madnessAttackPower };
			break;
		case SpEffectType.POISON:
			effect.statusTypes = { [StatusEffectType.POISON]: row.poizonAttackPower };
			break;
		case SpEffectType.BLIGHT:
			effect.statusTypes = { [StatusEffectType.DEATH]: row.curseAttackPower };
			break;
		case SpEffectType.SLEEP:
			effect.statusTypes = { [StatusEffectType.SLEEP]: row.sleepAttackPower };
			break;
		case SpEffectType.NONE:
			effect.modifiers = {
				flat: {},
				percentual: {}
			};

			if (Object.keys(flatAttributesModifiers.modify).length > 0) {
				effect.modifiers.flat!.attributes = flatAttributesModifiers;
			}

			if (Object.keys(flatResistanceModifiers.modify).length > 0) {
				effect.modifiers.flat!.resistance = flatResistanceModifiers;
			}

			if (Object.keys(percentualStatModifiers.modify).length > 0) {
				effect.modifiers.percentual!.stats = percentualStatModifiers;
			}
	}

	return effect;
}
