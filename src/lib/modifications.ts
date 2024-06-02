import { derived, get } from 'svelte/store';
import { equipStore } from './equip/state';
import type { HeroStatTypes } from './hero';

type Modification = {
  name: string;
  type: 'percentual' | 'flat';
  stat: HeroStatTypes
}

const store: { [name: string]: Modification } = {};

export function registerModification(id: string, mod: Modification) {
  store[id] = mod;
}

export const modifications = derived(equipStore, (equip) => {
  const mods: { [id: string]: { 
    name: string;
    type: 'percentual' | 'flat';
    stat: HeroStatTypes,
    value: number;
  } } = {};

  for (const item of Object.values(equip)) {
    if (!item) {
      continue;
    }

    for (const aff of item.affixes) {
      const mod = store[aff.id];

      if(!mods[aff.id]) {
        mods[aff.id] = { ...mod, value: 0 }
      }

      mods[aff.id].value += get(aff);
    }
  }

  return mods;
});