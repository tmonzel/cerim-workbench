import { AttributeType, type AttributeScaling } from './attributes';

export type Stat = {
	type?: 'flat' | 'percentual';
	name: string;
	attributeScaling?: AttributeScaling;
	renderer?: (value: number) => string;
	resolver?: (value: number) => number;
};

export const statTypes: Record<string, Stat> = {
	hp: {
		name: 'HP',
		attributeScaling: {
			type: AttributeType.VIGOR,
			mutations: [
				{ breakpoint: 1, grow: 300, exp: 1.5 },
				{ breakpoint: 25, grow: 800, exp: 1.1 },
				{ breakpoint: 40, grow: 1450, exp: -1.2 },
				{ breakpoint: 60, grow: 1900, exp: -1.2 },
				{ breakpoint: 99, grow: 2100 }
			]
		}
	},

	fp: {
		name: 'FP',
		attributeScaling: {
			type: AttributeType.MIND,
			mutations: [
				{ breakpoint: 1, grow: 50 },
				{ breakpoint: 15, grow: 95 },
				{ breakpoint: 35, grow: 200, exp: -1.2 },
				{ breakpoint: 60, grow: 350 },
				{ breakpoint: 99, grow: 450 }
			]
		}
	},

	stamina: {
		name: 'Stamina',
		attributeScaling: {
			type: AttributeType.ENDURANCE,
			mutations: [
				{ breakpoint: 1, grow: 80 },
				{ breakpoint: 15, grow: 105 },
				{ breakpoint: 30, grow: 130 },
				{ breakpoint: 50, grow: 155 },
				{ breakpoint: 99, grow: 170 }
			]
		}
	},

	discovery: {
		name: 'Discovery',
		attributeScaling: {
			type: AttributeType.ARCANE,
			mutations: [
				{ breakpoint: 0, grow: 1 },
				{ breakpoint: 30, grow: 1.3 },
				{ breakpoint: 40, grow: 1.4 },
				{ breakpoint: 60, grow: 1.6 },
				{ breakpoint: 99, grow: 1.99 }
			]
		},

		resolver: (value: number) => {
			return value * 100;
		}
	},

	equipLoad: {
		name: 'Equip Load',
		attributeScaling: {
			type: AttributeType.ENDURANCE,
			mutations: [
				{ breakpoint: 1, grow: 45 },
				{ breakpoint: 8, grow: 45 },
				{ breakpoint: 25, grow: 72, exp: 1.1 },
				{ breakpoint: 60, grow: 120 },
				{ breakpoint: 99, grow: 160 }
			]
		}
	},

	immunity: {
		name: 'Immunity',
		attributeScaling: {
			type: AttributeType.VIGOR,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 30, grow: 0 },
				{ breakpoint: 40, grow: 30 },
				{ breakpoint: 60, grow: 40 },
				{ breakpoint: 99, grow: 50 }
			]
		}
	},

	robustness: {
		name: 'Robustness',
		attributeScaling: {
			type: AttributeType.ENDURANCE,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 30, grow: 0 },
				{ breakpoint: 40, grow: 30 },
				{ breakpoint: 60, grow: 40 },
				{ breakpoint: 99, grow: 50 }
			]
		}
	},

	focus: {
		name: 'Focus',
		attributeScaling: {
			type: AttributeType.MIND,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 30, grow: 0 },
				{ breakpoint: 40, grow: 30 },
				{ breakpoint: 60, grow: 40 },
				{ breakpoint: 99, grow: 50 }
			]
		}
	},

	vitality: {
		name: 'Vitality',
		attributeScaling: {
			type: AttributeType.ARCANE,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 15, grow: 15 },
				{ breakpoint: 40, grow: 30 },
				{ breakpoint: 60, grow: 40 },
				{ breakpoint: 99, grow: 50 }
			]
		}
	},

	standardDefense: {
		name: 'Standard Defense',
		attributeScaling: {
			type: AttributeType.STRENGTH,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 30, grow: 10 },
				{ breakpoint: 40, grow: 15 },
				{ breakpoint: 60, grow: 30 },
				{ breakpoint: 99, grow: 40 }
			]
		}
	},

	strikeDefense: {
		name: 'Strike Defense',
		attributeScaling: {
			type: AttributeType.STRENGTH,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 30, grow: 10 },
				{ breakpoint: 40, grow: 15 },
				{ breakpoint: 60, grow: 30 },
				{ breakpoint: 99, grow: 40 }
			]
		}
	},

	slashDefense: {
		name: 'Slash Defense',
		attributeScaling: {
			type: AttributeType.STRENGTH,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 30, grow: 10 },
				{ breakpoint: 40, grow: 15 },
				{ breakpoint: 60, grow: 30 },
				{ breakpoint: 99, grow: 40 }
			]
		}
	},

	pierceDefense: {
		name: 'Pierce Defense',
		attributeScaling: {
			type: AttributeType.STRENGTH,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 30, grow: 10 },
				{ breakpoint: 40, grow: 15 },
				{ breakpoint: 60, grow: 30 },
				{ breakpoint: 99, grow: 40 }
			]
		}
	},

	magicDefense: {
		name: 'Magic Defense',
		attributeScaling: {
			type: AttributeType.INTELLIGENCE,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 20, grow: 40 },
				{ breakpoint: 35, grow: 50 },
				{ breakpoint: 60, grow: 60 },
				{ breakpoint: 99, grow: 70 }
			]
		}
	},

	fireDefense: {
		name: 'Fire Defense',
		attributeScaling: {
			type: AttributeType.VIGOR,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 30, grow: 20 },
				{ breakpoint: 40, grow: 40 },
				{ breakpoint: 60, grow: 60 },
				{ breakpoint: 99, grow: 70 }
			]
		}
	},

	lightningDefense: {
		name: 'Lightning Defense'
	},

	holyDefense: {
		name: 'Holy Defense',
		attributeScaling: {
			type: AttributeType.ARCANE,
			mutations: [
				{ breakpoint: 0, grow: 0 },
				{ breakpoint: 20, grow: 40 },
				{ breakpoint: 35, grow: 50 },
				{ breakpoint: 60, grow: 60 },
				{ breakpoint: 99, grow: 70 }
			]
		}
	},

	staminaRecoverySpeed: {
		name: 'Stamina Recovery',
		renderer: (value: number) => {
			return `${value}/s`;
		}
	},

	runeAcquisitionRate: {
		name: 'Rune gain'
	},

	magicSlots: {
		name: 'Magic Slots'
	}
};
