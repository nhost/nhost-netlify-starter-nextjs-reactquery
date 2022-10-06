import { Loader } from '@/components/common/Loader';
import { Day } from '@/components/conferences/Day';
import { SubscribeToConference } from '@/components/conferences/SubscribeToConference';
import { DEFAULT_CONFERENCE_SLUG } from '@/data/constants';
import { data } from '@/data/info';
import BaseLayout from '@/layouts/BaseLayout';
import { getDatesInRange } from '@/utils/getDatesInRange';
import { useConferenceBySlugQuery } from '@/utils/__generated__/graphql';
import { ReactElement } from 'react';

function IndexPage() {
  const { data, status, error } = useConferenceBySlugQuery({
    slug: DEFAULT_CONFERENCE_SLUG,
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

  const [conference] = data?.conferences;

  if (!conference) {
    return null;
  }

  return (
    <>
      <div className="grid grid-flow-row gap-2 py-4 text-center sm:py-8">
        <h1 className="text-dim text-[44px] sm:text-[68px] font-semibold leading-tight drop-shadow-sm">
          <span className="stroke">
            {conference.name.substring(0, conference.name.lastIndexOf(' '))}
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-pink-700">
            {conference.name.split(' ').splice(-1)}
          </span>
        </h1>

        <div className="max-w-sm mx-auto space-y-1 text-center">
          <p> {conference.location}</p>
          <p className="text-center text-list">
            {`${new Date(conference.start_date).toDateString()} to 
              ${new Date(conference.end_date).toDateString()}`}
          </p>
        </div>

        <SubscribeToConference conferenceId={conference.id} />
      </div>

      <div className="flex flex-col max-w-4xl mx-auto">
        <div className="flex flex-col py-2 text-center">
          <div className="grid grid-cols-1 gap-4 py-5 md:grid-cols-3 gap-y-12 place-content-between">
            {getDatesInRange(conference.start_date, conference.end_date).map(
              (day, index) => (
                <Day
                  key={day.getUTCDay()}
                  dayNumber={index + 1}
                  talks={
                    conference.talks.filter(
                      (talk) =>
                        new Date(talk.start_date).getUTCDay() ===
                        day.getUTCDay(),
                    ) || []
                  }
                />
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout title={data.pageTitle}>{page}</BaseLayout>;
};

export default IndexPage;
