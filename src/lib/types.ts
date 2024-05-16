export type Hero = {
  endurance: number;
  vitality: number;
  strength: number;
  dexterity: number;
}

export type DataSchema = {
  masteries: Mastery[];
  items: Item[];
}

export type Item = {
  tier: number;
  name: string;
  type: string;
  group: string;
  tags: string[];
  weight: number;
  armor?: number;
  damage?: number[];
  attackSpeed?: number;
  modifiers: ItemModifier[];
  description?: string;
  requiredLevel: number;
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
  value: number;
  affectedGroups: string[];
}

export type Gear = {
  head: Item | null;
  chest: Item | null;
  legs: Item | null;
  hand: Item | null;
  feet: Item | null;
  mainHand: Item | null;
  offHand: Item | null;
}