import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { Speaker } from '@/components/speakers/Speaker';
import { AddNewSpeaker } from '@/components/speakers/AddNewSpeaker';
import { useSpeakersQuery } from '@/utils/__generated__/graphql';
import { useAuthenticated } from '@nhost/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const SpeakersPage = () => {
  const { data, isLoading, isError } = useSpeakersQuery();
  const isAuthenticated = useAuthenticated();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className=" text-white">
        <Header />
        <div className="flex flex-col max-w-5xl mx-auto my-10">
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
