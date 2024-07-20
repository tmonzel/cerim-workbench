import {
	AffinityType,
	AttackType,
	AttributeType,
	DamageType,
	type Affinity,
	type GraphMutation,
	type Stat
} from './core/types';
import type { HeroAttribute } from './hero';
import { AttributeModifier } from './hero/modifiers';

export const mutationRecord: Record<string, GraphMutation[]> = {};

export const attributeRecord: Record<string, HeroAttribute> = {
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

export const attackTypeRecord: Record<string, { name: string; color: string }> = {
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

export const statRecord: Record<string, Stat> = {
	hp: {
		name: 'Health'
	},
	fp: {
		name: 'FP'
	},
	stamina: {
		name: 'Stamina'
	},
	discovery: {
		name: 'Discovery'
	},
	weight: {
		name: 'Weight'
	},
	equipLoad: {
		name: 'Equip Load'
	},
	attackSpeed: {
		name: 'Attack Speed'
	}
};

export const resistanceRecord: Record<string, { name: string }> = {
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

export const damageTypeRecord: Record<string, { name: string }> = {
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

export const affinityRecord: Record<string, Affinity> = {
	[AffinityType.STANDARD]: {
		name: 'Standard',
		schema: '0',
		iconUrl: '/images/affinities/affinity-standard.webp'
	},
	[AffinityType.HEAVY]: {
		name: 'Heavy',
		schema: '100',
		iconUrl: '/images/affinities/affinity-heavy.webp'
	},
	[AffinityType.KEEN]: {
		name: 'Keen',
		schema: '200',
		iconUrl: '/images/affinities/affinity-keen.webp'
	},
	[AffinityType.QUALITY]: {
		name: 'Quality',
		schema: '300',
		iconUrl: '/images/affinities/affinity-quality.webp'
	},
	[AffinityType.FIRE]: {
		name: 'Fire',
		schema: '400',
		iconUrl: '/images/affinities/affinity-fire.webp'
	},
	[AffinityType.FLAME]: {
		name: 'Flame',
		schema: '500',
		iconUrl: '/images/affinities/affinity-flame.webp'
	},
	[AffinityType.LIGHTNING]: {
		name: 'Lightning',
		schema: '600',
		iconUrl: '/images/affinities/affinity-lightning.webp'
	},
	[AffinityType.SACRED]: {
		name: 'Sacred',
		schema: '700',
		iconUrl: '/images/affinities/affinity-sacred.webp'
	},
	[AffinityType.MAGIC]: {
		name: 'Magic',
		schema: '800',
		iconUrl: '/images/affinities/affinity-magic.webp'
	},
	[AffinityType.COLD]: {
		name: 'Cold',
		schema: '900',
		iconUrl: '/images/affinities/affinity-cold.webp'
	},
	[AffinityType.POISON]: {
		name: 'Poison',
		schema: '1000',
		iconUrl: '/images/affinities/affinity-poison.webp'
	},
	[AffinityType.BLOOD]: {
		name: 'Blood',
		schema: '1100',
		iconUrl: '/images/affinities/affinity-blood.webp'
	},
	[AffinityType.OCCULT]: {
		name: 'Occult',
		schema: '1200',
		iconUrl: '/images/affinities/affinity-occult.jpg'
	}
};

export const itemTypeRecord: Record<string, { name: string }> = {
	talisman: {
		name: 'Talisman'
	},
	rune: {
		name: 'Great Rune'
	},
	dagger: {
		name: 'Dagger'
	},
	'straight-sword': {
		name: 'Straight Sword'
	},
	greatsword: {
		name: 'Greatsword'
	},
	'colossal-sword': {
		name: 'Colossal Sword'
	},
	'thrusting-sword': {
		name: 'Thrusting Sword'
	},
	'heavy-thrusting-sword': {
		name: 'Heavy Thrusting Sword'
	},
	'curved-sword': {
		name: 'Curved Sword'
	},
	'curved-greatsword': {
		name: 'Curved Greatsword'
	},
	katana: {
		name: 'Katana'
	},
	twinblade: {
		name: 'Twinblade'
	},
	axe: {
		name: 'Axe'
	},
	'great-axe': {
		name: 'Greataxe'
	},
	hammer: {
		name: 'Hammer'
	},
	flail: {
		name: 'Flail'
	},
	'great-hammer': {
		name: 'Great Hammer'
	},
	'colossal-weapon': {
		name: 'Colossal Weapon'
	},
	spear: {
		name: 'Spear'
	},
	'great-spear': {
		name: 'Great Spear'
	},
	halberd: {
		name: 'Halberd'
	},
	reaper: {
		name: 'Reaper'
	},
	whip: {
		name: 'Whip'
	},
	fist: {
		name: 'Fist'
	},
	claw: {
		name: 'Claw'
	},
	'light-bow': {
		name: 'Light Bow'
	},
	bow: {
		name: 'Bow'
	},
	greatbow: {
		name: 'Greatbow'
	},
	crossbow: {
		name: 'Crossbow'
	},
	ballista: {
		name: 'Ballista'
	},
	'glintstone-staff': {
		name: 'Glintstone Staff'
	},
	'sacred-seal': {
		name: 'Sacred Seal'
	},
	'throwing-blade': {
		name: 'Throwing Blade'
	},
	'perfume-bottle': {
		name: 'Perfume Bottle'
	},
	torch: {
		name: 'Torch'
	},
	'hand-to-hand': {
		name: 'Hand-To-Hand Arts'
	},
	'beast-claw': {
		name: 'Beast Claw'
	},
	'light-greatsword': {
		name: 'Light Greatsword'
	},
	'great-katana': {
		name: 'Great Katana'
	},
	'backhand-blade': {
		name: 'Backhand Blade'
	},

	// Armor
	helm: {
		name: 'Helm'
	},
	armor: {
		name: 'Chest Armor'
	},
	gauntlet: {
		name: 'Gauntlet'
	},
	leg: {
		name: 'Leg Armor'
	},

	// Shields
	'small-shield': {
		name: 'Small Shield'
	},
	shield: {
		name: 'Medium Shield'
	},
	greatshield: {
		name: 'Greatshield'
	},
	'thrusting-shield': {
		name: 'Thrusting Shield'
	}
};

export const itemGroupRecord: Record<string, { name: string }> = {
	daggers: {
		name: 'Daggers'
	},
	swords: {
		name: 'Swords'
	},
	axes: {
		name: 'Axes'
	},
	hammers: {
		name: 'Hammers'
	},
	'colossal-weapons': {
		name: 'Colossal Weapons'
	},
	flails: {
		name: 'Flails'
	},
	spears: {
		name: 'Daggers'
	},
	halberds: {
		name: 'Halberds'
	},
	reapers: {
		name: 'Reapers'
	},
	whips: {
		name: 'Whips'
	},
	fists: {
		name: 'Fists'
	},
	shields: {
		name: 'Shields'
	},
	claws: {
		name: 'Claws'
	},
	torches: {
		name: 'Torches'
	},
	staffs: {
		name: 'Staffs'
	},
	seals: {
		name: 'Seals'
	},
	bows: {
		name: 'Bows'
	},
	'hand-to-hands': {
		name: 'Hand to hands'
	},
	bottles: {
		name: 'Bottles'
	},

	armors: {
		name: 'Armors'
	},
	helmets: {
		name: 'Helmets'
	},
	legs: {
		name: 'Legs'
	},
	gauntlets: {
		name: 'Gauntlets'
	},

	talismans: {
		name: 'Talismans'
	},

	runes: {
		name: 'Runes'
	}
};
