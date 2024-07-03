import { DynamicGroup } from './DynamicGroup';
import { DynamicNumber } from './DynamicNumber';
import { DamageType, AttributeType, type ResistanceType, AttackType } from './types';

export class DynamicAttack extends DynamicGroup<AttackType> {
  constructor(value?: Partial<Record<DamageType, DynamicNumber>>) {
    super({
      [AttackType.PHYSICAL]: new DynamicNumber(),
      [AttackType.MAGIC]: new DynamicNumber(),
      [AttackType.FIRE]: new DynamicNumber(),
      [AttackType.LIGHTNING]: new DynamicNumber(),
      [AttackType.HOLY]: new DynamicNumber(),
      [AttackType.STAMINA]: new DynamicNumber(),
      [AttackType.SORCERY]: new DynamicNumber(),
      [AttackType.INCANTATION]: new DynamicNumber(),
      ...value
    });
  }
}

export class DynamicAttributes extends DynamicGroup<AttributeType> {
  constructor(value?: Partial<Record<AttributeType, number>>) {
    super({
      [AttributeType.VIGOR]: new DynamicNumber(value?.vig),
      [AttributeType.ENDURANCE]: new DynamicNumber(value?.end),
      [AttributeType.STRENGTH]: new DynamicNumber(value?.str),
      [AttributeType.DEXTERITY]: new DynamicNumber(value?.dex),
      [AttributeType.MIND]: new DynamicNumber(value?.mnd),
      [AttributeType.INTELLIGENCE]: new DynamicNumber(value?.int),
      [AttributeType.FAITH]: new DynamicNumber(value?.fth),
      [AttributeType.ARCANE]: new DynamicNumber(value?.arc),
    });
  }
}

export class DynamicResistance extends DynamicGroup<ResistanceType> {
  constructor(value?: Partial<Record<ResistanceType, DynamicNumber>>) {
    super({
      immunity: new DynamicNumber(),
      robustness: new DynamicNumber(),
      focus: new DynamicNumber(),
      vitality: new DynamicNumber(),
      poise: new DynamicNumber(),
      ...value
    });
  }
}