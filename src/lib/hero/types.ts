import type {
	AttributeType,
	DynamicAttack,
	DynamicAttributes,
	DynamicDamageNegation,
	DynamicDefense,
	DynamicResistance,
	DynamicStats
} from '$lib/core';
import type { AttributeScaling } from './attributes';
import type { DiscoveryStat } from './stats/DiscoveryStat';
import type { EquipLoadStat } from './stats/EquipLoadStat';
import type { FireDefenseStat } from './stats/FireDefenseStat';
import type { FocusStat } from './stats/FocusStat';
import type { FPStat } from './stats/FPStat';
import type { HolyDefenseStat } from './stats/HolyDefenseStat';
import type { HPStat } from './stats/HPStat';
import type { ImmunityStat } from './stats/ImmunityStat';
import type { LightningDefenseStat } from './stats/LightningDefenseStat';
import type { MagicDefenseStat } from './stats/MagicDefenseStat';
import type { PierceDefenseStat } from './stats/PierceDefenseStat';
import type { RobustnessStat } from './stats/RobustnessStat';
import type { SlashDefenseStat } from './stats/SlashDefenseStat';
import type { StaminaStat } from './stats/StaminaStat';
import type { StandardDefenseStat } from './stats/StandardDefenseStat';
import type { StrikeDefenseStat } from './stats/StrikeDefenseStat';
import type { VitalityStat } from './stats/VitalityStat';

export type HeroContext = {
	id: string;
	name: string;
};

export type HeroStat = {
	readonly label: string;
	readonly attributeScaling?: AttributeScaling;
	readonly base: number;
	getTotal(): number;
	toString(): string;
};

export type HeroState = {
	type: HeroType;
	level: number;
	attributePoints: number;

	progress: number;
	souls: number;

	weight: number;
	poise: number;
	totalAttributes: Record<string, number>;

	attack: DynamicAttack;
	stats: DynamicStats;
	attributes: DynamicAttributes;
	damageNegation: DynamicDamageNegation;

	hp: HPStat;
	fp: FPStat;
	stamina: StaminaStat;
	discovery: DiscoveryStat;
	equipLoad: EquipLoadStat;

	immunity: ImmunityStat;
	robustness: RobustnessStat;
	focus: FocusStat;
	vitality: VitalityStat;

	standardDefense: StandardDefenseStat;
	strikeDefense: StrikeDefenseStat;
	slashDefense: SlashDefenseStat;
	pierceDefense: PierceDefenseStat;

	magicDefense: MagicDefenseStat;
	fireDefense: FireDefenseStat;
	lightningDefense: LightningDefenseStat;
	holyDefense: HolyDefenseStat;

	/*staminaRecoverySpeed: number; // Per Second

	hpFlaskRestorationRate: DynamicNumber;
	hpRestoration: DynamicNumber;

	fpFlaskRestorationRate: DynamicNumber;
	fpRestoration: DynamicNumber;

	runeGainRate: DynamicNumber;
	sorcerySlots: DynamicNumber;*/
};

export type HeroType = {
	id: string;
	name: string;
	level: number;
	attributes: Record<AttributeType, number>;
};

export type HeroBodyState = {
	guardInfo: boolean;
	scalingInfo: boolean;
};

export type HeroStateModifier = {
	modify(hero: HeroState): void;
};
