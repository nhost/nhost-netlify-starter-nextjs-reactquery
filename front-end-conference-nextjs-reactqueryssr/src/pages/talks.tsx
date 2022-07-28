import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Agenda, FeaturedConference, Header, Talk } from ".";
import Layout from "../components/Layout";
import InlineInput from "../components/ui/InlineInput";
import {
  useSpeakersQuery,
  useTalksQuery,
  useUpdateTalkMutation,
} from "../utils/__generated__/graphql";

const Talks = () => {
  const { data, isLoading, isError } = useTalksQuery();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="bg-grid bg-header h-screen text-white">
        <Header></Header>
        <div className="mx-auto max-w-4xl flex flex-col my-10">
          <div className="grid grid-cols-3 py-5 gap-8 place-content-between text-center">
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
    useTalksQuery.fetcher()
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Talks;
