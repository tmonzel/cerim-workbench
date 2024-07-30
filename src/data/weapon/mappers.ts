import { AffinityType, AttackType, DamageType } from '$lib';
import { type AttackInfo, type ItemConfig, type ItemRequirements, type ScalingBase } from '$lib/item/types';
import type { WeaponRow } from './type';

export const affinityMap: Record<number, AffinityType> = {
	0: AffinityType.STANDARD,
	100: AffinityType.HEAVY,
	200: AffinityType.KEEN,
	300: AffinityType.QUALITY,
	400: AffinityType.FIRE,
	500: AffinityType.FLAME,
	600: AffinityType.LIGHTNING,
	700: AffinityType.SACRED,
	800: AffinityType.MAGIC,
	900: AffinityType.COLD,
	1000: AffinityType.POISON,
	1100: AffinityType.BLOOD,
	1200: AffinityType.OCCULT
};

export const weaponTypeMap: Record<number, { name: string; group: string }> = {
	1: { name: 'dagger', group: 'daggers' },
	3: { name: 'straight-sword', group: 'swords' },
	5: { name: 'greatsword', group: 'swords' },
	7: { name: 'colossal-sword', group: 'swords' },
	9: { name: 'curved-sword', group: 'swords' },
	11: { name: 'curved-greatsword', group: 'swords' },
	13: { name: 'katana', group: 'swords' },
	14: { name: 'twinblade', group: 'swords' },
	15: { name: 'thrusting-sword', group: 'swords' },
	16: { name: 'heavy-thrusting-sword', group: 'swords' },
	17: { name: 'axe', group: 'axes' },
	19: { name: 'great-axe', group: 'axes' },
	21: { name: 'hammer', group: 'hammers' },
	23: { name: 'great-hammer', group: 'hammers' },
	24: { name: 'flail', group: 'flails' },
	25: { name: 'spear', group: 'spears' },
	28: { name: 'great-spear', group: 'spears' },
	29: { name: 'halberd', group: 'halberds' },
	31: { name: 'reaper', group: 'reapers' },
	35: { name: 'fist', group: 'fists' },
	37: { name: 'claw', group: 'claws' },
	39: { name: 'whip', group: 'whips' },
	41: { name: 'colossal-weapon', group: 'colossal-weapons' },
	50: { name: 'light-bow', group: 'bows' },
	51: { name: 'bow', group: 'bows' },
	53: { name: 'greatbow', group: 'bows' },
	55: { name: 'crossbow', group: 'bows' },
	56: { name: 'ballista', group: 'bows' },
	57: { name: 'glintstone-staff', group: 'staffs' },
	59: { name: 'dual-catalyst', group: 'tools' },
	61: { name: 'sacred-seal', group: 'seals' },
	65: { name: 'small-shield', group: 'shields' },
	67: { name: 'shield', group: 'shields' },
	69: { name: 'greatshield', group: 'shields' },
	81: { name: 'arrow', group: 'arrows' },
	83: { name: 'great-arrow', group: 'arrows' },
	85: { name: 'bolt', group: 'bolts' },
	86: { name: 'ballista-bolt', group: 'bolts' },
	87: { name: 'torch', group: 'torches' },
	88: { name: 'hand-to-hand', group: 'hand-to-hands' },
	89: { name: 'perfume-bottle', group: 'bottles' },
	90: { name: 'thrusting-shield', group: 'shields' },
	91: { name: 'throwing-blade', group: 'swords' },
	92: { name: 'backhand-blade', group: 'swords' },
	93: { name: 'light-greatsword', group: 'swords' },
	94: { name: 'great-katana', group: 'swords' },
	95: { name: 'beast-claw', group: 'claws' }
};

