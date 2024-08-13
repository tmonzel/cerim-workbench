import type { ItemData } from '$lib/item';

export enum GoodsType {
	NORMAL_ITEM = 0,
	KEY_ITEM = 1,
	CRAFTING_MAT = 2,
	REINFORCEMENT_MAT = 14,
	REMBERANCE = 3,
	NONE = 4,
	SORCERY = 5,
	GREAT_RUNE = 15,
	LESSER_SUMMON = 7,
	GREATER_SUMMON = 8,
	INFO = 12,
	INCANTATION = 16,
	TEAR = 10,
	REG_MAT = 11
}

export interface GoodEntity extends ItemData {
	effectInfo?: string;
}
