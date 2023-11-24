import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Search from '@/components/Search';
import CardList from '@/components/CardList';
import ErrorComponent from '@/components/ErrorComponent';
import Details from '@/components/Details';
import { buildPath } from '@/utils/buildPath';

export const getServerSideProps = (async ({ query }) => {
  const { search, page, itemsPerPage, details } = query;
  const searchValue = search ?? '';
  const pageValue = +(page ?? 1);
  const apiPage =
    itemsPerPage && +itemsPerPage === 20 ? pageValue * 2 - 1 : pageValue;

  const props = {
    data: null,
    details: null,
  };

  const response = await fetch(
    buildPath({ query: searchValue, page: apiPage })
  );
  props.data = await response.json();

  if (+itemsPerPage === 20 && props.data.next) {
    const nextResponse = await fetch(
      buildPath({ query: searchValue, page: apiPage + 1 })
    );
    const nextResData = await nextResponse.json();
    props.data.results.push(...nextResData.results);
  }

  if (details) {
    const detailsResponse = await fetch(
      `https://swapi.dev/api/people/${details}`
    );
    props.details = await detailsResponse.json();
  }

  return { props };
}) satisfies GetServerSideProps;

const MainPage = ({ data, details }) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/chewbacca.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Star Wars characters database</title>
      </Head>
      <div className="app">
        <main className={`main ${details ? 'main--small' : ''}`}>
          <Search />
          <CardList data={data} />
          <ErrorComponent />
        </main>
        {details && (
          <aside className="aside">
            <Details details={details} />
          </aside>
        )}
      </div>
    </>
  );
};

export default MainPage;
