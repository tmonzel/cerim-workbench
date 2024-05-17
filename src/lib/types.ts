export type DataSchema = {
  maxLevel: number;

  attributePointsPerLevel: number;
  masteryPointsPerLevel: number;

  attributes: { [name: string]: AttributeSchema };

  masteries: Mastery[];
  baseItems: { [id: string]: BaseItem };
  items: Item[];
}

export type AttributeSchema = {
  name: string;
  initialValue: number;
  modifiers: StatModifier[];
}

export type AttributeState = { [name: string]: number }

export type StatValues = {
  [name: string]: number | number[];
  dps: number[];
  attackSpeed: number;
  health: number;
  armor: number;
  damage: number[];
  weight: number;
  poise: number;
  equipLoad: number;
  stamina: number;
}

export type BaseItem = {
  name: string;
  type: string;
  group: string;
  tags: string[];
  poise?: number;
  weight: number;
  armor?: number;
  damage?: number[];
  attackSpeed?: number;
  description?: string;
  requiredLevel: number;
  scaling?: ItemScaling[];
}

export type Item = {
  base: BaseItem;
  name: string;
  tier: number;
  modifiers: ItemModifier[];
  damage?: number[];
}


export type ItemScaling = {
  attr: string;
  span?: number[];
  rate?: number;
}

export type ItemModifier = {
  tier: number;
  stat: string;
  type: string;
  value: number;
}

export type Mastery = {
  name: string;
  tiers: MasteryTier[];
  description: string;
}

export type MasteryTier = {
  name: string;
  modifiers: StatModifier[];
}

export type StatModifier = {
  property: string;
  type: string;
  scale?: string;
  span?: number[];
  rate?: number;
  value: number;
  affectedGroups: string[];
}

export type EquipState = {
  head: Item | null;
  chest: Item | null;
  legs: Item | null;
  hand: Item | null;
  feet: Item | null;
  mainHand: Item | null;
  offHand: Item | null;
}