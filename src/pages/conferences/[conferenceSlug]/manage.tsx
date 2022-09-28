import { AddNewSpeaker } from '@/components/speakers/AddNewSpeaker';
import { AddNewTalk } from '@/components/talks/AddNewTalk';
import { data } from '@/data/info';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { ReactElement } from 'react';

function ManageConferencePage() {
  return (
    <div className=" flex flex-col max-w-3xl mx-auto my-8">
      <div className="w-full max-w-lg py-10 mx-auto">
        <h2 className="text-dim pb-8 text-3xl font-medium leading-none">
          Add New Speaker
        </h2>

        <AddNewSpeaker />
      </div>

      <div className="w-full max-w-lg py-10 mx-auto">
        <h2 className="text-dim pb-8 text-3xl font-medium leading-none">
          Add New Talk
        </h2>

        <AddNewTalk />
      </div>
    </div>
  );
}

ManageConferencePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthenticatedLayout title={data.pageTitle}>{page}</AuthenticatedLayout>
  );
};

export default ManageConferencePage;
