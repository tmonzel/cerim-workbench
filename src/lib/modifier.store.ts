import type { StatModifier } from './modifiers/StatModifier';

const modifiers: StatModifier[] = [];

export function add(mod: StatModifier): void {
  modifiers.push(mod);
}

export function getAll(): StatModifier[] {
  return modifiers;
}

export const modifierStore = {
  add,
  getAll,
}
