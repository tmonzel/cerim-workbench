import { ComplexValue } from './ComplexValue';
import { AttackDamageType, AttributeType, type ResistanceType } from './types';

export class ComplexDamage extends ComplexValue<AttackDamageType> {
  constructor(value?: Partial<Record<AttackDamageType, number>>) {
    super({
      [AttackDamageType.PHYSICAL]: 0,
      [AttackDamageType.MAGIC]: 0,
      [AttackDamageType.FIRE]: 0,
      [AttackDamageType.LIGHTNING]: 0,
      [AttackDamageType.HOLY]: 0,
      [AttackDamageType.FROSTBITE]: 0,
      [AttackDamageType.POISON]: 0,
      [AttackDamageType.HEMORRHAGE]: 0,
      [AttackDamageType.STAMINA]: 0,
      ...value
    });
  }
}

export class ComplexAttributes extends ComplexValue<AttributeType> {
  constructor(value?: Partial<Record<AttributeType, number>>) {
    super({
      [AttributeType.VIGOR]: 0,
      [AttributeType.ENDURANCE]: 0,
      [AttributeType.STRENGTH]: 0,
      [AttributeType.DEXTERITY]: 0,
      [AttributeType.MIND]: 0,
      [AttributeType.INTELLIGENCE]: 0,
      [AttributeType.FAITH]: 0,
      [AttributeType.ARCANE]: 0,
      ...value
    });
  }
}

export class ComplexResistance extends ComplexValue<ResistanceType> {
  constructor(value?: Partial<Record<ResistanceType, number>>) {
    super({
      immunity: 0,
      robustness: 0,
      focus: 0,
      vitality: 0,
      poise: 0,
      ...value
    });
  }
}