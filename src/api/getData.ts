import { Data } from '../types';

const BASE_URL = 'https://swapi.dev/api/people/';
const SEARCH_QUERY = 'search=';
const PAGINATION_QUERY = 'page=';

const urlBuilder = (query: string, page: number) => {
  let url = BASE_URL;
  return (url += query.length
    ? `?${SEARCH_QUERY}${query}&${PAGINATION_QUERY}${page}`
    : `?${PAGINATION_QUERY}${page}`);
};

export const getData = async (query: string, page: number) => {
  const url = urlBuilder(query, page);
  try {
    const response = await fetch(url);
    const data: Data = await response.json();
    console.log(data);
    return data;
  } catch {
    console.warn('Error occured on data fetching');
  }
};
