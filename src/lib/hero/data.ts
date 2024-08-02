import { AttributeType } from '$lib/core';
import type { HeroAttribute } from './attributes';
import { AttributeModifier } from './modifiers';
import type { HeroType } from './types';

export const heroTypes: HeroType[] = [
	{
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

	{
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

	{
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

	{
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

	{
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

	{
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

	{
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

	{
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

	{
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

	{
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
];

export const attributeTypes: Record<string, HeroAttribute> = {
	[AttributeType.VIGOR]: {
		name: 'Vigor',
		color: '#4ade80',
		modifier: new AttributeModifier(AttributeType.VIGOR, {
			stats: {
				hp: [
					{ breakpoint: 1, grow: 300, exp: 1.5 },
					{ breakpoint: 25, grow: 800, exp: 1.1 },
					{ breakpoint: 40, grow: 1450, exp: -1.2 },
					{ breakpoint: 60, grow: 1900, exp: -1.2 },
					{ breakpoint: 99, grow: 2100 }
				]
			},
			resistance: {
				immunity: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 30, grow: 0 },
					{ breakpoint: 40, grow: 30 },
					{ breakpoint: 60, grow: 40 },
					{ breakpoint: 99, grow: 50 }
				]
			},
			defense: {
				fir: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 30, grow: 20 },
					{ breakpoint: 40, grow: 40 },
					{ breakpoint: 60, grow: 60 },
					{ breakpoint: 99, grow: 70 }
				]
			}
		})
	},

	[AttributeType.ENDURANCE]: {
		name: 'Endurance',
		color: '#fbbf24',
		modifier: new AttributeModifier(AttributeType.ENDURANCE, {
			stats: {
				stamina: [
					{ breakpoint: 1, grow: 80 },
					{ breakpoint: 15, grow: 105 },
					{ breakpoint: 30, grow: 130 },
					{ breakpoint: 50, grow: 155 },
					{ breakpoint: 99, grow: 170 }
				],
				equipLoad: [
					{ breakpoint: 1, grow: 45 },
					{ breakpoint: 8, grow: 45 },
					{ breakpoint: 25, grow: 72, exp: 1.1 },
					{ breakpoint: 60, grow: 120 },
					{ breakpoint: 99, grow: 160 }
				]
			},
			resistance: {
				robustness: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 30, grow: 0 },
					{ breakpoint: 40, grow: 30 },
					{ breakpoint: 60, grow: 40 },
					{ breakpoint: 99, grow: 50 }
				]
			}
		})
	},

	[AttributeType.STRENGTH]: {
		name: 'Strength',
		color: '#f87171',
		modifier: new AttributeModifier(AttributeType.STRENGTH, {
			defense: {
				standard: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 30, grow: 10 },
					{ breakpoint: 40, grow: 15 },
					{ breakpoint: 60, grow: 30 },
					{ breakpoint: 99, grow: 40 }
				],
				strike: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 30, grow: 10 },
					{ breakpoint: 40, grow: 15 },
					{ breakpoint: 60, grow: 30 },
					{ breakpoint: 99, grow: 40 }
				],
				slash: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 30, grow: 10 },
					{ breakpoint: 40, grow: 15 },
					{ breakpoint: 60, grow: 30 },
					{ breakpoint: 99, grow: 40 }
				],
				pierce: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 30, grow: 10 },
					{ breakpoint: 40, grow: 15 },
					{ breakpoint: 60, grow: 30 },
					{ breakpoint: 99, grow: 40 }
				]
			}
		})
	},

	[AttributeType.DEXTERITY]: {
		name: 'Dexterity',
		color: '#f0abfc'
	},

	[AttributeType.MIND]: {
		name: 'Mind',
		color: '#db2777',
		modifier: new AttributeModifier(AttributeType.MIND, {
			stats: {
				fp: [
					{ breakpoint: 1, grow: 50 },
					{ breakpoint: 15, grow: 95 },
					{ breakpoint: 35, grow: 200, exp: -1.2 },
					{ breakpoint: 60, grow: 350 },
					{ breakpoint: 99, grow: 450 }
				]
			},
			resistance: {
				focus: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 30, grow: 0 },
					{ breakpoint: 40, grow: 30 },
					{ breakpoint: 60, grow: 40 },
					{ breakpoint: 99, grow: 50 }
				]
			}
		})
	},

	[AttributeType.INTELLIGENCE]: {
		name: 'Intelligence',
		color: '#67e8f9',
		modifier: new AttributeModifier(AttributeType.INTELLIGENCE, {
			defense: {
				mag: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 20, grow: 40 },
					{ breakpoint: 35, grow: 50 },
					{ breakpoint: 60, grow: 60 },
					{ breakpoint: 99, grow: 70 }
				]
			}
		})
	},

	[AttributeType.FAITH]: {
		name: 'Faith',
		color: '#bef264'
	},

	[AttributeType.ARCANE]: {
		name: 'Arcane',
		color: '#f3e8ff',
		modifier: new AttributeModifier(AttributeType.ARCANE, {
			resistance: {
				vitality: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 15, grow: 15 },
					{ breakpoint: 40, grow: 30 },
					{ breakpoint: 60, grow: 40 },
					{ breakpoint: 99, grow: 50 }
				]
			},
			defense: {
				hol: [
					{ breakpoint: 0, grow: 0 },
					{ breakpoint: 20, grow: 40 },
					{ breakpoint: 35, grow: 50 },
					{ breakpoint: 60, grow: 60 },
					{ breakpoint: 99, grow: 70 }
				]
			},
			stats: {
				discovery: [
					{ breakpoint: 0, grow: 1 },
					{ breakpoint: 30, grow: 1.3 },
					{ breakpoint: 40, grow: 1.4 },
					{ breakpoint: 60, grow: 1.6 },
					{ breakpoint: 99, grow: 1.99 }
				]
			}
		})
	}
};
