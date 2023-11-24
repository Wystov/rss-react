import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Search from '@/components/Search';
import CardList from '@/components/CardList';
import ErrorComponent from '@/components/ErrorComponent';
import Details from '@/components/Details';
import { useRouter } from 'next/router';
import { buildPath } from '@/utils/buildPath';

export const getServerSideProps = (async ({ query }) => {
  const { search, page, itemsPerPage, details } = query;

  const props = {};

  const response = await fetch(
    buildPath({ query: search ?? '', page: page ?? 1 })
  );
  props.data = await response.json();

  if (itemsPerPage === 20 && props.data.next) {
    const nextResponse = await fetch(
      buildPath({ query: search, page: +page + 1 })
    );
    const nextResData = await nextResponse.json();
    props.data.results.push(...nextResData.data.results);
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
  const router = useRouter();

  const showDetails = router.query.details !== undefined;

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/chewbacca.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Star Wars characters database</title>
      </Head>
      <div className="app">
        <main className={`main ${showDetails ? 'main--small' : ''}`}>
          <Search />
          <CardList data={data} />
          <ErrorComponent />
        </main>
        {showDetails && (
          <aside className="aside">
            <Details details={details} />
          </aside>
        )}
      </div>
    </>
  );
};

export default MainPage;
