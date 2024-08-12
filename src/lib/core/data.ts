import { AttackType, StatusEffectType } from './types';

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

export const statusTypes: Record<string, { name: string }> = {
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
