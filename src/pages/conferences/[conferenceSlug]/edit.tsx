import { Input } from '@/components/common/Input';
import { Loader } from '@/components/common/Loader';
import { AddNewSpeaker } from '@/components/speakers/AddNewSpeaker';
import { AddNewTalk } from '@/components/talks/AddNewTalk';
import { data } from '@/data/info';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { queryClient } from '@/utils/react-query-client';
import {
  useConferenceBySlugQuery,
  useUpdateConferenceMutation,
} from '@/utils/__generated__/graphql';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type EditConferenceFormValues = {
  name: string;
  slug: string;
  location: string;
  startDate: string;
  endDate: string;
};

function EditConferencePage() {
  const [formInitialized, setFormInitialized] = useState(false);

  const {
    query: { conferenceSlug },
  } = useRouter();

  const {
    data,
    status: conferenceBySlugStatus,
    error: conferenceBySlugError,
  } = useConferenceBySlugQuery({
    slug: conferenceSlug as string,
  });

  const {
    mutateAsync: updateConference,
    status: updateConferenceStatus,
    error: updateConferenceError,
  } = useUpdateConferenceMutation({
    onSuccess: () => queryClient.refetchQueries({ type: 'active' }),
  });

  const error = updateConferenceError || conferenceBySlugError;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<EditConferenceFormValues>();

  const conference = data?.conferences?.[0];

  useEffect(() => {
    if (conference && !formInitialized) {
      reset({
        name: conference.name || '',
        slug: conference.slug || '',
        location: conference.location || '',
        startDate: conference.start_date || new Date().toISOString(),
        endDate: conference.end_date || new Date().toISOString(),
      });

      setFormInitialized(true);
    }
  }, [formInitialized, conference, reset]);

  async function onSubmit(values: EditConferenceFormValues) {
    try {
      await updateConference({
        id: conference.id,
        object: {
          name: values.name,
          location: values.location,
          start_date: values.startDate,
          end_date: values.endDate,
        },
      });
    } catch {
      // This error is handled by the useUpdateConferenceMutation hook
    }
  }

  if (conferenceBySlugStatus === 'error' && error) {
    return (
      <p className="text-red-500">
        {error instanceof Error
          ? error.message
          : 'Unknown error occurred. Please try again.'}
      </p>
    );
  }

  if (conferenceBySlugStatus === 'loading') {
    return (
      <p className="grid justify-start grid-flow-col gap-1">
        <Loader /> Loading conference...
      </p>
    );
  }

  if (!conference) {
    return null;
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto my-8 ">
      <h1 className="pb-8 text-3xl font-medium text-dim">{conference.name}</h1>

      <div className="flex flex-col w-full px-12 pt-10 pb-10 mx-auto space-y-8 border border-gray-700 rounded-md bg-card">
        {error ? (
          <div className="px-4 py-4 text-sm text-white bg-red-500 rounded-md bg-opacity-10">
            Error:{' '}
            {error instanceof Error
              ? error.message
              : 'Unknown error occurred. Please try again.'}
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-flow-row gap-8"
        >
          <Input
            {...register('name')}
            id="name"
            label="Name"
            placeholder="Name"
            error={errors?.name?.message}
          />

          <Input
            {...register('slug')}
            id="slug"
            label="Slug"
            placeholder="Slug"
            error={errors?.slug?.message}
            disabled
            className="text-gray-500 bg-gray-500 bg-opacity-10"
          />

          <Input
            {...register('location')}
            id="location"
            label="Location"
            placeholder="Location"
            error={errors?.location?.message}
          />

          <Input
            {...register('startDate')}
            id="startDate"
            label="Start Date"
            placeholder="Start Date"
            error={errors?.startDate?.message}
          />

          <Input
            {...register('endDate')}
            id="endDate"
            label="End Date"
            placeholder="End Date"
            error={errors?.endDate?.message}
          />

          <button
            disabled={updateConferenceStatus === 'loading'}
            className="py-3 text-xs font-medium text-white border-gray-500 rounded-md bg-header"
            type="submit"
          >
            {updateConferenceStatus === 'loading'
              ? 'Loading...'
              : 'Edit Conference'}
          </button>

          {isSubmitSuccessful && (
            <p className="text-center">Conference was successfully edited!</p>
          )}
        </form>
      </div>

      <div className="w-full py-10 mx-auto">
        <h2 className="pb-8 text-3xl font-medium text-dim">Add New Speaker</h2>

        <AddNewSpeaker />
      </div>

      <div className="w-full py-10 mx-auto">
        <h2 className="pb-8 text-3xl font-medium text-dim">Add New Talk</h2>

        <AddNewTalk />
      </div>
    </div>
  );
}

EditConferencePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthenticatedLayout title={data.pageTitle}>{page}</AuthenticatedLayout>
  );
};

export default EditConferencePage;
