import { complexData, getDataParams } from '@/config/types';
import { buildPath } from '@/utils/buildPath';

export const getData = async ({
  search,
  page,
  itemsPerPage,
  details,
}: getDataParams) => {
  const props: complexData = {
    data: null,
    details: null,
  };

  try {
    const response = await fetch(buildPath({ search, page }));
    props.data = await response.json();

    if (+itemsPerPage === 20 && props.data?.next) {
      const nextResponse = await fetch(buildPath({ search, page: page + 1 }));
      const nextResData = await nextResponse.json();
      props.data.results.push(...nextResData.results);
    }

    const detailsResponse =
      details && (await fetch(`https://swapi.dev/api/people/${details}`));
    props.details = detailsResponse && (await detailsResponse.json());
  } catch {
    console.warn('error in fetch');
  }

  return props;
};
