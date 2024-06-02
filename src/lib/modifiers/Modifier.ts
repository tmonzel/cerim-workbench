import type { AttributeState } from '$lib/attribute.store';
import type { ModifierDef } from '$lib/types';

export abstract class Modifier<T = unknown> {
  readonly attributeName: string;
  readonly affectedStat: string;

  constructor(
    protected def: ModifierDef
  ) {
    this.attributeName = def.attr;
    this.affectedStat = def.affects;
  }

  abstract modify(attributes: AttributeState, value: T): void;
}