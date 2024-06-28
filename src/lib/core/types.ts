import type { AttributeStat } from './AttributeStat';
import type { DamageStat } from './DamageStat';
import type { NumericStat } from './NumericStat';

export type Mutation = {
  from: { [0]: number; [1]: number };
  to: { [0]: number; [1]: number };
}

export type Maybe<T> = T | null | undefined;

export type Stat = {
  name: string;
  value: {
    modified: boolean;
  };
}

export type DamageValue = { [0]: number; [1]: number; [2]: number } | number;
export type ResistanceValue = { [0]: number; [1]: number; };
export type AttributeValue = Partial<Record<AttributeType, number>>;

export type HeroStats = {
  'hp': NumericStat;
  'fp': NumericStat;
  'stamina': NumericStat;
  'discovery': NumericStat;
  'weight': NumericStat;
  'equipLoad': NumericStat;
  'damage': DamageStat;
  'attackSpeed': NumericStat;
  
  'res:immunity': NumericStat;
  'res:robustness': NumericStat;
  'res:focus': NumericStat;
  'res:vitality': NumericStat;
  'res:poise': NumericStat;
  
  'def:standard': NumericStat;
  'def:strike': NumericStat;
  'def:slash': NumericStat;
  'def:pierce': NumericStat;
  'def:hol': NumericStat;
  'def:lit': NumericStat;
  'def:fir': NumericStat;
  'def:mag': NumericStat;

  'guard:sta': NumericStat;
  'guard:res': NumericStat;
  'guard:phy': NumericStat;
  'guard:mag': NumericStat;
  'guard:fir': NumericStat;
  'guard:lit': NumericStat;
  'guard:hol': NumericStat;

  'attributes': AttributeStat;
};

export type AffectedStat = keyof HeroStats;

export type AttributeMutation = {
  breakpoint: number;
  grow: number;
  exp?: number;
}

export enum AttributeType {
  VIGOR = 'vig',
  ENDURANCE = 'end',
  STRENGTH = 'str',
  DEXTERITY = 'dex',
  MIND = 'mnd',
  INTELLIGENCE = 'int',
  FAITH = 'fth',
  ARCANE = 'arc'
}

export enum DamageType {
  PHYSICAL = 'phy',
  MAGIC = 'mag',
  FIRE = 'fir',
  LIGHTNING = 'lit',
  HOLY = 'hol',

  FROSTBITE = 'frb',
  POISON = 'poi',
  HEMORRHAGE = 'hem',
  STAMINA = 'sta'
}

export type ResistanceType = 'immunity' | 'robustness' | 'focus' | 'vitality' | 'poise'; 

export enum PhysicalDamageType {
  STANDARD = 'standard',
  STRIKE = 'strike',
  SLASH = 'slash',
  PIERCE = 'pierce',
}

export enum GuardType {
  PHYSICAL = 'phy',
  MAGIC = 'mag',
  FIRE = 'fir',
  LIGHTNING = 'lit',
  HOLY = 'hol',

  STABILITY = 'sta',
  RESISTANCE = 'res'
}

export enum AffinityType {
  STANDARD = 'standard',
  HEAVY = 'heavy',
  KEEN = 'keen',
  QUALITY = 'quality',
  FIRE = 'fire',
  FLAME = 'flame',
  LIGHTNING = 'lightning',
  SACRED = 'sacred',
  MAGIC = 'magic',
  COLD = 'cold',
  POISON = 'poison',
  BLOOD = 'blood',
  OCCULT = 'occult',
}

export enum ElementalDamageType {
  MAGIC = 'mag',
  FIRE = 'fir',
  LIGHTNING = 'lit',
  HOLY = 'hol'
}

export type Affinity = {
  name: string;
}

export type Resistance = {
  immunity: number;
  robustness: number;
  focus: number;
  vitality: number;
  poise: number;
}

export type Guard = Record<GuardType, number>;

export type Defense = {
  physical: Record<PhysicalDamageType, number>;
  elemental: Record<ElementalDamageType, number>;
}

export type Damage = Partial<Record<DamageType, number>>;

export type BaseScalingValue = { [0]: number; [1]: string | string[] } | number;
export type ScalingBase = Partial<Record<AttributeType, BaseScalingValue>>;
export type NumberRange = { [0]: number, [1]: number };
export type ItemType = 'weapon' | 'armor' | 'talisman' | 'shield';

export type UpgradeSchema = {
  attack?: Record<DamageType, number[]>;
  scaling?: Record<AttributeType, number[]>;
  guard?: Record<GuardType, number[]>;
}

export type ItemDef = {
  name: string;
  type: ItemType;
  caption: string;
  group: string;
  tags: string[];
  poise?: number;
  weight?: number;
  armor?: number;
  maxTiers?: number;
  tier?: number;
  attackSpeed?: number;
  description?: string;
  requirements?: ItemRequirements;
  resistance?: Resistance;
  defense?: Defense;
  guard?: Guard;
  affinity?: AffinityType;
  iconUrl?: string;
  effects?: string[];
  modifiers?: ItemModifier[];
  config?: ItemConfig;
  affinities?: Record<AffinityType, ItemConfig>;
  defaults?: string | ItemPreset;
  upgrades?: ItemUpgrade[];
}

export type ItemUpgrade = {
  iconUrl?: string;
  modifiers?: ItemModifier[];
}

export type ItemPreset = {
  maxTiers?: number;
  affinities?: Record<AffinityType, ItemConfig>;
}
 
export type ItemModifier = {
  type?: ModifierType;
  name: string;
  affects: AffectedStat;
  scope: ModifierScope;
  value: number | AttributeValue;
}

export type ModifierScaling = {
  range: { [0]: number; [1]: number };
  scale: { [0]: number; [1]: number };
}
export type ModifierScope = 'item' | 'hero';
export type ModifierType = 'flat' | 'percentual';

export type ItemOpts = {
  attack?: Record<DamageType, NumberRange>;
  scaling?: Record<AttributeType, NumberRange>;
  mutations?: AttributeMutation[];
}

export type ItemRequirements = { 
  attributes?: Partial<Record<AttributeType, number>> 
}

export type ItemConfig = {
  attack?: Partial<Record<DamageType, number>>;
  guard?: Guard;
  scaling?: ScalingBase;
  schema?: string;
  mutations?: AttributeMutation[] | string;
}
