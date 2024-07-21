export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, setHeaders }) {
	setHeaders({
		'cache-control': 'max-age=60'
	});

	const API_URL = './data';

	const dataResponse = await fetch(`${API_URL}/data.json`);
	const data = await dataResponse.json();

	const itemsResponse = await fetch(`${API_URL}/items.json`);
	const items = await itemsResponse.json();

	const accessoriesResponse = await fetch(`${API_URL}/accessories.json`);
	const accessories = await accessoriesResponse.json();

	return {
		...data,
		items: {
			...items,
			...accessories
		}
	};
}
