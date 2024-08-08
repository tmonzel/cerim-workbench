import { AttributeType } from '$lib/core';
import type { HeroAttribute } from './attributes';
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
		color: '#4ade80'
	},

	[AttributeType.ENDURANCE]: {
		name: 'Endurance',
		color: '#fbbf24'
	},

	[AttributeType.STRENGTH]: {
		name: 'Strength',
		color: '#f87171'
	},

	[AttributeType.DEXTERITY]: {
		name: 'Dexterity',
		color: '#f0abfc'
	},

	[AttributeType.MIND]: {
		name: 'Mind',
		color: '#db2777'
	},

	[AttributeType.INTELLIGENCE]: {
		name: 'Intelligence',
		color: '#67e8f9'
	},

	[AttributeType.FAITH]: {
		name: 'Faith',
		color: '#bef264'
	},

	[AttributeType.ARCANE]: {
		name: 'Arcane',
		color: '#f3e8ff'
	}
};
