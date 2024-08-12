import { type GraphMutation } from './types';

export enum AttributeType {
	VIGOR = 'vig',
	ENDURANCE = 'end',
	STRENGTH = 'str',
	DEXTERITY = 'dex',
	MIND = 'mnd',
	INTELLIGENCE = 'int',
	FAITH = 'fth',
	ARCANE = 'arc'
}

export type Attribute = {
	name: string;
	color: string;
};

export type AttributeScaling = {
	type: AttributeType;
	mutations: GraphMutation[];
};

export const attributeTypes: Record<string, Attribute> = {
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
