import { AddNewTalk } from '@/components/talks/AddNewTalk';
import { ConferenceTalks } from '@/components/talks/ConferenceTalks';
import { data } from '@/data/info';
import BaseLayout from '@/layouts/BaseLayout';
import { useAuthenticationStatus } from '@nhost/react';
import { ReactElement } from 'react';

const TalksPage = () => {
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <div className="flex flex-col max-w-5xl px-4 mx-auto my-10">
      <ConferenceTalks />

      {isAuthenticated && (
        <div className="w-full max-w-lg py-10 mx-auto">
          <h1 className="text-dim pb-8 text-3xl font-medium leading-none text-center">
            Add New Talk
          </h1>
          <AddNewTalk />
        </div>
      )}
    </div>
  );
};

TalksPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export default TalksPage;
