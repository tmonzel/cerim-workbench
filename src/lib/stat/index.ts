import type { AttributeType } from '$lib/attribute';
import type { GraphMutation } from '$lib/core';
import { heroState } from '$lib/state';
import { derived, type Readable } from 'svelte/store';

export * from './types';

type AttributeScaling = {
	type: AttributeType;
	mutations: GraphMutation[];
};

interface HeroStat extends Readable<number> {
	name: string;
	scaling?: AttributeScaling;
}

function createStat(name: string, scaling?: AttributeScaling): HeroStat {
	const value = derived(heroState, (hero) => {
		return 0;
	});

	return {
		...value,
		name,
		scaling
	};
}
