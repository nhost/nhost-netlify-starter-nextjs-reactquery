import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { useSpeakersQuery } from '@/utils/__generated__/graphql';
import { Header } from '@/components/Header';
import { Speaker } from '@/components/Speaker';

const Speakers = () => {
  const { data, isLoading, isError } = useSpeakersQuery();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="bg-grid bg-header h-screen text-white">
        <Header />
        <div className="flex flex-col max-w-4xl mx-auto my-10">
          <div className="grid w-full grid-cols-4 gap-6">
            {data.speakers.map((speaker) => {
              return (
                <Speaker
                  key={speaker.id}
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
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useSpeakersQuery.getKey(),
    useSpeakersQuery.fetcher(),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Speakers;
