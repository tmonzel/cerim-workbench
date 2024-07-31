export enum ArmorType {
	HEAD = 0,
	BODY = 1,
	ARMS = 2,
	LEGS = 3,
	HAIR = 4
}

export type ArmorTypeInfo = {
	name: string;
};

export const armorTypeInfo: Record<number, ArmorTypeInfo> = {
	[ArmorType.HEAD]: {
		name: 'Helm'
	},
	[ArmorType.BODY]: {
		name: 'Chest Armor'
	},
	[ArmorType.ARMS]: {
		name: 'Gauntlet'
	},
	[ArmorType.LEGS]: {
		name: 'Legs'
	},
	[ArmorType.HAIR]: {
		name: 'Hair'
	}
};
