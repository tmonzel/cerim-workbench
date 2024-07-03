import { AttackType, type AttributeMutation, type ItemPreset, type ItemSlot } from './core';
import { AffinityType, AttributeType, DamageType, type Affinity, type HeroStat, type HeroStatType, type ResistanceType } from './core';

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

export const itemSlotRecord: Record<string, ItemSlot> = {
  mainHand: {
    label: "Main Hand",
    allowedGroups: ['axes', 'bows', 'hammers', 'swords', 'daggers', 'halberds', 'staffs']
  },
  offHand: {
    label: "Offhand",
    allowedGroups: ['shields', 'seals']
  },
  head: {
    label: "Head",
    allowedGroups: ['helmets']
  },
  chest: {
    label: "Chest",
    allowedGroups: ['armors']
  },
  legs: {
    label: "Legs",
    allowedGroups: ['greaves']
  },
  hand: {
    label: "Hands",
    allowedGroups: ['gauntlets']
  },
  rune: {
    label: "Greatrune",
    allowedGroups: ['runes']
  },
  pouch: {
    label: "Pouch",
    allowedGroups: ['talismans']
  },
  pouch2: {
    label: "Pouch II",
    allowedGroups: ['talismans']
  },
  pouch3: {
    label: "Pouch III",
    allowedGroups: ['talismans']
  },
  pouch4: {
    label: "Pouch IV",
    allowedGroups: ['talismans']
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

export const statRecord: Record<HeroStatType, HeroStat> = {
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
  },
  'res:immunity': {
    name: 'Immunity'
  },
  'res:robustness': {
    name: 'Robustness'
  },
  'res:focus': {
    name: 'Focus'
  },
  'res:vitality': {
    name: 'Vitality'
  },
  'res:poise': {
    name: 'Poise'
  },
  'def:standard': {
    name: 'Physical Defense'
  },
  'def:strike': {
    name: 'Strike Defense'
  },
  'def:slash': {
    name: 'Slash Defense'
  },
  'def:pierce': {
    name: 'Pierce Defense'
  },
  'def:hol': {
    name: 'Holy Defense'
  },
  'def:lit': {
    name: 'Lightning Defense'
  },
  'def:fir': {
    name: 'Fire Defense'
  },
  'def:mag': {
    name: 'Magic Defense'
  },
  'guard:sta': {
    name: 'Stability'
  },
  'guard:res': {
    name: 'Resistance'
  },
  'guard:phy': {
    name: 'Physical Guard'
  },
  'guard:mag': {
    name: 'Magic Guard'
  },
  'guard:fir': {
    name: 'Fire Guard'
  },
  'guard:lit': {
    name: 'Lightning Guard'
  },
  'guard:hol': {
    name: 'Holy Guard'
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

export const damageTypeRecord: Record<DamageType, { name: string }> = {
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

export const affinityRecord: Record<AffinityType, Affinity> = {
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

export const equipRecord: Record<string, { name: string }> = {
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
  'great-bow': {
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
}