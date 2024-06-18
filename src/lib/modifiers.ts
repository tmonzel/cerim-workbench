import type { DamageValue, HeroStatTypes, ResistanceValue } from '$lib/types';
import { FlatDamage, FlatResistance, type FlatModifier, type PercentualModifier } from './core';
import type { ItemModification } from './items/types';

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

export function createItemModification(id: string, tier: number = 0): ItemModification | undefined {
  const def = getModifierDef(id);

  if(!def) {
    return;
  }

  const modifier = createModifier(def, tier);

  if(!modifier) {
    return;
  }

  return {
    name: def.name,
    tier,
    scope: def.scope,
    stat: def.affects,
    modifier 
  } satisfies ItemModification;
}

export function createModifier(def: ModifierDef, tier: number = 0): PercentualModifier | FlatModifier | undefined {
  if(def.type === 'percentual') {
    return {
      type: 'multiply',
      value: def.values[tier]
    };
  } 

  if(def.affects === 'damage') {
    return {
      type: 'add',
      value: new FlatDamage([def.values[tier]])
    }
  }

  if(def.affects === 'resistance') {
    let value = new FlatResistance([def.values[tier] as ResistanceValue]);

    if(Array.isArray(def.values[tier]) && Array.isArray(def.values[tier][0])) {
      value = new FlatResistance(def.values[tier] as ResistanceValue[]);
    }

    return {
      type: 'add',
      value
    }
  }

  return {
    type: 'add',
    value: def.values[tier] as number
  }
}

/*export function createModifier(id: string, tier: number = 0): Modifier {
  const def = modifiers[id];

  return (value: DynamicValue<number | FlatDamage | FlatResistance>): void => {
    if(!def) {
      // Modifier definition missing
      return;
    }

    if(def.type === 'percentual') {
      value.multiplier += def.values[tier];
      return;
    }

    if(def.affects === 'damage' && value instanceof DynamicDamage) {
      value.added.add(new FlatDamage([def.values[tier]]));
      return;
    }

    if(def.affects === 'resistance' && value instanceof DynamicResistance) {
      if(Array.isArray(def.values[tier]) && Array.isArray(def.values[tier][0])) {
        value.added.add(new FlatResistance(def.values[tier] as ResistanceValue[]))
      } else {
        value.added.add(new FlatResistance([def.values[tier] as ResistanceValue]));
      }

      return;
    }

    if(typeof value.added === 'number') {
      value.added += def.values[tier] as number;
    }
  }
}*/
