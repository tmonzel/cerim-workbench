import { derived, get } from 'svelte/store';
import { equipStore } from './equip/state';

type Modification = {
  name: string;
  type: string;
}

const store: { [name: string]: Modification } = {
    
}

export function registerModification(id: string, name: string, type: string) {
  store[id] = {
    name,
    type
  }
}

export const modifications = derived(equipStore, (equip) => {
  const mods: { [id: string]: { name: string; type: string; value: number } } = {};

  for (const item of Object.values(equip)) {
    if (!item) {
      continue;
    }

    for (const aff of item.affixes) {
      const mod = store[aff.id];

      if(!mods[aff.id]) {
        mods[aff.id] = { name: mod.name, type: mod.type, value: 0 }
      }

      mods[aff.id].value += get(aff);
    }
  }

  return mods;
});