import { Input } from '@/components/common/Input';
import { Loader } from '@/components/common/Loader';
import { SpeakerListbox } from '@/components/speakers/SpeakerListbox';
import { DEFAULT_CONFERENCE_SLUG } from '@/data/constants';
import { Speaker } from '@/types/Speaker';
import { queryClient } from '@/utils/react-query-client';
import {
  useAddTalkMutation,
  useConferenceBySlugQuery,
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
  const [formInitialized, setFormInitialized] = useState(false);

  const {
    data: conferenceBySlug,
    status: conferenceBySlugStatus,
    error: conferenceBySlugError,
  } = useConferenceBySlugQuery({ slug: DEFAULT_CONFERENCE_SLUG });

  const {
    mutateAsync: addTalk,
    status: addTalkStatus,
    error: addTalkError,
  } = useAddTalkMutation({
    onSuccess: () => queryClient.refetchQueries({ type: 'active' }),
  });

  const error = addTalkError || conferenceBySlugError;
  const form = useForm<AddTalkFormValues>();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = form;

  const { speakers } = conferenceBySlug?.conferences?.[0] || {};

  useEffect(() => {
    if (speakers && !formInitialized) {
      reset({
        title: '',
        speaker: speakers[0] || null,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });

      setFormInitialized(true);
    }
  }, [speakers, formInitialized, reset]);

  async function onSubmit(values: AddTalkFormValues) {
    try {
      await addTalk({
        talk: {
          name: values.title,
          speaker_id: values.speaker.id,
          start_date: values.startDate,
          end_date: values.endDate,
          conference_id: conferenceBySlug.conferences?.[0].id,
        },
      });

      reset({
        title: '',
        speaker: speakers[0] || null,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });
    } catch {
      // This error is already handled by the useAddTalkMutation hook
    }
  }

  if (conferenceBySlugStatus === 'loading') {
    return (
      <p className="grid justify-start grid-flow-col gap-1">
        <Loader /> Loading conference...
      </p>
    );
  }

  return (
    <div className="flex flex-col w-full px-12 pt-10 pb-10 space-y-8 border border-gray-700 rounded-md bg-card">
      {error ? (
        <div className="px-4 py-4 text-sm text-white bg-red-500 rounded-md bg-opacity-10">
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
          <Input
            {...register('title', {
              required: { value: true, message: 'This field is required.' },
            })}
            id="talk-title"
            label="Talk Title"
            placeholder="Talk Title"
            error={errors?.title?.message}
            disabled={addTalkStatus === 'loading'}
          />

          <div className="grid items-center grid-cols-3">
            <div className="col-span-1">
              <label
                htmlFor="speaker"
                className="self-center text-xs font-medium text-list"
              >
                Speaker
              </label>
            </div>
            <div className="col-span-2">
              <SpeakerListbox speakers={speakers} />
            </div>
          </div>

          <Input
            {...register('startDate')}
            id="start-date"
            label="Starting Time"
            placeholder="Starting Time"
            error={errors?.startDate?.message}
            disabled={addTalkStatus === 'loading'}
          />

          <Input
            {...register('endDate')}
            id="end-date"
            label="Ending Time"
            placeholder="Ending Time"
            error={errors?.endDate?.message}
            disabled={addTalkStatus === 'loading'}
          />

          <div className="grid grid-flow-row gap-2">
            <button
              disabled={addTalkStatus === 'loading'}
              className="py-3 text-xs font-medium text-white border-gray-500 rounded-md bg-header"
              type="submit"
            >
              {addTalkStatus === 'loading' ? 'Loading...' : 'Add New Talk'}
            </button>

            {isSubmitSuccessful && (
              <p className="text-center">Talk was successfully added!</p>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