export function mapConfig(row: WeaponRow): ItemConfig {
	const attack: Partial<Record<AttackType, number>> = {};
	const scaling: ScalingBase = {};
	const mutations: Partial<Record<AttackType, string>> = {};
	const effects: Record<number, number> = {};

	if (row.attackBasePhysics) {
		attack.phy = row.attackBasePhysics;
	}

	if (row.attackBaseMagic) {
		attack.mag = row.attackBaseMagic;
	}

	if (row.attackBaseFire) {
		attack.fir = row.attackBaseFire;
	}

	if (row.attackBaseThunder) {
		attack.lit = row.attackBaseThunder;
	}

	if (row.attackBaseDark) {
		attack.hol = row.attackBaseDark;
	}

	if (row.attackBaseStamina) {
		attack.sta = row.attackBaseStamina;
	}

	if (row.correctStrength) {
		scaling.str = row.correctStrength;
	}

	if (row.correctAgility) {
		scaling.dex = row.correctAgility;
	}

	if (row.correctMagic) {
		scaling.int = row.correctMagic;
	}

	if (row.correctFaith) {
		scaling.fth = row.correctFaith;
	}

	if (row.correctLuck) {
		scaling.arc = row.correctLuck;
	}

	if (row.correctType_Physics !== 0) {
		mutations.phy = String(row.correctType_Physics);
	}

	if (row.correctType_Magic !== 0) {
		mutations.mag = String(row.correctType_Magic);
	}

	if (row.correctType_Fire !== 0) {
		mutations.fir = String(row.correctType_Fire);
	}

	if (row.correctType_Thunder !== 0) {
		mutations.lit = String(row.correctType_Thunder);
	}

	if (row.correctType_Dark !== 0) {
		mutations.hol = String(row.correctType_Dark);
	}

	if (row.spEffectBehaviorId0 !== -1) {
		effects[0] = row.spEffectBehaviorId0;
	}

	if (row.spEffectBehaviorId1 !== -1) {
		effects[1] = row.spEffectBehaviorId1;
	}

	const schemaId = row.reinforceTypeId.toFixed();
	const schema = schemaId.substring(0, schemaId.length - 2);
	const config: ItemConfig = {
		attack,
		scaling,
		guard: {
			phy: row.physGuardCutRate,
			mag: row.magGuardCutRate,
			fir: row.fireGuardCutRate,
			lit: row.thunGuardCutRate,
			hol: row.darkGuardCutRate,
			sta: row.staminaGuardDef,
			res:
				(row.poisonGuardResist +
					row.diseaseGuardResist +
					row.bloodGuardResist +
					row.curseGuardResist +
					row.freezeGuardResist +
					row.sleepGuardResist +
					row.madnessGuardResist) /
				7
		},
		schema: schema === '' ? '0' : schema,
		attackCorrectId: String(row.attackElementCorrectId),
		mutations
	};

	if (effects[0] || effects[1]) {
		config.effects = effects;
	}

	if (row.enableMagic === 1) {
		config.cast = 'sorceries';
	}

	if (row.enableMiracle === 1) {
		config.cast = 'incantations';
	}

	return config;
}

export function mapAttackInfo(row: WeaponRow): AttackInfo {
	const attackInfo: AttackInfo = {
		damage: [],
		crit: 100 + (row.throwAtkRate ?? 0),
		poise: row.saWeaponDamage,
		vsDragon: row.isDragonSlayer === 1,
		vsGhost: row.isVersusGhostWep === 1
	};

	if (row.isNormalAttackType) {
		attackInfo.damage?.push(DamageType.STANDARD);
	}

	if (row.isBlowAttackType) {
		attackInfo.damage?.push(DamageType.STRIKE);
	}

	if (row.isSlashAttackType) {
		attackInfo.damage?.push(DamageType.SLASH);
	}

	if (row.isThrustAttackType) {
		attackInfo.damage?.push(DamageType.PIERCE);
	}

	return attackInfo;
}

export function mapRequirements(row: WeaponRow): ItemRequirements {
	const requirements: ItemRequirements = {
		attributes: {}
	};

	if (row.properStrength) {
		requirements.attributes!.str = row.properStrength;
	}

	if (row.properAgility) {
		requirements.attributes!.dex = row.properAgility;
	}

	if (row.properMagic) {
		requirements.attributes!.int = row.properMagic;
	}

	if (row.properFaith) {
		requirements.attributes!.fth = row.properFaith;
	}

	return requirements;
}
