import { SearchUrlParams } from '../config/types';

export const buildPath = (params: SearchUrlParams) => {
  const { query, page } = params;
  return query.length ? `?search=${query}&page=${page}` : `?page=${page}`;
};
