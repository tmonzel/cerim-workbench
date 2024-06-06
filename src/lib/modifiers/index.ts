import type { ModifierDef } from './types';
export * from './types';

const modifiers: Record<string, ModifierDef> = {};

export function registerModifier(id: string, def: ModifierDef): void {
  modifiers[id] = def;
}

export function getModifierDef(id: string): ModifierDef | undefined {
  return modifiers[id];
}
