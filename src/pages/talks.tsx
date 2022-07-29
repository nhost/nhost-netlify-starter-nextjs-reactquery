import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import SpeakerListbox from '@/components/SpeakerListbox';
import { Talk } from '@/components/Talk';
import {
  useAddTalkMutation,
  useSpeakersQuery,
  useTalksQuery,
} from '@/utils/__generated__/graphql';
import { useAuthenticated } from '@nhost/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { queryClient } from '@/utils/react-query-client';

const Talks = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <Header />
      <div className="flex flex-col max-w-4xl mx-auto my-10">
        <ConferenceTalks />
      </div>
    </Layout>
  );
};

function ConferenceTalks() {
  const { data, isLoading, isError } = useTalksQuery();
  const isAuthenticated = useAuthenticated();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
          <AddNewTalk />
        </div>
      ) : null}
    </div>
  );
}

function AddNewTalk() {
  const { data } = useSpeakersQuery();
  const { mutateAsync, isLoading } = useAddTalkMutation({
    onSuccess: () => {
      queryClient.fetchQuery(useTalksQuery.getKey());
    },
  });

  const [error, setError] = useState<Error | null>(null);

  const [talk, setTalk] = useState({
    name: '',
    speaker: { name: '', id: '' },
    startDate: '2022-08-02T10:00:00+00:00',
    endDate: '2022-08-02T10:00:00+00:00',
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
          conference_id: '1b92282d-b09d-4a79-9087-c734a788a058',
          speaker_id: talk.speaker.id,
          start_date: talk.startDate,
          end_date: talk.endDate,
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
          <h1 className="text-list self-center text-xs font-medium">Speaker</h1>
        </div>
        <div className="flex w-[230px] cursor-pointer">
          <SpeakerListbox
            selected={talk.speaker}
            speakers={data.speakers}
            onChange={(speaker) => setTalk({ ...talk, speaker })}
          />
        </div>
      </div>
      <div className="place-content-between flex flex-row">
        <div className="flex">
          <h1 className="text-list self-center text-xs font-medium">
            Starting Time
          </h1>
        </div>
        <div className="flex w-[230px]">
          <input
            tabIndex={1}
            value={talk.startDate}
            onChange={(e) => {
              setTalk({ ...talk, startDate: e.target.value });
            }}
            className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
            autoFocus
            id="Starting Time"
            placeholder="Starting Time"
            required
            minLength={2}
            maxLength={128}
            spellCheck="false"
            aria-label="Starting Time"
            autoCapitalize="none"
            type="Starting Time"
          />
        </div>
      </div>
      <div className="place-content-between flex flex-row">
        <div className="flex">
          <h1 className="text-list self-center text-xs font-medium">
            Ending Time
          </h1>
        </div>
        <div className="flex w-[230px]">
          <input
            tabIndex={4}
            value={talk.endDate}
            onChange={(e) => {
              setTalk({ ...talk, endDate: e.target.value });
            }}
            className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
            autoFocus
            id="Ending Time"
            placeholder="Ending Time"
            required
            minLength={2}
            maxLength={128}
            spellCheck="false"
            aria-label="Ending Time"
            autoCapitalize="none"
            type="Ending Time"
          />
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

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    useTalksQuery.getKey(),
    useTalksQuery.fetcher(),
  );
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 1,
  };
}
export default Talks;
