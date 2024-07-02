import { ComplexValue } from './ComplexValue';
import { DynamicNumber } from './DynamicNumber';
import { DamageType, AttributeType, type ResistanceType, AttackType } from './types';

export class ComplexDamage extends ComplexValue<AttackType> {
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

export class ComplexAttributes extends ComplexValue<AttributeType> {
  constructor(value?: Partial<Record<AttributeType, DynamicNumber>>) {
    super({
      [AttributeType.VIGOR]: new DynamicNumber(),
      [AttributeType.ENDURANCE]: new DynamicNumber(),
      [AttributeType.STRENGTH]: new DynamicNumber(),
      [AttributeType.DEXTERITY]: new DynamicNumber(),
      [AttributeType.MIND]: new DynamicNumber(),
      [AttributeType.INTELLIGENCE]: new DynamicNumber(),
      [AttributeType.FAITH]: new DynamicNumber(),
      [AttributeType.ARCANE]: new DynamicNumber(),
      ...value
    });
  }
}

export class ComplexResistance extends ComplexValue<ResistanceType> {
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