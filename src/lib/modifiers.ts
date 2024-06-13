import type { DamageValue, HeroStatTypes, ResistanceValue } from '$lib/types';

export type ModifierScope = 'item' | 'hero';
export type ModifierType = 'flat' | 'percentual';

export type NumberModifierDef = {
  type: ModifierType;
  affects: Exclude<HeroStatTypes, 'damage' | 'resistance'>;
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

export type ResistanceModifierDef = {
  type: 'flat';
  affects: 'resistance';
  name: string;
  scope?: ModifierScope;
  values: ResistanceValue[] | (ResistanceValue[])[];
}

export type ModifierDef = NumberModifierDef | DamageModifierDef | ResistanceModifierDef;

const modifiers: Record<string, ModifierDef> = {};

export function registerModifier(id: string, def: ModifierDef): void {
  modifiers[id] = def;
}

export function getModifierDef(id: string): ModifierDef | undefined {
  return modifiers[id];
}
