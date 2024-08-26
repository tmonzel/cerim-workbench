import { derived, writable } from 'svelte/store';
import { AttributeType } from './types';
import { effectState } from '$lib/effect';

export type AttributeState = Record<AttributeType, number>;

function initializeState(): AttributeState {
	return {
		[AttributeType.VIGOR]: 0,
		[AttributeType.ENDURANCE]: 0,
		[AttributeType.STRENGTH]: 0,
		[AttributeType.DEXTERITY]: 0,
		[AttributeType.MIND]: 0,
		[AttributeType.INTELLIGENCE]: 0,
		[AttributeType.FAITH]: 0,
		[AttributeType.ARCANE]: 0
	};
}

export const attributeStore = writable<AttributeState>(initializeState());

export const modifiedAttributes = derived(effectState, (effects) => {
	const attributes: AttributeState = initializeState();

	for (const effect of effects) {
		if (!effect.modifiers) continue;

		for (const mod of effect.modifiers) {
			if (mod.type === 'attributes') {
				attributes[mod.key as AttributeType] += mod.value;
			}
		}
	}

	return attributes;
});
