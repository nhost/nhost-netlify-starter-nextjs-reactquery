import { FeaturedConference } from '@/components/conferences/FeaturedConference';
import { IndexContainer } from '@/components/IndexContainer';
import { ConferencesQueryQuery, useConferencesQueryQuery } from '@/generated/graphql';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const IndexPage = () => {
  const { isLoading, isError } =
    useConferencesQueryQuery<ConferencesQueryQuery>();

  if (isLoading) return <IndexContainer />;

  if (isError) return <IndexContainer />;

  return (
    <IndexContainer>
      <FeaturedConference />
    </IndexContainer>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useConferencesQueryQuery.getKey(),
    useConferencesQueryQuery.fetcher(),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
}

export default IndexPage;
