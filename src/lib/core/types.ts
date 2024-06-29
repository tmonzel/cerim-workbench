import type { DynamicNumber } from './DynamicNumber';
import type { ComplexAttributes, ComplexDamage } from './values';

export type Maybe<T> = T | null | undefined;

export type HeroStat = {
  name: string;
} 

export type HeroStats = {
  'hp': DynamicNumber;
  'fp': DynamicNumber;
  'stamina': DynamicNumber;
  'discovery': DynamicNumber;
  'weight': DynamicNumber;
  'equipLoad': DynamicNumber;
  'attackSpeed': DynamicNumber;
  
  'res:immunity': DynamicNumber;
  'res:robustness': DynamicNumber;
  'res:focus': DynamicNumber;
  'res:vitality': DynamicNumber;
  'res:poise': DynamicNumber;
  
  'def:standard': DynamicNumber;
  'def:strike': DynamicNumber;
  'def:slash': DynamicNumber;
  'def:pierce': DynamicNumber;
  'def:hol': DynamicNumber;
  'def:lit': DynamicNumber;
  'def:fir': DynamicNumber;
  'def:mag': DynamicNumber;

  'guard:sta': DynamicNumber;
  'guard:res': DynamicNumber;
  'guard:phy': DynamicNumber;
  'guard:mag': DynamicNumber;
  'guard:fir': DynamicNumber;
  'guard:lit': DynamicNumber;
  'guard:hol': DynamicNumber;

  'damage': ComplexDamage;
  'attributes': ComplexAttributes;
};

export enum DefenseType {
  STANDARD = 'standard',
  STRIKE = 'strike',
  SLASH = 'slash',
  PIERCE = 'pierce',
  HOLY = 'hol',
  LIGHTNING = 'lit',
  FIRE = 'fir',
  MAGIC = 'mag'
}

export type HeroStatType = keyof HeroStats;

export type AttributeMutation = {
  breakpoint: number;
  grow: number;
  exp?: number;
}

export type AttributeEffect = {
  attr: AttributeType;
  affects: HeroStatType;
  mutations: AttributeMutation[];
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
  SORCERY = 'sor',
  INCANTATION = 'inc',

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

export type UpgradeSchema = {
  attack?: Record<DamageType, number[]>;
  scaling?: Record<AttributeType, number[]>;
  guard?: Record<GuardType, number[]>;
}

export type ItemDef = {
  name: string;
  type: string;
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
  modifiers?: Record<ModifierType, ItemModifierDef>;
  config?: ItemConfig;
  affinities?: Record<AffinityType, ItemConfig>;
  defaults?: string | ItemPreset;
  upgrades?: ItemUpgrade[];
}

export type ItemUpgrade = {
  iconUrl?: string;
  modifiers?: Record<ModifierType, ItemModifierDef>;
}

export type ItemPreset = {
  maxTiers?: number;
  affinities?: Record<AffinityType, ItemConfig>;
}
 
export type ItemModifierDef = Record<string, ItemModifierConfig>;
export type ItemModifierConfig = { name?: string; modify: ItemModifierValue };
export type ItemModifierValue = Record<string, number>;

export type ModifierScaling = {
  range: { [0]: number; [1]: number };
  scale: { [0]: number; [1]: number };
}

export type ModifierType = 'flat' | 'percentual';

export type ItemRequirements = { 
  attributes?: Partial<Record<AttributeType, number>> 
}

export type ItemConfig = {
  attack?: Partial<Record<DamageType, number>>;
  guard?: Guard;
  scaling?: ScalingBase;
  schema?: string;
  mutations?: AttributeMutation[] | string;
  cast?: 'sorceries' | 'incantations';
}
