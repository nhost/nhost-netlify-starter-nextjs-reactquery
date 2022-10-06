import { AddNewTalk } from '@/components/talks/AddNewTalk';
import { TalksGrid } from '@/components/talks/TalksGrid';
import { data } from '@/data/info';
import BaseLayout from '@/layouts/BaseLayout';
import { useAuthenticationStatus } from '@nhost/react';
import { ReactElement } from 'react';

function TalksPage() {
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <div className="grid grid-flow-row gap-2 py-4">
      <TalksGrid />

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
}

TalksPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export default TalksPage;
