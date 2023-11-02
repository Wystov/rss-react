import { Data } from '../types';

export const getData = async (query: string) => {
  let url = 'https://swapi.dev/api/people';
  if (query.length) url += `/?search=${query}`;
  try {
    const response = await fetch(url);
    const data: Data = await response.json();
    return data;
  } catch {
    console.warn('Error occured on data fetching');
  }
};
