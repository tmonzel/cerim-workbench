import type { DamageValue, HeroStatTypes } from '$lib/types';

export type ModifierScope = 'item' | 'hero';
export type ModifierType = 'flat' | 'percentual';

export type ModifierBaseDef<T = unknown> = {
  type: ModifierType;
  affects: string;
  name: string;
  scope?: ModifierScope;
  values: T[];
}

export type NumberModifierDef = {
  type: ModifierType;
  affects: Exclude<HeroStatTypes, 'damage'>;
  name: string;
  scope?: ModifierScope;
  values: number[];
}

export type DamageModifierDef = {
  type: 'flat';
  affects: 'damage';
  name: string;
  scope?: ModifierScope;
  values: DamageValue[];
}

export type ModifierDef = NumberModifierDef | DamageModifierDef;