import { SearchUrlParams } from '../config/types';

export const buildPath = (params: SearchUrlParams) => {
  const { query, page } = params;
  const baseUrl = 'https://swapi.dev/api/people/';
  const path = query.length ? `?search=${query}&page=${page}` : `?page=${page}`;
  return baseUrl + path;
};
