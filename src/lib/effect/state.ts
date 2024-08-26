import { derived } from 'svelte/store';
import type { Effect } from './types';
import { equipStore } from '$lib/equip';

export const effectState = derived(equipStore, (equip) => {
	const effects: Effect[] = [];

	for (const item of Object.values(equip)) {
		if (!item) {
			continue;
		}

		for (const effect of item.effects) {
			if (!effect.activated) {
				continue;
			}

			effects.push(effect);
		}
	}

	return effects;
});
