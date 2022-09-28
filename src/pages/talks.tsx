import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { AddNewTalk } from '@/components/talks/AddNewTalk';
import { ConferenceTalks } from '@/components/talks/ConferenceTalks';
import { data } from '@/data/info';
import { useTalksQuery } from '@/utils/__generated__/graphql';
import { useAuthenticationStatus } from '@nhost/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const TalksPage = () => {
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <Layout title={data.pageTitle}>
      <Header />
      <div className="flex flex-col max-w-5xl px-4 mx-auto my-10">
        <ConferenceTalks />

        {isAuthenticated && (
          <div className="w-full max-w-lg py-10 mx-auto">
            <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
              Add New Talk
            </h1>
            <AddNewTalk />
          </div>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useTalksQuery.getKey(),
    useTalksQuery.fetcher(),
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 1,
  };
}

export default TalksPage;
