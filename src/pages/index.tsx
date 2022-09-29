import { Loader } from '@/components/common/Loader';
import { data } from '@/data/info';
import {
  FeaturedConferencesQuery,
  useFeaturedConferencesQuery,
} from '@/generated/graphql';
import BaseLayout from '@/layouts/BaseLayout';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

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
function IndexPage() {
  const router = useRouter();
  const { data, status, error } =
    useFeaturedConferencesQuery<FeaturedConferencesQuery>();

  const featuredConference = data?.conferences?.[0];

  useEffect(() => {
    if (status === 'success' && featuredConference) {
      router.push(`/conferences/${featuredConference.slug}`);
    }

    if (status === 'success' && !featuredConference) {
      router.push('/conferences');
    }
  }, [featuredConference, router, status]);

  if (status === 'error' && error) {
    return (
      <p className="text-red-500">
        {error instanceof Error
          ? error.message
          : 'Unknown error occurred. Please try again.'}
      </p>
    );
  }

  if (status === 'loading' || !featuredConference) {
    return (
      <p className="grid justify-start grid-flow-col gap-1">
        <Loader /> Loading featured conference...
      </p>
    );
  }

  return null;
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export default IndexPage;
