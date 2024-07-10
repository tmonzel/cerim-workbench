import { appState, type SlotState } from './state';
import { attributeStore, slotStore } from './stores';
import { mutationRecord, presetRecord } from './records';
import { AttributeType, StatusEffectType, type AttackCorrect, type AttributeEffect, type AttributeMutation, type UpgradeSchema } from './core/types';
import { ItemCategory, type ItemData, type ItemPreset } from './item/types';
import { Item, itemStore, type ItemState } from './item';
import { writable } from 'svelte/store';

export type DataSchema = {
  maxLevel: number;
  attributePointsPerLevel: number;
  
  defaults?: {
    attributes?: Record<AttributeType, number>;
    equip?: Record<keyof SlotState, string>;
  };

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

  // Resolve items
  if(data.items) {
    const items: ItemState = {
      weapons: {},
      helmets: {},
      armors: {},
      legs: {},
      gauntlets: {},
      runes: {},
      talismans: {}
    };

    for(const id in data.items.weapons) {
      items.weapons[id] = new Item(id, data.items.weapons[id]);
    }

    for(const id in data.items.armors) {
      const def = data.items.armors[id];
      switch(def.category) {
        case ItemCategory.HEAD:
          items.helmets[id] = new Item(id, data.items.armors[id]);
          break;
        case ItemCategory.BODY:
          items.armors[id] = new Item(id, data.items.armors[id]);
          break;
        case ItemCategory.LEGS:
          items.legs[id] = new Item(id, data.items.armors[id]);
          break;
        case ItemCategory.ARMS:
          items.gauntlets[id] = new Item(id, data.items.armors[id]);
      }
    }

    for(const id in data.items.accessories) {
      const def = data.items.accessories[id];

      if(def.type === 'talisman') {
        items.talismans[id] = new Item(id, def);
      } else if(def.type === 'rune') {
        items.runes[id] = new Item(id, def);
      }
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

  // Apply equip defaults
  slotStore.update(state => {
    if(!data.defaults || !data.defaults.equip) {
      return { ...state };
    }

    return { ...state, ...data.defaults.equip };
  });

  
  dataStore.set(data);
}
