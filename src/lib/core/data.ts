import { AttackType, DamageType, StatusEffectType } from './types';

export const attackTypes: Record<string, { name: string; color: string }> = {
	[AttackType.PHYSICAL]: {
		name: 'Physical',
		color: '#444'
	},

	[AttackType.FIRE]: {
		name: 'Fire',
		color: '#ff9900'
	},

	[AttackType.LIGHTNING]: {
		name: 'Lightning',
		color: '#ffff00'
	},

	[AttackType.HOLY]: {
		name: 'Holy',
		color: '#ffcc99'
	},

	[AttackType.MAGIC]: {
		name: 'Magic',
		color: '#3fbddd'
	},

	[AttackType.STAMINA]: {
		name: 'Stamina',
		color: '#339966'
	},
	[AttackType.SORCERY]: {
		name: 'Sorcery',
		color: '#c084fc'
	},
	[AttackType.INCANTATION]: {
		name: 'Incantation',
		color: '#c084fc'
	}
};

export const resistanceTypes: Record<string, { name: string }> = {
	immunity: {
		name: 'Immunity'
	},
	robustness: {
		name: 'Robustness'
	},
	focus: {
		name: 'Focus'
	},
	vitality: {
		name: 'Vitality'
	},
	poise: {
		name: 'Poise'
	}
};

export const damageTypes: Record<string, { name: string }> = {
	[DamageType.STANDARD]: {
		name: 'Standard'
	},
	[DamageType.STRIKE]: {
		name: 'Strike'
	},
	[DamageType.SLASH]: {
		name: 'Slash'
	},
	[DamageType.PIERCE]: {
		name: 'Pierce'
	},
	[DamageType.HOLY]: {
		name: 'Holy'
	},
	[DamageType.LIGHTNING]: {
		name: 'Lightning'
	},
	[DamageType.FIRE]: {
		name: 'Fire'
	},
	[DamageType.MAGIC]: {
		name: 'Magic'
	}
};

export const statusTypes: Record<StatusEffectType, { name: string }> = {
	[StatusEffectType.HEMORRHAGE]: {
		name: 'Hemorrhage'
	},
	[StatusEffectType.FROSTBITE]: {
		name: 'Frostbite'
	},
	[StatusEffectType.DEATH]: {
		name: 'Death'
	},
	[StatusEffectType.MADNESS]: {
		name: 'Madness'
	},
	[StatusEffectType.POISON]: {
		name: 'Poison'
	},
	[StatusEffectType.ROT]: {
		name: 'Scarlet Rot'
	},
	[StatusEffectType.SLEEP]: {
		name: 'Sleep'
	}
};
