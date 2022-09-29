import { Loader } from '@/components/common/Loader';
import { ConferenceDetails } from '@/components/conferences/ConferenceDetails';
import { data } from '@/data/info';
import BaseLayout from '@/layouts/BaseLayout';
import { useConferenceBySlugQuery } from '@/utils/__generated__/graphql';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

function ConferenceDetailsPage() {
  const {
    query: { conferenceSlug },
  } = useRouter();

  const { data, status, error } = useConferenceBySlugQuery({
    slug: conferenceSlug as string,
  });

  if (status === 'error' && error) {
    return (
      <p className="text-red-500">
        {error instanceof Error
          ? error.message
          : 'Unknown error occurred. Please try again later.'}
      </p>
    );
  }

  if (status === 'loading') {
    return (
      <p className="grid justify-start grid-flow-col gap-1">
        <Loader /> Loading conference...
      </p>
    );
  }

  return <ConferenceDetails conference={data?.conferences?.[0]} />;
}

ConferenceDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export default ConferenceDetailsPage;
