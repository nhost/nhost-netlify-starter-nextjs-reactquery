import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Agenda, FeaturedConference, Header } from ".";
import Layout from "../components/Layout";
import { useSpeakersQuery } from "../utils/__generated__/graphql";

function Speaker({ avatarUrl, name, social, job }) {
  return (
    <div className="flex flex-col border border-dim p-2 transition-all duration-150 ease-in rounded-md">
      <img
        className="object-cover rounded-md aspect-square p-0.5"
        width={350}
        height={350}
        src={avatarUrl}
      ></img>
      <div className="py-2">
        <h1 className="font-medium text-white text-lg">{name}</h1>
        <h2 className="font-medium text-dim text-xs">@{social}</h2>
        <h2 className="font-medium text-dim text-sm mt-2">{job}</h2>
      </div>
    </div>
  );
}

const Speakers = () => {
  const { data, isLoading, isError } = useSpeakersQuery();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Layout title="Home | Next.js + TypeScript Example">
     <div className="bg-grid bg-header h-screen text-white">
        <Header></Header>
        <div className="mx-auto max-w-4xl flex flex-col my-10">
          <div className="grid grid-cols-4 gap-6 w-full">
            {data.speakers.map((speaker) => {
              return (
                <Speaker
                  key={speaker.id}
                  avatarUrl={
                    speaker.avatar_url || "https://via.placeholder.com/350x350"
                  }
                  name={speaker.name}
                  social={speaker.social}
                  job={speaker.job_description}
                ></Speaker>
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
    useSpeakersQuery.fetcher()
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Speakers;
