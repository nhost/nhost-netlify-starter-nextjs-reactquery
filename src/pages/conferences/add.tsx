import { Input } from '@/components/common/Input';
import { data } from '@/data/info';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { queryClient } from '@/utils/react-query-client';
import {
  useAddConferenceMutation,
  useConferencesQuery,
} from '@/utils/__generated__/graphql';
import { useUserId } from '@nhost/react';
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
  const userId = useUserId();
  const { mutateAsync, isLoading, error } = useAddConferenceMutation({
    onSuccess: () => {
      queryClient.fetchQuery(
        useConferencesQuery.getKey(),
        useConferencesQuery.fetcher(),
      );
    },
  });

  const { register, handleSubmit, reset } = useForm<AddConferenceFormValues>({
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
      await mutateAsync({
        conference: {
          name: values.name,
          slug: values.slug,
          location: values.location,
          start_date: values.startDate,
          end_date: values.endDate,
          creator_user_id: userId,
        },
      });

      reset({
        name: '',
        slug: '',
        location: '',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      });
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
          <Input {...register('name')} id="name" label="Name" />
          <Input {...register('slug')} id="slug" label="Slug" />
          <Input {...register('location')} id="location" label="Location" />
          <Input {...register('startDate')} id="startDate" label="Start Date" />
          <Input {...register('endDate')} id="endDate" label="End Date" />

          <button
            disabled={isLoading}
            className="bg-header py-3 text-xs font-medium text-white border-gray-500 rounded-md"
            type="submit"
          >
            {isLoading ? 'Loading...' : 'Add New Talk'}
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
