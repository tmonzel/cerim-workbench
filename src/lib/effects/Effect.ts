import type { AttributeState } from '$lib/state';
import type { DamageEffectDef, EffectDef } from './types';

export abstract class Effect<T = unknown> {
  readonly attributeName: string;
  readonly affectedStat: string;

  constructor(
    protected def: EffectDef | DamageEffectDef
  ) {
    this.attributeName = def.attr;
    this.affectedStat = def.affects;
  }

  abstract apply(attributes: AttributeState, value: T): void;
}