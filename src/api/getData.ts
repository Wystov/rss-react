import { Data, UrlParams } from '../config/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildPath } from '../utils/buildPath';
import { setMainIsLoading } from '../store/loaderSlice';

const baseUrl = 'https://swapi.dev/api/people/';

export const swapi = createApi({
  reducerPath: 'swapi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<Data, UrlParams>({
      async queryFn(params, { dispatch }, _, fetchWithBQ) {
        console.log(params);
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
        console.log(response.data);
        dispatch(setMainIsLoading(false));
        return { data: response.data };
      },
    }),
  }),
});

export const { useGetAllPeopleQuery } = swapi;
