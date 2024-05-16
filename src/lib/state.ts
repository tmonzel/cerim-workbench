import { writable } from 'svelte/store';
import { type DataSchema } from './types';

export const state = writable<DataSchema>({
  masteries: [],
  items: []
});
