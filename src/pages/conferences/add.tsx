import { Input } from '@/components/common/Input';
import { data } from '@/data/info';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
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
  const { register, handleSubmit } = useForm<AddConferenceFormValues>({
    defaultValues: {
      name: '',
      slug: '',
      location: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
  });

  function onSubmit(values: AddConferenceFormValues) {
    console.log(values);
  }

  return (
    <div className="bg-card flex flex-col w-full px-12 pt-10 pb-10 space-y-8 border border-gray-700 rounded-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-flow-row gap-8"
      >
        <Input {...register('name')} id="name" label="Name" />
        <Input {...register('slug')} id="slug" label="Slug" />
        <Input {...register('location')} id="location" label="Location" />
        <Input {...register('startDate')} id="startDate" label="Start Date" />
        <Input {...register('endDate')} id="endDate" label="End Date" />
      </form>
    </div>
  );
}

AddConferencePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthenticatedLayout title={data.pageTitle}>{page}</AuthenticatedLayout>
  );
};

export default AddConferencePage;
