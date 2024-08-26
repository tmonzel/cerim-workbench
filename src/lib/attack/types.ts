export enum AttackType {
	PHYSICAL = 'phy',
	MAGIC = 'mag',
	FIRE = 'fir',
	LIGHTNING = 'lit',
	HOLY = 'hol',
	STAMINA = 'sta',
	SORCERY = 'sor',
	INCANTATION = 'inc'
}

export enum AttackStatusType {
	NONE = 0,
	MAGIC = 10,
	FIRE = 11,
	LIGHTNING = 12,
	HOLY = 13,
	POISON = 20,
	SCARLET_ROT = 21,
	HEMORRHAGE = 22,
	FROSTBITE = 23,
	SLEEP = 24,
	MADNESS = 25,
	BLIGHT = 26
}

export type AttributeAttackRecord = { value: number; attack: Attack };
export type Attack = Partial<Record<AttackType, number>>;
export type AttackCorrect = Record<string, AttackType[]>;

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
	[AttackStatusType.HEMORRHAGE]: {
		name: 'Hemorrhage'
	},
	[AttackStatusType.FROSTBITE]: {
		name: 'Frostbite'
	},
	[AttackStatusType.BLIGHT]: {
		name: 'Death'
	},
	[AttackStatusType.MADNESS]: {
		name: 'Madness'
	},
	[AttackStatusType.POISON]: {
		name: 'Poison'
	},
	[AttackStatusType.SCARLET_ROT]: {
		name: 'Scarlet Rot'
	},
	[AttackStatusType.SLEEP]: {
		name: 'Sleep'
	}
};
