import { Data, ResultItem, UrlParams } from '../config/types';

const BASE_URL = 'https://swapi.dev/api/people/';
const SEARCH_QUERY = 'search=';
const PAGINATION_QUERY = 'page=';

const urlBuilder = (params: UrlParams) => {
  let url = BASE_URL;
  if ('id' in params) return `${BASE_URL}${params.id}`;
  const { query, page } = params;
  return (url += query.length
    ? `?${SEARCH_QUERY}${query}&${PAGINATION_QUERY}${page}`
    : `?${PAGINATION_QUERY}${page}`);
};

export const getData = async (params: UrlParams) => {
  const url = urlBuilder(params);
  try {
    const response = await fetch(url);
    const data: Data | ResultItem = await response.json();
    return data;
  } catch {
    console.warn('Error occured on data fetching');
  }
};
