export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, setHeaders }) {
	setHeaders({
		'cache-control': 'max-age=60'
	});

	const API_URL = './data';

	const dataResponse = await fetch(`${API_URL}/data.json`);
	const data = await dataResponse.json();

	const weaponsResponse = await fetch(`${API_URL}/weapons.json`);
	const weapons = await weaponsResponse.json();

	const armorsResponse = await fetch(`${API_URL}/armors.json`);
	const armors = await armorsResponse.json();

	const accessoriesResponse = await fetch(`${API_URL}/accessories_generated.json`);
	const accessories = await accessoriesResponse.json();

	return {
		...data,
		items: {
			weapons: weapons.data,
			armors: armors.data,
			accessories: accessories.data
		}
	};
}
