import { AffinityType, AttributeType, DamageType } from './types';

export const AFFINITY_NAME_MAP: Record<AffinityType, string> = {
  [AffinityType.STANDARD]: 'Standard',
  [AffinityType.HEAVY]: 'Heavy',
  [AffinityType.KEEN]: 'Keen',
  [AffinityType.QUALITY]: 'Quality',
  [AffinityType.FIRE]: 'Fire',
  [AffinityType.LIGHTNING]: 'Lightning',
  [AffinityType.SACRED]: 'Sacred',
  [AffinityType.COLD]: 'Cold',
  [AffinityType.FLAME]: 'Flame',
  [AffinityType.MAGIC]: 'Magic',
  [AffinityType.POISON]: 'Poison',
  [AffinityType.BLOOD]: 'Blood',
  [AffinityType.OCCULT]: 'Occult'
}

export const DAMAGE_TYPE_COLOR_MAP: Record<DamageType, string> = {
  [DamageType.PHYSICAL]: 'var(--damage-phy)',
  [DamageType.MAGIC]: 'var(--damage-mag)',
  [DamageType.FIRE]: 'var(--damage-fir)',
  [DamageType.LIGHTNING]: 'var(--damage-lit)',
  [DamageType.HOLY]: 'var(--damage-hol)',
  [DamageType.FROSTBITE]: 'cyan',
  [DamageType.POISON]: 'green',
  [DamageType.HEMORRHAGE]: 'red',
  [DamageType.STAMINA]: 'var(--damage-sta)'
}

export const ATTRIBUTE_TYPE_COLOR_MAP: Record<AttributeType, string> = {
  [AttributeType.VIGOR]: 'var(--attr-vig)',
  [AttributeType.ENDURANCE]: 'var(--attr-end)',
  [AttributeType.STRENGTH]: 'var(--attr-str)',
  [AttributeType.DEXTERITY]: 'var(--attr-dex)',
  [AttributeType.MIND]: 'var(--attr-mnd)',
  [AttributeType.INTELLIGENCE]: 'var(--attr-int)',
  [AttributeType.FAITH]: 'var(--attr-fth)',
  [AttributeType.ARCANE]: 'var(--attr-arc)'
}
