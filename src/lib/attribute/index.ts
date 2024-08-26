export * from './types';
export * from './state';

/*interface AttributeState {
	base: number;
	offset: number;
	added: number;
}

interface Attribute extends Writable<AttributeState> {
	name: string;
}

function createAttribute(name: string): Attribute {
	const state = writable({
		base: 0,
		offset: 0,
		added: 0
	});

	const total = derived(state, (s) => {
		return {
			base: 0,
			offset: 0,
			added: 0
		};
	});

	const { set, update } = state;

	return {
		name,
		set,
		update,
		...total
	};
}

export const attributes: Record<string, Attribute> = {
	vig: createAttribute('Vigor'),
	end: createAttribute('Endurance')
};

export const totalAttributes = derived([attributes.vig], ([vig]) => {
	return {
		vig: vig.base
	};
});
*/
