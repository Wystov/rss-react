import {
  Data,
  DetailsUrlParams,
  ResultItem,
  SearchUrlParams,
} from '../config/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildPath } from '../utils/buildPath';
import { setDetailsIsLoading, setMainIsLoading } from '../store/loaderSlice';

const baseUrl = 'https://swapi.dev/api/people/';

export const swapi = createApi({
  reducerPath: 'swapi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<Data, SearchUrlParams>({
      async queryFn(params, { dispatch }, _, fetchWithBQ) {
        const { page, itemsPerPage } = params;
        dispatch(setMainIsLoading(true));

        const response = await fetchWithBQ(buildPath(params));

        if (itemsPerPage === 20 && response.data.next) {
          const nextParams = {
            ...params,
            page: page + 1,
          };
          const nextResponse = await fetchWithBQ(buildPath(nextParams));
          response.data.results.push(...nextResponse.data.results);
        }

        dispatch(setMainIsLoading(false));
        return { data: response.data };
      },
    }),
    getDetails: builder.query<ResultItem, DetailsUrlParams>({
      query: ({ id }) => `${id}`,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setDetailsIsLoading(true));
        await queryFulfilled;
        dispatch(setDetailsIsLoading(false));
      },
    }),
  }),
});

export const { useGetAllPeopleQuery, useGetDetailsQuery } = swapi;
