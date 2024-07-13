import { AffinityType, AttackType, AttributeType, DamageType, StatType, type Affinity, type AttributeMutation, type ResistanceType, type Stat } from './core/types';
import type { ItemPreset } from './item/types';

export const mutationRecord: Record<string, AttributeMutation[]> = {};
export const presetRecord: Record<string, ItemPreset> = {};

export const attributeRecord: Record<AttributeType, { name: string; color: string }> = {
  [AttributeType.VIGOR]: {
    name: "Vigor",
    color: "#4ade80",
  },

  [AttributeType.ENDURANCE]: {
    name: "Endurance",
    color: "#fbbf24",
  },

  [AttributeType.STRENGTH]: {
    name: "Strength",
    color: "#f87171",
  },

  [AttributeType.DEXTERITY]: {
    name: "Dexterity",
    color: "#f0abfc",
  },
  
  [AttributeType.MIND]: {
    name: "Mind",
    color: "#db2777",
  },

  [AttributeType.INTELLIGENCE]: {
    name: "Intelligence",
    color: "#67e8f9",
  },

  [AttributeType.FAITH]: {
    name: "Faith",
    color: "#bef264",
  },

  [AttributeType.ARCANE]: {
    name: "Arcane",
    color: "#f3e8ff",
  }
}

export const attackTypeRecord: Record<AttackType, { name: string; color: string }> = {
  [AttackType.PHYSICAL]: {
    name: "Physical",
    color: "#444",
  },

  [AttackType.FIRE]: {
    name: "Fire",
    color: "#ff9900",
  },

  [AttackType.LIGHTNING]: {
    name: "Lightning",
    color: "#ffff00",
  },

  [AttackType.HOLY]: {
    name: "Holy",
    color: "#ffcc99",
  },

  [AttackType.MAGIC]: {
    name: 'Magic',
    color: '#3fbddd'
  },

  [AttackType.STAMINA]: {
    name: 'Stamina',
    color: '#339966'
  },
  [AttackType.SORCERY]: {
    name: 'Sorcery',
    color: '#c084fc'
  },
  [AttackType.INCANTATION]: {
    name: 'Incantation',
    color: '#c084fc'
  }
}

export const statRecord: Record<StatType, Stat> = {
  hp: {
    name: 'Health'
  },
  fp: {
    name: 'FP'
  },
  stamina: {
    name: 'Stamina'
  },
  discovery: {
    name: 'Discovery'
  },
  weight: {
    name: 'Weight'
  },
  equipLoad: {
    name: 'Equip Load'
  },
  attackSpeed: {
    name: 'Attack Speed'
  }
}

export const resistanceRecord: Record<ResistanceType, { name: string }> = {
  immunity: {
    name: 'Immunity'
  },
  robustness: {
    name: 'Robustness'
  },
  focus: {
    name: 'Focus'
  },
  vitality: {
    name: 'Vitality'
  },
  poise: {
    name: 'Poise'
  }
}

export const damageTypeRecord: Record<string, { name: string }> = {
  [DamageType.STANDARD]: {
    name: 'Standard'
  },
  [DamageType.STRIKE]: {
    name: 'Strike'
  },
  [DamageType.SLASH]: {
    name: 'Slash'
  },
  [DamageType.PIERCE]: {
    name: 'Pierce'
  },
  [DamageType.HOLY]: {
    name: 'Holy'
  },
  [DamageType.LIGHTNING]: {
    name: 'Lightning'
  },
  [DamageType.FIRE]: {
    name: 'Fire'
  },
  [DamageType.MAGIC]: {
    name: 'Magic'
  }
}

export const affinityRecord: Record<string, Affinity> = {
  [AffinityType.STANDARD]: {
    name: 'Standard',
    schema: '0' 
  },
  [AffinityType.HEAVY]: {
    name: 'Heavy',
    schema: '100' 
  },
  [AffinityType.KEEN]: {
    name: 'Keen',
    schema: '200' 
  },
  [AffinityType.QUALITY]: {
    name: 'Quality',
    schema: '300' 
  },
  [AffinityType.FIRE]: {
    name: 'Fire',
    schema: '400' 
  },
  [AffinityType.FLAME]: {
    name: 'Flame',
    schema: '500' 
  },
  [AffinityType.LIGHTNING]: {
    name: 'Lightning',
    schema: '600' 
  },
  [AffinityType.SACRED]: {
    name: 'Sacred',
    schema: '700' 
  },
  [AffinityType.MAGIC]: {
    name: 'Magic',
    schema: '800' 
  },
  [AffinityType.COLD]: {
    name: 'Cold',
    schema: '900' 
  },
  [AffinityType.POISON]: {
    name: 'Poison',
    schema: '1000' 
  },
  [AffinityType.BLOOD]: {
    name: 'Blood',
    schema: '1100' 
  },
  [AffinityType.OCCULT]: {
    name: 'Occult',
    schema: '1200' 
  }
}

