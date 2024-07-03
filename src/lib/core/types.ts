export type Maybe<T> = T | null | undefined;

export type HeroStat = {
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

export type AttributeMutation = {
  breakpoint: number;
  grow: number;
  exp?: number;
}

export type AttributeEffect = {
  attr: AttributeType;
  mutate: Record<string, Partial<Record<string, AttributeMutation[]>>>;
  affects: string;
  mutations: AttributeMutation[];
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
  schema: string;
}

export type Resistance = Record<ResistanceType, number>;
export type Guard = Record<GuardType, number>;
export type Defense = Record<DamageType, number>;
export type Attack = Partial<Record<AttackType, number>>;

export type BaseScalingValue = { [0]: number; [1]: string | string[] } | number;
export type ScalingBase = Partial<Record<AttributeType, BaseScalingValue>>;

export type UpgradeSchema = {
  attack?: Record<AttackType, number[]>;
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
  attackInfo?: ItemAttackInfo;
}

export type ItemAttackInfo = {
  damage?: DamageType[];
  crit?: number;
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
  attack?: Partial<Record<AttackType, number>>;
  guard?: Guard;
  scaling?: ScalingBase;
  schema?: string;
  mutations?: AttributeMutation[] | string;
  cast?: 'sorceries' | 'incantations';
  apply?: Partial<Record<StatusEffectType, number[]>>;
}

export type ItemSlot = {
  label: string;
  allowedGroups: string[];
} 
