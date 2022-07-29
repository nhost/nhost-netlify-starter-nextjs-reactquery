import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import {
  ConferencesQueryQuery,
  useConferencesQueryQuery,
} from '@/generated/graphql';
import { Header } from '@/components/Header';
import { FeaturedConference } from '@/components/FeaturedConference';

const IndexPage = () => {
  const { isLoading, isError } =
    useConferencesQueryQuery<ConferencesQueryQuery>();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;

  return (
    <Layout title="Nhost NextJS React Query Starter Example">
      <div className="bg-header bg-grid text-white">
        <Header />
        <FeaturedConference />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useConferencesQueryQuery.getKey(),
    useConferencesQueryQuery.fetcher(),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default IndexPage;
