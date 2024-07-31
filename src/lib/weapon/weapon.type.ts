export enum WeaponType {
	DAGGER = 1,
	STRAIGHT_SWORD = 3,
	GREATSWORD = 5,
	COLOSSAL_SWORD = 7,
	CURVED_SWORD = 9,
	CURVED_GREATSWORD = 11,
	KATANA = 13,
	TWINBLADE = 14,
	THRUSTING_SWORD = 15,
	HEAVY_THRUSTING_SWORD = 16,
	AXE = 17,
	GREAT_AXE = 19,
	HAMMER = 21,
	GREAT_HAMMER = 23,
	FLAIL = 24,
	SPEAR = 25,
	GREAT_SPEAR = 28,
	HALBERD = 29,
	REAPER = 31,
	FIST = 35,
	CLAW = 37,
	WHIP = 39,
	COLOSSAL_WEAPON = 41,
	LIGHT_BOW = 50,
	BOW = 51,
	GREATBOW = 53,
	CROSSBOW = 55,
	BALLISTA = 56,
	GLINTSTONE_STAFF = 57,
	DUAL_CATALYST = 59,
	SACRED_SEAL = 61,
	SMALL_SHIELD = 65,
	SHIELD = 67,
	GREATSHIELD = 69,
	ARROW = 81,
	GREAT_ARROW = 83,
	BOLT = 85,
	BALLISTA_BOLT = 86,
	TORCH = 87,
	HAND_TO_HAND = 88,
	PERFUME_BOTTLE = 89,
	THRUSTING_SHIELD = 90,
	THROWING_BLADE = 91,
	BACKHAND_BLADE = 92,
	LIGHT_GREATSWORD = 93,
	GREAT_KATANA = 94,
	BEAST_CLAW = 95
}

export type WeaponTypeInfo = {
	name: string;
};

export const weaponTypeInfo: Record<number, WeaponTypeInfo> = {
	[WeaponType.DAGGER]: {
		name: 'Dagger'
	},
	[WeaponType.STRAIGHT_SWORD]: {
		name: 'Straight Sword'
	},
	[WeaponType.GREATSWORD]: {
		name: 'Greatsword'
	},
	[WeaponType.COLOSSAL_SWORD]: {
		name: 'Colossal Sword'
	},
	[WeaponType.CURVED_SWORD]: {
		name: 'Curved Sword'
	},
	[WeaponType.CURVED_GREATSWORD]: {
		name: 'Curved Greatsword'
	},
	[WeaponType.KATANA]: {
		name: 'Katana'
	},
	[WeaponType.TWINBLADE]: {
		name: 'Twinblade'
	},
	[WeaponType.THRUSTING_SWORD]: {
		name: 'Thrusting Sword'
	},
	[WeaponType.HEAVY_THRUSTING_SWORD]: {
		name: 'Heavy Thrusting Sword'
	},
	[WeaponType.AXE]: {
		name: 'Axe'
	},
	[WeaponType.GREAT_AXE]: {
		name: 'Greataxe'
	},
	[WeaponType.HAMMER]: {
		name: 'Hammer'
	},
	[WeaponType.GREAT_HAMMER]: {
		name: 'Great Hammer'
	},
	[WeaponType.FLAIL]: {
		name: 'Flail'
	},
	[WeaponType.SPEAR]: {
		name: 'Spear'
	},
	[WeaponType.GREAT_SPEAR]: {
		name: 'Great Spear'
	},
	[WeaponType.HALBERD]: {
		name: 'Halberd'
	},
	[WeaponType.REAPER]: {
		name: 'Reaper'
	},
	[WeaponType.FIST]: {
		name: 'Fist'
	},
	[WeaponType.CLAW]: {
		name: 'Claw'
	},
	[WeaponType.WHIP]: {
		name: 'Whip'
	},
	[WeaponType.COLOSSAL_WEAPON]: {
		name: 'Colossal Weapon'
	},
	[WeaponType.LIGHT_BOW]: {
		name: 'Light Bow'
	},
	[WeaponType.BOW]: {
		name: 'Bow'
	},
	[WeaponType.GREATBOW]: {
		name: 'Greatbow'
	},
	[WeaponType.CROSSBOW]: {
		name: 'Crossbow'
	},
	[WeaponType.BALLISTA]: {
		name: 'Ballista'
	},
	[WeaponType.GLINTSTONE_STAFF]: {
		name: 'Glintstone Staff'
	},
	[WeaponType.DUAL_CATALYST]: {
		name: 'Dual Catalyst'
	},
	[WeaponType.SACRED_SEAL]: {
		name: 'Sacred Seal'
	},
	[WeaponType.SMALL_SHIELD]: {
		name: 'Small Shield'
	},
	[WeaponType.SHIELD]: {
		name: 'Shield'
	},
	[WeaponType.GREATSHIELD]: {
		name: 'Greatshield'
	},
	[WeaponType.ARROW]: {
		name: 'Arrow'
	},
	[WeaponType.GREAT_ARROW]: {
		name: 'Great Arrow'
	},
	[WeaponType.BOLT]: {
		name: 'Bolt'
	},
	[WeaponType.BALLISTA_BOLT]: {
		name: 'Ballista Bolt'
	},
	[WeaponType.TORCH]: {
		name: 'Torch'
	},
	[WeaponType.HAND_TO_HAND]: {
		name: 'Hand-to-Hand'
	},
	[WeaponType.PERFUME_BOTTLE]: {
		name: 'Perfume Bottle'
	},
	[WeaponType.THRUSTING_SHIELD]: {
		name: 'Thrusting Shield'
	},
	[WeaponType.THROWING_BLADE]: {
		name: 'Throwing Blade'
	},
	[WeaponType.BACKHAND_BLADE]: {
		name: 'Backhand Blade'
	},
	[WeaponType.LIGHT_GREATSWORD]: {
		name: 'Light Greatsword'
	},
	[WeaponType.GREAT_KATANA]: {
		name: 'Great Katana'
	},
	[WeaponType.BEAST_CLAW]: {
		name: 'Beast Claw'
	}
};
