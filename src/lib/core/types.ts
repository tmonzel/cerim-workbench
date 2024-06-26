import type { AttributeStat } from './AttributeStat';
import type { DamageStat } from './DamageStat';
import type { NumericStat } from './NumericStat';

export type Mutation = {
  from: { [0]: number; [1]: number };
  to: { [0]: number; [1]: number };
}

export type Maybe<T> = T | null | undefined;

export type Stat<T = number> = {
  name: string;
  base: T;
  added: T;
  multiplier: number;

  hasAdded(): boolean;
  isModified(): boolean;
  getValue(): T;
}

export type DamageValue = { [0]: number; [1]: number; [2]: number } | number;
export type ResistanceValue = { [0]: number; [1]: number; };
export type AttributeValue = {
  [0]: number;
  [1]: AttributeType;
}

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
  'def:strike': NumericStat;
  'def:slash': NumericStat;
  'def:pierce': NumericStat;
  'def:phy': NumericStat;
  'def:hol': NumericStat;
  'def:lit': NumericStat;
  'def:fir': NumericStat;
  'def:mag': NumericStat;
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

export enum AttackDamageType {
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

export enum DamageNegationType {
  PHYSICAL = 'physical',
  STRIKE = 'strike',
  SLASH = 'slash',
  PIERCE = 'pierce',
  ELEMENTAL = 'elemental'
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

export type Resistance = {
  immunity: number;
  robustness: number;
  focus: number;
  vitality: number;
  poise: number;
}

export type DamageNegation = {
  attack: AttackDamageNegation;
  elemental: ElementalDamageNegation;
}

export type AttackDamageNegation = {
  strike: number;
  slash: number;
  pierce: number;
}

export type ElementalDamageNegation = {
  [AttackDamageType.PHYSICAL]: number;
  [AttackDamageType.MAGIC]: number; 
  [AttackDamageType.FIRE]: number;
  [AttackDamageType.LIGHTNING]: number; 
  [AttackDamageType.HOLY]: number;
}

export type BaseScalingValue = { [0]: number; [1]: string | string[] } | number;
export type AttackBase = Partial<Record<AttackDamageType, number>>;
export type ScalingBase = Partial<Record<AttributeType, BaseScalingValue>>;
export type Guard = Record<string, NumberRange>;
export type NumberRange = { [0]: number, [1]: number };
export type ItemType = 'weapon' | 'armor' | 'talisman';

export type ItemDef = {
  name: string;
  type: ItemType;
  caption: string;
  group: string;
  tags: string[];
  poise?: number;
  weight?: number;
  armor?: number;
  tiers?: number;
  tier?: number;
  attackSpeed?: number;
  description?: string;
  requirements: ItemRequirements;
  resistance?: Resistance,
  damageNegation?: DamageNegation;
  affinity?: AffinityType;
  iconUrl?: string;
  effects?: string[];
  modifiers?: ItemModifier[];
  config: ItemConfig | string;
  upgrades?: Record<AffinityType, ItemUpgrade>;
}
 
export type ItemModifier = {
  type?: ModifierType;
  name: string;
  affects: AffectedStat;
  scope: ModifierScope;
  value: number | AttributeValue[];
}

export type ModifierScaling = {
  range: { [0]: number; [1]: number };
  scale: { [0]: number; [1]: number };
}
export type ModifierScope = 'item' | 'hero';
export type ModifierType = 'flat' | 'percentual';

export type ItemConfig = {
  attack?: Record<AttackDamageType, NumberRange>;
  scaling?: Record<AttributeType, NumberRange>;
  mutations?: AttributeMutation[];
}

export type UpgradeSchema = {
  attack?: Record<AttackDamageType, NumberRange>;
  scaling?: Record<AttributeType, number[]>;
}

export type ItemRequirements = { 
  attributes?: Partial<Record<AttributeType, number>> 
}

export type ItemUpgrade = {
  attack?: AttackBase;
  guard?: Guard;
  scaling?: ScalingBase;
  schema?: string;
}
