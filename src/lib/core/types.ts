import type { FlatDamage } from './values/FlatDamage';
import type { FlatResistance } from './values/FlatResistance';

export type Mutation = {
  from: { [0]: number; [1]: number };
  to: { [0]: number; [1]: number };
}

export type Maybe<T> = T | null | undefined;

export type DynamicValue<T = number | FlatDamage | FlatResistance> = {
  base: T;
  added: T;
  multiplier: number;

  hasAdded(): boolean;
  isModified(): boolean;
  getValue(): T;
}

export type Stat<T = number> = {
  label: string;
  value: DynamicValue<T>;
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

export type Attribute = {
  name: string;
  color: string;
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
  LIGHTNING = 'lightning',
  SACRED = 'sacred',
  COLD = 'cold',
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
