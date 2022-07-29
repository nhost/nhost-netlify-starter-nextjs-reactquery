import { Header } from '@/components/Header';
import { Talk } from '@/components/Talk';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { useTalksQuery } from '@/utils/__generated__/graphql';

const Talks = () => {
  const { data, isLoading, isError } = useTalksQuery();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="bg-grid bg-header h-screen text-white">
        <Header />
        <div className="flex flex-col max-w-4xl mx-auto my-10">
          <div className="place-content-between grid grid-cols-3 gap-8 py-5 text-center">
            {data.talks.map((talk) => {
              return (
                <Talk
                  key={talk.id}
                  id={talk.id}
                  name={talk.name}
                  speaker={talk.speaker.name}
                  startDate={talk.start_date}
                  endDate={talk.end_date}
                ></Talk>
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
    useTalksQuery.getKey(),
    useTalksQuery.fetcher(),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Talks;
