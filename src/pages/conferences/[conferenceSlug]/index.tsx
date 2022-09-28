import { data } from '@/data/info';
import BaseLayout from '@/layouts/BaseLayout';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

function ConferenceDetailsPage() {
  const {
    query: { conferenceSlug },
  } = useRouter();

  console.log(conferenceSlug);

  return <span>Conference</span>;
}

ConferenceDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export default ConferenceDetailsPage;
