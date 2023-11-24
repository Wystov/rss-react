import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { getData } from '@/api/getData';
import CardList from '@/components/CardList';
import Details from '@/components/Details';
import ErrorComponent from '@/components/ErrorComponent';
import Search from '@/components/Search';

export const getServerSideProps = (async ({ query, res }) => {
  res.setHeader('Cache-Control', 'public, max-age=9999999999, must-revalidate');
  const { search, page, itemsPerPage, details } = query;
  const pageNum = +(page ?? 1);
  const params = {
    search: `${search ?? ''}`,
    page: itemsPerPage && +itemsPerPage === 20 ? pageNum * 2 - 1 : pageNum,
    itemsPerPage: +(itemsPerPage ?? 10),
    details: details ? details.toString() : null,
  };

  const props = await getData(params);

  return { props };
}) satisfies GetServerSideProps;

const MainPage = ({
  data,
  details,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
