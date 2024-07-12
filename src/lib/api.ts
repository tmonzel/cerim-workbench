import type { DataDefaults } from './data';

export const API_URL = 'http://api.tmonzel.de/tarnished-creator';

export async function createBuild(defaults: DataDefaults) {
  const response = await fetch(`${API_URL}/shared_builds`, {
    method: 'POST',
    body: JSON.stringify(defaults),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const json = await response.json();
  
  
  return `http://localhost:5173/${json.data.uid}`;
}

export async function findBuild(uid: string): Promise<DataDefaults | undefined> {
  const response = await fetch(`${API_URL}/shared_builds/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(response.status === 404) {
    return;
  }

  const json = await response.json();
  
  return json.data.state as DataDefaults;
 }