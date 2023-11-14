import { UrlParams } from '../config/types';

export const buildPath = (params: UrlParams) => {
  if ('id' in params) return `${params.id}`;
  const { query, page } = params;
  return query.length ? `?search=${query}&page=${page}` : `?page=${page}`;
};
