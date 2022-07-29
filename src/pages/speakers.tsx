import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { Speaker } from '@/components/Speaker';
import {
  useAddSpeakerMutation,
  useSpeakersQuery,
} from '@/utils/__generated__/graphql';
import { queryClient } from '@/utils/react-query-client';
import { useAuthenticated } from '@nhost/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const Speakers = () => {
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

function AddNewSpeaker() {
  const { mutateAsync, isLoading } = useAddSpeakerMutation({
    onSuccess: () => {
      queryClient.fetchQuery(useSpeakersQuery.getKey());
    },
  });

  const [newSpeaker, setNewSpeaker] = useState({
    name: '',
    social: '',
    job_description: '',
    avatar_url: 'https://via.placeholder.com/350x350',
  });

  const [error, setError] = useState<Error | null>(null);

  const handleAddSpeaker = async () => {
    try {
      await mutateAsync({
        speaker: {
          name: newSpeaker.name,
          social: newSpeaker.social,
          job_description: newSpeaker.job_description,
          avatar_url: newSpeaker.avatar_url,
        },
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="bg-card flex flex-col w-full px-12 pt-10 pb-10 space-y-8 border border-gray-700 rounded-md">
      {error ? (
        <div className="bg-opacity-10 px-4 py-4 text-sm bg-red-900 rounded-md">
          Error: {error.message}
        </div>
      ) : null}
      <div className="place-content-between flex flex-row">
        <div className="flex">
          <h1 className="text-list self-center text-xs font-medium">
            Speaker Full Name
          </h1>
        </div>
        <div className="flex w-[230px]">
          <input
            tabIndex={1}
            value={newSpeaker.name}
            onChange={(e) => {
              setError(null);
              setNewSpeaker({ ...newSpeaker, name: e.target.value });
            }}
            className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
            autoFocus
            id="Speaker Name"
            placeholder="Speaker Name"
            required
            minLength={2}
            maxLength={128}
            spellCheck="false"
            aria-label="Speaker Name"
            autoCapitalize="none"
            type="Speaker Name"
          />
        </div>
      </div>
      <div className="place-content-between flex flex-row">
        <div className="flex">
          <h1 className="text-list self-center text-xs font-medium">
            Twitter Tag
          </h1>
        </div>
        <div className="flex w-[230px]">
          <input
            tabIndex={2}
            value={newSpeaker.social}
            onChange={(e) => {
              setError(null);
              setNewSpeaker({ ...newSpeaker, social: e.target.value });
            }}
            className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
            autoFocus
            id="Twitter Tag"
            placeholder="Twitter Tag"
            required
            minLength={2}
            maxLength={128}
            spellCheck="false"
            aria-label="Twitter Tag"
            autoCapitalize="none"
            type="Twitter Tag"
          />
        </div>
      </div>
      <div className="place-content-between flex flex-row">
        <div className="flex">
          <h1 className="text-list self-center text-xs font-medium">
            Job Title
          </h1>
        </div>
        <div className="flex w-[230px]">
          <input
            tabIndex={3}
            value={newSpeaker.job_description}
            onChange={(e) => {
              setError(null);
              setNewSpeaker({ ...newSpeaker, job_description: e.target.value });
            }}
            className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
            autoFocus
            id="Job Title"
            placeholder="Job Title"
            required
            minLength={2}
            maxLength={128}
            spellCheck="false"
            aria-label="Job Title"
            autoCapitalize="none"
            type="Job Title"
          />
        </div>
      </div>
      <div className="place-content-between flex flex-row">
        <div className="flex">
          <h1 className="text-list self-center text-xs font-medium">
            Avatar URL
          </h1>
        </div>
        <div className="flex w-[230px]">
          <input
            tabIndex={4}
            value={newSpeaker.avatar_url}
            onChange={(e) => {
              setError(null);
              setNewSpeaker({ ...newSpeaker, name: e.target.value });
            }}
            className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
            autoFocus
            id="Avatar URL"
            placeholder="Avatar URL"
            required
            minLength={2}
            maxLength={128}
            spellCheck="false"
            aria-label="Avatar URL"
            autoCapitalize="none"
            type="Avatar URL"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <button
          onClick={handleAddSpeaker}
          disabled={isLoading}
          className="bg-header py-3 text-xs font-medium text-white border-gray-500 rounded-md"
        >
          {isLoading ? 'Loading...' : 'Add New Speaker'}
        </button>
      </div>
    </div>
  );
}
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
export default Speakers;
