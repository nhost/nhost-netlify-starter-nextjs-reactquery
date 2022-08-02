import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { AddNewSpeaker } from '@/components/speakers/AddNewSpeaker';
import { Speakers } from '@/components/speakers/Speakers';
import { useSpeakersQuery } from '@/utils/__generated__/graphql';
import { useAuthenticated } from '@nhost/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const SpeakersPage = () => {
  const isAuthenticated = useAuthenticated();

  return (
    <Layout title="Nhost & Netlify Starter Template">
      <div className=" text-white">
        <Header />
        <div className="flex flex-col max-w-5xl mx-auto my-10">
          <Speakers />
          {isAuthenticated ? (
            <div className="w-full max-w-lg py-10 mx-auto">
              <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
                Add New Speaker
              </h1>
              <AddNewSpeaker />
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useSpeakersQuery.getKey(),
    useSpeakersQuery.fetcher(),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 10,
  };
}
export default SpeakersPage;
