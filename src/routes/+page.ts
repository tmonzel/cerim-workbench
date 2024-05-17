/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(`./data.json`);
	const data = await res.json();

	// Resolve item bases
	for(const i in data.items) {
		data.items[i].base = data.baseItems[data.items[i].base];
	}

	return data;
}