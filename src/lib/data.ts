import { appState, type SlotState } from './state';
import { attributeStore, slotStore } from './stores';
import { mutationRecord, presetRecord } from './records';
import { AffinityType, AttributeType, StatusEffectType, type AttackCorrect, type AttributeEffect, type AttributeMutation, type UpgradeSchema } from './core/types';
import { type ItemData, type ItemPreset } from './item/types';
import { AccessoryItem, AttackItem, itemStore, ProtectionItem, type ItemState } from './item';
import { writable } from 'svelte/store';

export type DataSchema = {
  maxLevel: number;
  attributePointsPerLevel: number;
  
  defaults?: DataDefaults;

  items?: {
    weapons: Record<string, ItemData>,
    armors: Record<string, ItemData>,
    accessories: Record<string, ItemData>
  };

  effects?: AttributeEffect[];
  upgradeSchemata?: Record<string, UpgradeSchema>; 
  presets?: Record<string, ItemPreset>;
  mutations?: Record<string, AttributeMutation[]>;
  attackCorrect?: Record<string, AttackCorrect>;
  spEffects?: Record<number, Partial<Record<StatusEffectType, number>>>;
}

export type DataDefaults = {
  attributes?: Record<AttributeType, number>;
  equip?: SlotState;
  itemModifications?: Record<string, { tier?: number; affinity?: AffinityType; }>;
}

export const attackCorrectRecord: Record<string, AttackCorrect> = {};
export const upgradeSchemata: Record<string, UpgradeSchema> = {};
export const spEffectsMap = new Map<number, Partial<Record<StatusEffectType, number>>>();
export const dataStore = writable<DataSchema | null>(null);

export function loadData(data: DataSchema) {
  if(data.mutations) {
    for(const name in data.mutations) {
      mutationRecord[name] = data.mutations[name];
    }
  }

  if(data.upgradeSchemata) {
    for(const name in data.upgradeSchemata) {
      upgradeSchemata[name] = data.upgradeSchemata[name];
    }
  }

  if(data.attackCorrect) {
    for(const key in data.attackCorrect) {
      attackCorrectRecord[key] = data.attackCorrect[key];
    }
  }

  if(data.presets) {
    for(const name in data.presets) {
      presetRecord[name] = data.presets[name];
    }
  }

  if(data.spEffects) {
    for(const id in data.spEffects) {
      spEffectsMap.set(Number(id), data.spEffects[id]);
    }
  }

  // Resolve item data
  if(data.items) {
    const items: ItemState = {};

    for(const id in data.items.weapons) {
      items[id] = new AttackItem(id, data.items.weapons[id]);
    }

    for(const id in data.items.armors) {
      items[id] = new ProtectionItem(id, data.items.armors[id]);
    }

    for(const id in data.items.accessories) {
      items[id] = new AccessoryItem(id, data.items.accessories[id]);
    }

    itemStore.set(items);
  }
  
  appState.set({
    maxLevel: data.maxLevel,
    attributePointsPerLevel: data.attributePointsPerLevel,
    effects: data.effects ?? []
  });
  
  // Apply attribute defaults
  attributeStore.update(state => {
    if(!data.defaults || !data.defaults.attributes) {
      return { ...state };
    }

    for(const t of Object.values(AttributeType)) {
      if(!data.defaults.attributes[t]) {
        continue;
      }

      state[t] = data.defaults.attributes[t];
    }

    return { ...state };
  });

  // Apply slot defaults
  slotStore.update(state => {
    if(!data.defaults || !data.defaults.equip) {
      return { ...state };
    }

    return { ...state, ...data.defaults.equip };
  });

  // Apply item defaults
  itemStore.update(store => {
    if(!data.defaults || !data.defaults.itemModifications) {
      return { ...store };
    }

    for(const [id, mod] of Object.entries(data.defaults.itemModifications)) {
      const item = store[id];

      if(item && mod.tier && mod.tier > 0) {
        item.upgrade(mod.tier);
      }
      
      if(item instanceof AttackItem && mod.affinity && mod.affinity !== AffinityType.STANDARD) {
        item.changeAffinity(mod.affinity);
      }
    }

    return { ...store };
  });
  
  dataStore.set(data);
}
