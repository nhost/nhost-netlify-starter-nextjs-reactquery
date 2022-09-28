import { Input } from '@/components/common/Input';
import { data } from '@/data/info';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { queryClient } from '@/utils/react-query-client';
import {
  useAddConferenceMutation,
  useConferencesQuery,
} from '@/utils/__generated__/graphql';
import { useUserId } from '@nhost/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

type AddConferenceFormValues = {
  name: string;
  slug: string;
  location: string;
  startDate: string;
  endDate: string;
};

function AddConferencePage() {
  const router = useRouter();
  const userId = useUserId();

  const {
    mutateAsync: addConference,
    status,
    error,
  } = useAddConferenceMutation({
    onSuccess: () => {
      queryClient.fetchQuery(
        useConferencesQuery.getKey(),
        useConferencesQuery.fetcher(),
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddConferenceFormValues>({
    defaultValues: {
      name: '',
      slug: '',
      location: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
  });

  async function onSubmit(values: AddConferenceFormValues) {
    try {
      await addConference({
        conference: {
          name: values.name,
          slug: values.slug,
          location: values.location,
          start_date: values.startDate,
          end_date: values.endDate,
          creator_user_id: userId,
        },
      });

      await router.push(`/conferences/${values.slug}/edit`);
    } catch {
      // This error is handled by useAddConferenceMutation
    }
  }

  return (
    <div className="py-4">
      <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
        Add New Conference
      </h1>

      <div className="bg-card flex flex-col w-full max-w-lg px-12 pt-10 pb-10 mx-auto space-y-8 border border-gray-700 rounded-md">
        {error ? (
          <div className="bg-opacity-10 px-4 py-4 text-sm text-white bg-red-500 rounded-md">
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
            disabled={status === 'loading'}
            className="bg-header py-3 text-xs font-medium text-white border-gray-500 rounded-md"
            type="submit"
          >
            {status === 'loading' ? 'Loading...' : 'Create Conference'}
          </button>
        </form>
      </div>
    </div>
  );
}

AddConferencePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthenticatedLayout title={data.pageTitle}>{page}</AuthenticatedLayout>
  );
};

export default AddConferencePage;
