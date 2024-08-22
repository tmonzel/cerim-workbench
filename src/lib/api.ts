import type { SharedBuild } from './share';

export const API_URL = 'https://api.tmonzel.de/tarnished-creator';

export async function createBuild(data: SharedBuild) {
	const response = await fetch(`${API_URL}/shared_builds`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const json = await response.json();

	return `https://tarnished-creator.com/?uid=${json.data.uid}`;
}

export async function findBuild(uid: string): Promise<SharedBuild | undefined> {
	const response = await fetch(`${API_URL}/shared_builds/${uid}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.status === 404) {
		return;
	}

	const json = await response.json();

	return json.data.state as SharedBuild;
}
