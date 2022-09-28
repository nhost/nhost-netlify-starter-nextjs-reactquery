import { AddNewSpeaker } from '@/components/speakers/AddNewSpeaker';
import { Speakers } from '@/components/speakers/Speakers';
import { data } from '@/data/info';
import BaseLayout from '@/layouts/BaseLayout';
import { useAuthenticationStatus } from '@nhost/react';
import { ReactElement } from 'react';

const SpeakersPage = () => {
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <div className="flex flex-col max-w-5xl px-4 mx-auto my-10">
      <Speakers />

      {isAuthenticated ? (
        <div className="w-full max-w-lg py-10 mx-auto">
          <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
            Add New Speaker
          </h1>
          <AddNewSpeaker />
        </div>
      ) : null}
    </div>
  );
};

SpeakersPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export default SpeakersPage;
