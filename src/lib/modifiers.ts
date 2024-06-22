import type { ModifierDef } from '$lib/types';

const modifiers: Record<string, ModifierDef> = {};

export function registerModifier(id: string, def: ModifierDef): void {
  modifiers[id] = def;
}

export function getModifierDef(id: string): ModifierDef | undefined {
  return modifiers[id];
}
