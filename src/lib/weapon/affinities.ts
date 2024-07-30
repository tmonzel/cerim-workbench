import { AffinityType } from '$lib/core';
import type { Affinity } from '$lib/item';

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
