import { DynamicGroup } from './DynamicGroup';
import { DynamicNumber } from './DynamicNumber';
import { DamageType, AttributeType, type ResistanceType, AttackType, StatType, GuardType } from './types';

export class DynamicStats extends DynamicGroup<StatType> {
  constructor(value?: Partial<Record<StatType, number>>) {
    super({
      hp: new DynamicNumber(value?.hp),
      fp: new DynamicNumber(value?.fp),
      stamina: new DynamicNumber(value?.stamina),
      discovery: new DynamicNumber(value?.discovery),
      weight: new DynamicNumber(value?.weight),
      equipLoad: new DynamicNumber(value?.equipLoad),
      attackSpeed: new DynamicNumber(value?.attackSpeed),
    });
  }
}

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
  constructor(value?: Partial<Record<ResistanceType, number>>) {
    super({
      immunity: new DynamicNumber(value?.immunity),
      robustness: new DynamicNumber(value?.robustness),
      focus: new DynamicNumber(value?.focus),
      vitality: new DynamicNumber(value?.vitality),
      poise: new DynamicNumber(value?.poise),
    });
  }
}

export class DynamicDefense extends DynamicGroup<DamageType> {
  constructor(value?: Partial<Record<DamageType, number>>) {
    super({
      [DamageType.STANDARD]: new DynamicNumber(value?.standard),
      [DamageType.STRIKE]: new DynamicNumber(value?.strike),
      [DamageType.SLASH]: new DynamicNumber(value?.slash),
      [DamageType.PIERCE]: new DynamicNumber(value?.pierce),
      [DamageType.MAGIC]: new DynamicNumber(value?.mag),
      [DamageType.HOLY]: new DynamicNumber(value?.hol),
      [DamageType.LIGHTNING]: new DynamicNumber(value?.lit),
      [DamageType.FIRE]: new DynamicNumber(value?.fir)
    });
  }
}

export class DynamicGuard extends DynamicGroup<GuardType> {
  constructor(value?: Partial<Record<GuardType, number>>) {
    super({
      phy: new DynamicNumber(value?.phy),
      fir: new DynamicNumber(value?.fir),
      hol: new DynamicNumber(value?.hol),
      lit: new DynamicNumber(value?.lit),
      mag: new DynamicNumber(value?.mag),
      res: new DynamicNumber(value?.res),
      sta: new DynamicNumber(value?.sta),
    });
  }
}
