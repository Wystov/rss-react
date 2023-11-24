import { SearchUrlParams } from '@/config/types';

export const buildPath = ({ search, page }: SearchUrlParams) => {
  const baseUrl = 'https://swapi.dev/api/people/';
  const path = search.length
    ? `?search=${search}&page=${page}`
    : `?page=${page}`;
  return baseUrl + path;
};
