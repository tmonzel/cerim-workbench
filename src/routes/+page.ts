/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(`./data.json`);
	const data = await res.json();

	return data;
}