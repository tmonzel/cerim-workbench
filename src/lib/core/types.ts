export type Maybe<T> = T | null | undefined;

export type Stat = {
  name: string;
} 

export enum StatType {
  HEALTH = 'hp',
  FOCUS_POINTS = 'fp',
  STAMINA = 'stamina',
  DISCOVERY = 'discovery',
  WEIGHT = 'weight',
  EQUIP_LOAD = 'equipLoad',
  ATTACK_SPEED = 'attackSpeed'
}

export enum DamageType {
  STANDARD = 'standard',
  STRIKE = 'strike',
  SLASH = 'slash',
  PIERCE = 'pierce',
  HOLY = 'hol',
  LIGHTNING = 'lit',
  FIRE = 'fir',
  MAGIC = 'mag'
}

export type GraphMutation = {
  breakpoint: number;
  grow: number;
  exp?: number;
}

export type AttributeEffect = {
  attr: AttributeType;
  mutate: Record<string, Partial<Record<string, GraphMutation[]>>>;
}

export type AttributeDamageScaling = Partial<Record<AttributeType, { base: number, allowedDamageTypes: AttackType[] }>>;

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

export enum AttackType {
  PHYSICAL = 'phy',
  MAGIC = 'mag',
  FIRE = 'fir',
  LIGHTNING = 'lit',
  HOLY = 'hol',
  STAMINA = 'sta',
  SORCERY = 'sor',
  INCANTATION = 'inc',
}

export enum StatusEffectType {
  FROSTBITE = 'frb',
  POISON = 'poi',
  HEMORRHAGE = 'hem',
  SLEEP = 'slp',
  ROT = 'rot',
  DEATH = 'dth',
  MADNESS = 'mad'
}

export type ResistanceType = 'immunity' | 'robustness' | 'focus' | 'vitality' | 'poise'; 

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

export type Affinity = {
  name: string;
  schema: string;
}

export type Resistance = Record<ResistanceType, number>;
export type Guard = Record<GuardType, number>;
export type Defense = Record<DamageType, number>;
export type DamageNegation = Record<DamageType, number>;
export type Attack = Partial<Record<AttackType, number>>;

export type BaseScalingValue = { [0]: number; [1]: string | string[] } | number;
export type ScalingBase = Partial<Record<AttributeType, BaseScalingValue>>;

export type AttackCorrect = Record<Exclude<AttributeType, 'vig' | 'mnd' | 'end'>, AttackType[]>;

export type UpgradeSchema = {
  tiers: number;
  attack: Record<string, number[]>;
  scaling: Record<string, number[]>;
  guard: Record<GuardType, number[]>;
}

export type EquipSlot = {
  label: string;
  allowedGroups: string[];
}


