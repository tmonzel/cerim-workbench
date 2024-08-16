import { AttributeType } from './attributes';
import { AttackType, StatusEffectType, type HeroType } from './types';

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

export const heroTypes: Record<string, HeroType> = {
	hero: {
		id: 'hero',
		name: 'Hero',
		level: 7,
		attributes: {
			[AttributeType.VIGOR]: 14,
			[AttributeType.ENDURANCE]: 12,
			[AttributeType.STRENGTH]: 16,
			[AttributeType.DEXTERITY]: 9,
			[AttributeType.MIND]: 9,
			[AttributeType.INTELLIGENCE]: 7,
			[AttributeType.FAITH]: 8,
			[AttributeType.ARCANE]: 11
		}
	},

	bandit: {
		id: 'bandit',
		name: 'Bandit',
		level: 5,
		attributes: {
			[AttributeType.VIGOR]: 10,
			[AttributeType.ENDURANCE]: 10,
			[AttributeType.STRENGTH]: 9,
			[AttributeType.DEXTERITY]: 13,
			[AttributeType.MIND]: 11,
			[AttributeType.INTELLIGENCE]: 9,
			[AttributeType.FAITH]: 8,
			[AttributeType.ARCANE]: 14
		}
	},

	astrologer: {
		id: 'astrologer',
		name: 'Astrologer',
		level: 6,
		attributes: {
			[AttributeType.VIGOR]: 9,
			[AttributeType.ENDURANCE]: 9,
			[AttributeType.STRENGTH]: 8,
			[AttributeType.DEXTERITY]: 12,
			[AttributeType.MIND]: 15,
			[AttributeType.INTELLIGENCE]: 16,
			[AttributeType.FAITH]: 7,
			[AttributeType.ARCANE]: 9
		}
	},

	warrior: {
		id: 'warrior',
		name: 'Warrior',
		level: 8,
		attributes: {
			[AttributeType.VIGOR]: 11,
			[AttributeType.ENDURANCE]: 11,
			[AttributeType.STRENGTH]: 10,
			[AttributeType.DEXTERITY]: 16,
			[AttributeType.MIND]: 12,
			[AttributeType.INTELLIGENCE]: 10,
			[AttributeType.FAITH]: 8,
			[AttributeType.ARCANE]: 9
		}
	},

	prisoner: {
		id: 'prisoner',
		name: 'Prisoner',
		level: 9,
		attributes: {
			[AttributeType.VIGOR]: 11,
			[AttributeType.ENDURANCE]: 11,
			[AttributeType.STRENGTH]: 11,
			[AttributeType.DEXTERITY]: 14,
			[AttributeType.MIND]: 12,
			[AttributeType.INTELLIGENCE]: 14,
			[AttributeType.FAITH]: 6,
			[AttributeType.ARCANE]: 9
		}
	},

	confessor: {
		id: 'confessor',
		name: 'Confessor',
		level: 10,
		attributes: {
			[AttributeType.VIGOR]: 10,
			[AttributeType.ENDURANCE]: 10,
			[AttributeType.STRENGTH]: 12,
			[AttributeType.DEXTERITY]: 12,
			[AttributeType.MIND]: 13,
			[AttributeType.INTELLIGENCE]: 9,
			[AttributeType.FAITH]: 14,
			[AttributeType.ARCANE]: 9
		}
	},

	wretch: {
		id: 'wretch',
		name: 'Wretch',
		level: 1,
		attributes: {
			[AttributeType.VIGOR]: 10,
			[AttributeType.ENDURANCE]: 10,
			[AttributeType.STRENGTH]: 10,
			[AttributeType.DEXTERITY]: 10,
			[AttributeType.MIND]: 10,
			[AttributeType.INTELLIGENCE]: 10,
			[AttributeType.FAITH]: 10,
			[AttributeType.ARCANE]: 10
		}
	},

	vagabond: {
		id: 'vagabond',
		name: 'Vagabond',
		level: 9,
		attributes: {
			[AttributeType.VIGOR]: 15,
			[AttributeType.ENDURANCE]: 11,
			[AttributeType.STRENGTH]: 14,
			[AttributeType.DEXTERITY]: 13,
			[AttributeType.MIND]: 10,
			[AttributeType.INTELLIGENCE]: 9,
			[AttributeType.FAITH]: 9,
			[AttributeType.ARCANE]: 7
		}
	},

	prophet: {
		id: 'prophet',
		name: 'Prophet',
		level: 7,
		attributes: {
			[AttributeType.VIGOR]: 10,
			[AttributeType.ENDURANCE]: 8,
			[AttributeType.STRENGTH]: 11,
			[AttributeType.DEXTERITY]: 10,
			[AttributeType.MIND]: 14,
			[AttributeType.INTELLIGENCE]: 7,
			[AttributeType.FAITH]: 16,
			[AttributeType.ARCANE]: 10
		}
	},

	samurai: {
		id: 'samurai',
		name: 'Samurai',
		level: 9,
		attributes: {
			[AttributeType.VIGOR]: 12,
			[AttributeType.ENDURANCE]: 13,
			[AttributeType.STRENGTH]: 12,
			[AttributeType.DEXTERITY]: 15,
			[AttributeType.MIND]: 11,
			[AttributeType.INTELLIGENCE]: 9,
			[AttributeType.FAITH]: 8,
			[AttributeType.ARCANE]: 8
		}
	}
};
