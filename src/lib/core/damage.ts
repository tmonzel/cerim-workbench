export enum DamageType {
	STANDARD = 'standard',
	STRIKE = 'strike',
	SLASH = 'slash',
	PIERCE = 'pierce',
	HOLY = 'hol',
	LIGHTNING = 'lit',
	FIRE = 'fir',
	MAGIC = 'mag',
	POISE = 'poise'
}

export type Damage = {
	name: string;
};

export const damageTypes: Record<string, Damage> = {
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
	},
	[DamageType.POISE]: {
		name: 'Poise'
	}
};
