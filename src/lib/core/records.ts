import { AffinityType, AttributeType, DamageType, DefenseType, type Affinity, type HeroStat, type HeroStatType, type ResistanceType } from './types';

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

export const damageRecord: Record<DamageType, { name: string; color: string }> = {
  [DamageType.PHYSICAL]: {
    name: "Physical",
    color: "#444",
  },

  [DamageType.FIRE]: {
    name: "Fire",
    color: "#ff9900",
  },

  [DamageType.LIGHTNING]: {
    name: "Lightning",
    color: "#ffff00",
  },

  [DamageType.HOLY]: {
    name: "Holy",
    color: "#ffcc99",
  },

  [DamageType.MAGIC]: {
    name: 'Magic',
    color: '#3fbddd'
  },

  [DamageType.FROSTBITE]: {
    name: 'Frostbite',
    color: '#999'
  },

  [DamageType.POISON]: {
    name: 'Poison',
    color: '#999'
  },

  [DamageType.HEMORRHAGE]: {
    name: 'Hemorrhage',
    color: '#999'
  },

  [DamageType.STAMINA]: {
    name: 'Stamina',
    color: '#339966'
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

export const defenseRecord: Record<DefenseType, { name: string }> = {
  [DefenseType.STANDARD]: {
    name: 'Standard'
  },
  [DefenseType.STRIKE]: {
    name: 'Strike'
  },
  [DefenseType.SLASH]: {
    name: 'Slash'
  },
  [DefenseType.PIERCE]: {
    name: 'Pierce'
  },
  [DefenseType.HOLY]: {
    name: 'Holy'
  },
  [DefenseType.LIGHTNING]: {
    name: 'Lightning'
  },
  [DefenseType.FIRE]: {
    name: 'Fire'
  },
  [DefenseType.MAGIC]: {
    name: 'Magic'
  }
}


export const affinityRecord: Record<AffinityType, Affinity> = {
  [AffinityType.STANDARD]: {
    name: 'Standard'
  },
  [AffinityType.HEAVY]: {
    name: 'Heavy'
  },
  [AffinityType.KEEN]: {
    name: 'Keen'
  },
  [AffinityType.QUALITY]: {
    name: 'Quality'
  },
  [AffinityType.FIRE]: {
    name: 'Fire'
  },
  [AffinityType.FLAME]: {
    name: 'Flame'
  },
  [AffinityType.LIGHTNING]: {
    name: 'Lightning'
  },
  [AffinityType.SACRED]: {
    name: 'Sacred'
  },
  [AffinityType.MAGIC]: {
    name: 'Magic'
  },
  [AffinityType.COLD]: {
    name: 'Cold'
  },
  [AffinityType.POISON]: {
    name: 'Poison'
  },
  [AffinityType.BLOOD]: {
    name: 'Blood'
  },
  [AffinityType.OCCULT]: {
    name: 'Occult'
  }
}
