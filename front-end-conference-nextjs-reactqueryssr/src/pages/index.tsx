import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import {
  ConferencesQueryQuery,
  useConferencesQueryQuery,
} from '@/generated/graphql';
import { Header } from '@/components/Header';
import { FeaturedConference } from '@/components/FeaturedConference';
import { ReactNode } from 'react';

interface IndexContainerProps {
  children?: ReactNode;
}

export const IndexContainer = ({ children }: IndexContainerProps) => {
  return (
    <Layout title="Nhost NextJS React Query Starter Example">
      <div className="bg-header bg-grid h-full text-white">
        <Header />
        {children ? children : null}
      </div>
    </Layout>
  );
};

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
