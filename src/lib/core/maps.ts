import { AffinityType } from './types';

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
