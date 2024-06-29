import { ComplexValue } from './ComplexValue';
import { DynamicNumber } from './DynamicNumber';
import { DamageType, AttributeType, type ResistanceType } from './types';

export class ComplexDamage extends ComplexValue<DamageType> {
  constructor(value?: Partial<Record<DamageType, DynamicNumber>>) {
    super({
      [DamageType.PHYSICAL]: new DynamicNumber(),
      [DamageType.MAGIC]: new DynamicNumber(),
      [DamageType.FIRE]: new DynamicNumber(),
      [DamageType.LIGHTNING]: new DynamicNumber(),
      [DamageType.HOLY]: new DynamicNumber(),
      [DamageType.FROSTBITE]: new DynamicNumber(),
      [DamageType.POISON]: new DynamicNumber(),
      [DamageType.HEMORRHAGE]: new DynamicNumber(),
      [DamageType.STAMINA]: new DynamicNumber(),
      [DamageType.SORCERY]: new DynamicNumber(),
      [DamageType.INCANTATION]: new DynamicNumber(),
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