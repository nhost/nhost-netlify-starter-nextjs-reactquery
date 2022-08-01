import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { ConferenceTalks } from '@/components/talks/ConferenceTalks';
import { useTalksQuery } from '@/utils/__generated__/graphql';
import { queryClient } from '@/utils/react-query-client';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const TalksPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Header />
      <div className="flex flex-col max-w-4xl mx-auto my-10">
        <ConferenceTalks />
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
