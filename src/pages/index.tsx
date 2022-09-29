import { Loader } from '@/components/common/Loader';
import { ConferenceDetails } from '@/components/conferences/ConferenceDetails';
import { data } from '@/data/info';
import {
  FeaturedConferencesQuery,
  useFeaturedConferencesQuery,
} from '@/generated/graphql';
import BaseLayout from '@/layouts/BaseLayout';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

function IndexPage() {
  const router = useRouter();
  const { data, status, error } =
    useFeaturedConferencesQuery<FeaturedConferencesQuery>();

  useEffect(() => {
    if (status === 'success') {
      router.push(`/conferences/${data?.conferences[0].slug}`);
    }
  }, [data, router, status]);

  if (status === 'error' && error) {
    return (
      <p className="text-red-500">
        {error instanceof Error
          ? error.message
          : 'Unknown error occurred. Please try again.'}
      </p>
    );
  }

  if (status === 'loading') {
    return <Loader className="mx-auto" />;
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
