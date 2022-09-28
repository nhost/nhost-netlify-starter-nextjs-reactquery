import { ConferenceDetails } from '@/components/conferences/ConferenceDetails';
import { data } from '@/data/info';
import {
  FeaturedConferencesQuery,
  useFeaturedConferencesQuery,
} from '@/generated/graphql';
import BaseLayout from '@/layouts/BaseLayout';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { ReactElement } from 'react';

function IndexPage() {
  const { data, isLoading, isError } =
    useFeaturedConferencesQuery<FeaturedConferencesQuery>();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  return <ConferenceDetails conference={data?.conferences?.[0]} />;
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useFeaturedConferencesQuery.getKey(),
    useFeaturedConferencesQuery.fetcher(),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export default IndexPage;
