import { AttributeType } from '$lib/core';
import { writable } from 'svelte/store';
import type { AttributeState } from './types';
import { AttributeModifier } from './modifiers';

export const attributeStore = writable<AttributeState>({
	[AttributeType.VIGOR]: 0,
	[AttributeType.ENDURANCE]: 0,
	[AttributeType.STRENGTH]: 0,
	[AttributeType.DEXTERITY]: 0,
	[AttributeType.MIND]: 0,
	[AttributeType.INTELLIGENCE]: 0,
	[AttributeType.FAITH]: 0,
	[AttributeType.ARCANE]: 0
});

export const vigorModifier = new AttributeModifier(AttributeType.VIGOR, {
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
			{ breakpoint: 20, grow: 40 },
			{ breakpoint: 40, grow: 50 },
			{ breakpoint: 60, grow: 60 },
			{ breakpoint: 70, grow: 70 }
		]
	}
});

export const enduranceModifier = new AttributeModifier(AttributeType.ENDURANCE, {
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
});

export const strengthModifier = new AttributeModifier(AttributeType.STRENGTH, {
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
});

export const mindModifier = new AttributeModifier(AttributeType.MIND, {
	stats: {
		fp: [
			{ breakpoint: 1, grow: 50 },
			{ breakpoint: 15, grow: 95 },
			{ breakpoint: 35, grow: 200, exp: -1.2 },
			{ breakpoint: 60, grow: 350 },
			{ breakpoint: 99, grow: 450 }
		]
	}
});

export const intelligenceModifier = new AttributeModifier(AttributeType.INTELLIGENCE, {
	defense: {
		mag: [
			{ breakpoint: 0, grow: 0 },
			{ breakpoint: 20, grow: 40 },
			{ breakpoint: 35, grow: 50 },
			{ breakpoint: 60, grow: 60 },
			{ breakpoint: 99, grow: 70 }
		]
	}
});

export const arcanceModifier = new AttributeModifier(AttributeType.ARCANE, {
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
});
