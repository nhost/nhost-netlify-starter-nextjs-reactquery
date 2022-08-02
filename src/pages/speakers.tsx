import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { Speaker } from '@/components/speakers/Speaker';
import { AddNewSpeaker } from '@/components/speakers/AddNewSpeaker';
import { useSpeakersQuery } from '@/utils/__generated__/graphql';
import { useAuthenticated } from '@nhost/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Loader } from '@/components/conferences/FeaturedConference';

const SpeakersPage = () => {
  const isAuthenticated = useAuthenticated();

  return (
    <Layout title="Nhost & Netlify Starter Template">
      <div className=" text-white">
        <Header />
        <div className="flex flex-col max-w-5xl mx-auto my-10">
          <SpeakersComponent />
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

export const SpeakersComponent = () => {
  const { data, isLoading, isError } = useSpeakersQuery();

  if (isError) {
    return (
      <div className="bg-opacity-10 w-full max-w-xl px-4 py-4 mx-auto text-sm bg-red-900 rounded-md">
        <h1 className="pb-2 text-xl font-medium leading-none text-center text-white">
          Error:
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-4 gap-6">
      {data.speakers.map((speaker) => {
        return (
          <Speaker
            key={speaker.id}
            id={speaker.id}
            avatarUrl={
              speaker.avatar_url || 'https://via.placeholder.com/350x350'
            }
            name={speaker.name}
            social={speaker.social}
            job={speaker.job_description}
          />
        );
      })}
    </div>
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
