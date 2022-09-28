import { Loader } from '@/components/common/Loader';
import { SpeakerListbox } from '@/components/speakers/SpeakerListbox';
import { Speaker } from '@/types/Speaker';
import { queryClient } from '@/utils/react-query-client';
import {
  useAddTalkMutation,
  useSpeakersQuery,
  useTalksQuery,
} from '@/utils/__generated__/graphql';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export type AddTalkFormValues = {
  title: string;
  speaker: Speaker;
  startDate: string;
  endDate: string;
};

export function AddNewTalk() {
  const { data, isLoading: isLoadingSpeakersQuery } = useSpeakersQuery();
  const { mutateAsync, isLoading, error } = useAddTalkMutation({
    onSuccess: () => {
      queryClient.fetchQuery(useTalksQuery.getKey());
    },
  });

  const [formInitialized, setFormInitialized] = useState(false);

  const form = useForm<AddTalkFormValues>();
  const { register, reset, handleSubmit } = form;

  useEffect(() => {
    if (data?.speakers && !formInitialized) {
      reset({
        title: '',
        speaker: data.speakers[0] || null,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });

      setFormInitialized(true);
    }
  }, [data?.speakers, formInitialized, reset]);

  if (isLoadingSpeakersQuery) {
    return (
      <div className="w-fit flex mx-auto">
        <Loader />
      </div>
    );
  }

  async function onSubmit(values: AddTalkFormValues) {
    try {
      await mutateAsync({
        talk: {
          name: values.title,
          speaker_id: values.speaker.id,
          start_date: values.startDate,
          end_date: values.endDate,
          conference_id: '1b92282d-b09d-4a79-9087-c734a788a058',
        },
      });

      reset({
        title: '',
        speaker: data?.speakers[0] || null,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });
    } catch (error) {}
  }

  return (
    <div className="bg-card flex flex-col w-full px-12 pt-10 pb-10 space-y-8 border border-gray-700 rounded-md">
      {error ? (
        <div className="bg-opacity-10 px-4 py-4 text-sm text-white bg-red-500 rounded-md">
          Error:{' '}
          {error instanceof Error
            ? error.message
            : 'Unknown error occurred. Please try again.'}
        </div>
      ) : null}

      <FormProvider {...form}>
        <form
          className="grid grid-flow-row gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <label
                htmlFor="talk-title"
                className="text-list self-center text-xs font-medium"
              >
                Talk Title
              </label>
            </div>
            <div className="col-span-2">
              <input
                {...register('title')}
                className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
                id="talk-title"
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

          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <label
                htmlFor="speaker"
                className="text-list self-center text-xs font-medium"
              >
                Speaker
              </label>
            </div>
            <div className="col-span-2">
              <SpeakerListbox speakers={data.speakers} />
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <label
                htmlFor="starting-time"
                className="text-list self-center text-xs font-medium"
              >
                Starting Time
              </label>
            </div>
            <div className="col-span-2">
              <input
                {...register('startDate')}
                className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
                id="start-date"
                placeholder="Starting Time"
                required
                minLength={2}
                maxLength={128}
                spellCheck="false"
                autoCapitalize="none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <label
                htmlFor="ending-time"
                className="text-list self-center text-xs font-medium"
              >
                Ending Time
              </label>
            </div>
            <div className="col-span-2">
              <input
                {...register('endDate')}
                className="bg-input w-full px-3 py-2 text-xs text-white border border-gray-700 rounded-md"
                id="end-date"
                placeholder="Ending Time"
                required
                minLength={2}
                maxLength={128}
                spellCheck="false"
                autoCapitalize="none"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <button
              disabled={isLoading}
              className="bg-header py-3 text-xs font-medium text-white border-gray-500 rounded-md"
              type="submit"
            >
              {isLoading ? 'Loading...' : 'Add New Talk'}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