export const itemTypeRecord: Record<string, { name: string }> = {
  'talisman': {
    name: 'Talisman'
  },
  'rune': {
    name: 'Great Rune'
  },
  'dagger': {
    name: 'Dagger'
  },
  'straight-sword': {
    name: 'Straight Sword'
  },
  'greatsword': {
    name: 'Greatsword'
  },
  'colossal-sword': {
    name: 'Colossal Sword'
  },
  'thrusting-sword': {
    name: 'Thrusting Sword'
  },
  'heavy-thrusting-sword': {
    name: 'Heavy Thrusting Sword'
  },
  'curved-sword': {
    name: 'Curved Sword'
  },
  'curved-greatsword': {
    name: 'Curved Greatsword'
  },
  'katana': {
    name: 'Katana'
  },
  'twinblade': {
    name: 'Twinblade'
  },
  'axe': {
    name: 'Axe'
  },
  'great-axe': {
    name: 'Greataxe'
  },
  'hammer': {
    name: 'Hammer'
  },
  'flail': {
    name: 'Flail'
  },
  'great-hammer': {
    name: 'Great Hammer'
  },
  'colossal-weapon': {
    name: 'Colossal Weapon'
  },
  'spear': {
    name: 'Spear'
  },
  'great-spear': {
    name: 'Great Spear'
  },
  'halberd': {
    name: 'Halberd'
  },
  'reaper': {
    name: 'Reaper'
  },
  'whip': {
    name: 'Whip'
  },
  'fist': {
    name: 'Fist'
  },
  'claw': {
    name: 'Claw'
  },
  'light-bow': {
    name: 'Light Bow'
  },
  'bow': {
    name: 'Bow'
  },
  'greatbow': {
    name: 'Greatbow'
  },
  'crossbow': {
    name: 'Crossbow'
  },
  'ballista': {
    name: 'Ballista'
  },
  'glintstone-staff': {
    name: 'Glintstone Staff'
  },
  'sacred-seal': {
    name: 'Sacred Seal'
  },
  'throwing-blade': {
    name: 'Throwing Blade'
  },
  'perfume-bottle': {
    name: 'Perfume Bottle'
  },
  'torch': {
    name: 'Torch'
  },
  'hand-to-hand': {
    name: 'Hand-To-Hand Arts'
  },
  'beast-claw': {
    name: 'Beast Claw'
  },
  'light-greatsword': {
    name: 'Light Greatsword'
  },
  'great-katana': {
    name: 'Great Katana'
  },
  'backhand-blade': {
    name: 'Backhand Blade'
  },

  // Armor
  'helm': {
    name: 'Helm'
  },
  'armor': {
    name: 'Chest Armor'
  },
  'gauntlet': {
    name: 'Gauntlet'
  },
  'leg': {
    name: 'Leg Armor'
  },

  // Shields
  'small-shield': {
    name: 'Small Shield'
  },
  'shield': {
    name: 'Medium Shield'
  },
  'greatshield': {
    name: 'Greatshield'
  },
  'thrusting-shield': {
    name: 'Thrusting Shield'
  },
}

export const itemGroupRecord: Record<string, { name: string }> = {
  'daggers': {
    name: 'Daggers'
  },
  'swords': {
    name: 'Swords'
  },
  'axes': {
    name: 'Axes'
  },
  'hammers': {
    name: 'Hammers'
  },
  'colossal-weapons': {
    name: 'Colossal Weapons'
  },
  'flails': {
    name: 'Flails'
  },
  'spears': {
    name: 'Daggers'
  },
  'halberds': {
    name: 'Halberds'
  },
  'reapers': {
    name: 'Reapers'
  },
  'whips': {
    name: 'Whips'
  },
  'fists': {
    name: 'Fists'
  },
  'shields': {
    name: 'Shields'
  },
  'claws': {
    name: 'Claws'
  },
  'torches': {
    name: 'Torches'
  },
  'staffs': {
    name: 'Staffs'
  },
  'seals': {
    name: 'Seals'
  },
  'bows': {
    name: 'Bows'
  },
  'hand-to-hands': {
    name: 'Hand to hands'
  },
  'bottles': {
    name: 'Bottles'
  },

  'armors': {
    name: 'Armors'
  },
  'helmets': {
    name: 'Helmets'
  },
  'legs': {
    name: 'Legs'
  },
  'gauntlets': {
    name: 'Gauntlets'
  },

  'talismans': {
    name: 'Talismans'
  },

  'runes': {
    name: 'Runes'
  },
}