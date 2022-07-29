import { Header } from '@/components/Header';
import { Listbox } from '@headlessui/react';
import { Talk } from '@/components/Talk';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import {
  useAddTalkMutation,
  useSpeakersQuery,
  useTalksQuery,
} from '@/utils/__generated__/graphql';
import { useEffect, useState } from 'react';
import SpeakerListbox from '@/components/SpeakerListbox';
import { queryClient } from '../utils/react-query-client';
import { useUserAvatarUrl, useAuthenticated } from '@nhost/react';

const Talks = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="bg-grid bg-header h-screen text-white">
        <Header />
        <div className="flex flex-col max-w-4xl mx-auto my-10">
          <ConferenceTalks></ConferenceTalks>
        </div>
      </div>
    </Layout>
  );
};

function ConferenceTalks() {
  const { data, isLoading, isError } = useTalksQuery();
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const isAuthenticated = useAuthenticated();

  return (
    <div>
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
            />
          );
        })}
      </div>
      {isAuthenticated ? (
        <div className="w-full max-w-lg py-10 mx-auto">
          <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
            Add New Talk
          </h1>
          <AddNewTalk></AddNewTalk>
        </div>
      ) : null}
    </div>
  );
}

function AddNewTalk() {
  const { data } = useSpeakersQuery();
  const { mutateAsync, isLoading } = useAddTalkMutation({
    onSuccess: (data) => {
      queryClient.fetchQuery(useTalksQuery.getKey());
    },
  });

  const [talk, setTalk] = useState({
    name: 'New Talk',
    speaker: { name: '', id: '' },
    startDate: '10:00',
    endDate: '10:30',
  });

  useEffect(() => {
    if (!data) return;
    setTalk({ ...talk, speaker: data.speakers[0] });
  }, [data, setTalk]);

  if (!data) return <div>loading...</div>;

  const handleAddTalk = async () => {
    try {
      await mutateAsync({
        talk: {
          name: talk.name,
          conference_id: 'cf23abcd-b0dc-4469-97a4-e7d5c9dc2047',
          speaker_id: talk.speaker.id,
          start_date: '2022-08-03T10:00:00+00:00',
          end_date: '2022-08-03T10:00:00+00:00',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-card flex flex-col w-full px-12 pt-10 pb-10 space-y-8 border border-gray-700 rounded-md">
      <div className="place-content-between flex flex-row">
        <div className="flex">
          <h1 className="text-md self-center font-medium text-white">
            Talk Title
          </h1>
        </div>
        <div className="flex w-[230px]">
          <input
            tabIndex={1}
            onChange={(e) => {
              setTalk({ ...talk, name: e.target.value });
            }}
            className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
            autoFocus
            id="Talk Title"
            placeholder="Talk Title"
            required
            minLength={2}
            maxLength={128}
            spellCheck="false"
            aria-label="Talk Title"
            autoCapitalize="none"
            type="Talk Title"
          />
        </div>
      </div>
      <div className="place-content-between flex flex-row">
        <div className="flex">
          <h1 className="text-md self-center font-medium text-white">
            Speaker
          </h1>
        </div>
        <div className="flex w-[230px] cursor-pointer">
          <SpeakerListbox
            selected={talk.speaker}
            speakers={data.speakers}
            onChange={(speaker) => setTalk({ ...talk, speaker })}
          ></SpeakerListbox>
        </div>
      </div>
      <div className="flex flex-col">
        <button
          onClick={handleAddTalk}
          disabled={isLoading}
          className="bg-header py-3 text-xs font-medium text-white border-gray-500 rounded-md"
        >
          {isLoading ? 'Loading...' : 'Add New Talk'}
        </button>
      </div>
    </div>
  );
}

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
