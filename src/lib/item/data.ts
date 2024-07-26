import { AffinityType } from '$lib/core';
import type { Affinity } from './types';

export const itemGroups: Record<string, { name: string }> = {
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

export const itemTypes: Record<string, { name: string }> = {
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

export const affinities: Record<string, Affinity> = {
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
