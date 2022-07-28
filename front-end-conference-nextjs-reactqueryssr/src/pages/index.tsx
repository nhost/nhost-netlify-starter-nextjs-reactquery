import Layout from "../components/Layout";
import {
  ConferencesQueryQuery,
  useConferencesQueryQuery,
  useUpdateTalkMutation,
} from "../utils/__generated__/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { getHours } from "date-fns";
import { useUserEmail } from "@nhost/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import InlineInput from "../components/ui/InlineInput";
import { useState } from "react";

export function Header() {
  const { asPath } = useRouter();
  const userEmail = useUserEmail();
  return (
    <header className="border-b bg-header border-b-brd sticky">
      <div className="place-content-between flex flex-row max-w-5xl mx-auto py-4">
        <div className="flex w-48">
          <Link href="/">
            <a className="text-md cursor-pointer self-center">Conference</a>
          </Link>
        </div>
        <div className="flex flex-row list-none text-list  font-medium text-sm self-center space-x-2 w-52">
          <li
            className={clsx(
              "hover:text-white py-1 px-2 cursor-pointer",
              asPath === "/speakers" && "text-white"
            )}
          >
            <Link href="speakers">Speakers</Link>
          </li>
          <li
            className={clsx(
              "hover:text-white py-1 px-2 cursor-pointer",
              asPath === "/talks" && "text-white"
            )}
          >
            <Link href="talks">Talks</Link>
          </li>
          {/* <li
            className={clsx(
              "hover:text-white py-1 px-2 cursor-pointer",
              asPath === "/sponsors" && "text-white"
            )}
          >
            Sponsors
          </li> */}
          <li
            className={clsx(
              "hover:text-white py-1 px-2 cursor-pointer",
              asPath === "/about" && "text-white"
            )}
          >
            <Link href="about">About</Link>
          </li>
        </div>
        <div className="flex w-48">
          {userEmail ? (
            <div>
              <button className="text-xs border py-1 px-2 rounded-md">
                {userEmail}
              </button>
            </div>
          ) : (
            <Link href="signin">
              <button className="border text-xs py-1.5 text-list hover:border-white hover:text-white transition-colors duration-200 border-list rounded-md flex w-full items-center justify-center">
                Organizer Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
function getDatesInRange(startDate, endDate) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export function FeaturedConference() {
  const { data, isLoading, isError } = useConferencesQueryQuery();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="">
      <div className="mx-auto max-w-4xl ">
        <div className="text-center py-14">
          <h1 className="text-dim text-[68px] font-semibold leading-none drop-shadow-sm">
            <span className="stroke">
              {data.conferences[0].name.substring(
                0,
                data.conferences[0].name.lastIndexOf(" ")
              )}
            </span>{" "}
            <span className="gradient">
              {data.conferences[0].name.split(" ").splice(-1)}
            </span>
          </h1>
          <div className="mx-auto max-w-sm mt-2 space-y-1 text-center">
            <p> {data.conferences[0].location}</p>
            <p className="text-center text-list">
              {new Date(data.conferences[0].start_date).toDateString()} to{" "}
              {new Date(data.conferences[0].end_date).toDateString()}
              {console.log(new Date(data.conferences[0].start_date))}
            </p>
          </div>
          <div className="mx-auto max-w-sm mt-4">
            <button className="py-2.5 bg-gradient-to-r from-indigo-800  to-pink-900  px-2 rounded-md text-white text-sm font-medium">
              Get your ticket
            </button>
          </div>
        </div>
      </div>
      <Agenda
        amountOfDays={getDatesInRange(
          data.conferences[0].start_date,
          data.conferences[0].end_date
        )}
      ></Agenda>
    </div>
  );
}

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5 absolute right-6 top-2 "
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

export function Talk({ id, name, speaker, startDate, endDate }) {
  const { mutate, isLoading } = useUpdateTalkMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(name);

  const startMinutes =
    new Date(startDate).getUTCMinutes() === 0
      ? "00"
      : new Date(startDate).getUTCMinutes();
  const endMinutes =
    new Date(endDate).getUTCMinutes() === 0
      ? "00"
      : new Date(endDate).getUTCMinutes();
  return (
    <div className="flex flex-col border border-gray-700 rounded-md py-5 bg-card w-full">
      <h2 className="font-medium text-dim text-xs">
        {startDate
          ? `${new Date(startDate).getUTCHours()}:${startMinutes} to ${new Date(
              endDate
            ).getUTCHours()}:${endMinutes} UTC`
          : "-"}
      </h2>
      {/* <div className="flex flex-row self-center align-middle">
        <div className="flex relative">
          <InlineInput
            className="flex font-medium bg-transparent text-xl text-center"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          ></InlineInput>
          <EditIcon></EditIcon>
        </div>
      </div> */}

      {/* <button
        onClick={async () => {
          await mutate({
            id,
            talk: {
              name: nameInput,
            },
          });
        }}
      >
        save
      </button> */}
      <h1 className="font-medium text-white text-lg"> {name}</h1>

      <h1 className="font-medium text-white text-xs"> by {speaker}</h1>
    </div>
  );
}

function Day({ talks, dayNumber }) {
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="font-semibold text-white text-xl">Day {dayNumber}</h2>
      {talks.map((talk) => {
        return (
          <Talk
            key={talk.id}
            id={talk.id}
            name={talk.name}
            speaker={talk.speaker.name}
            startDate={talk.start_date}
            endDate={talk.end_date}
          />
        );
      })}
    </div>
  );
}

export function Agenda({ amountOfDays }) {
  const { data, isLoading, isError } = useConferencesQueryQuery();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const biggerThanThreeDays =
    amountOfDays.length > 3
      ? amountOfDays.length === 4
        ? "grid-cols-4"
        : "grid-cols-5"
      : "";

  return (
    <div className="mx-auto max-w-4xl flex flex-col">
      <div className="text-center">
        <h1 className="text-dim text-3xl font-medium leading-none text-center ">
          Agenda
        </h1>
      </div>

      <div className="flex flex-col py-4 text-center">
        <div
          className={clsx(
            "grid grid-cols-3 py-5 gap-y-12 gap-8 place-content-between",
            biggerThanThreeDays
          )}
        >
          {amountOfDays.map((day, index) => {
            return (
              <Day
                dayNumber={index + 1}
                talks={data.conferences[0].talks.filter((talk) => {
                  return (
                    new Date(talk.start_date).getUTCDay() === day.getUTCDay()
                  );
                })}
              ></Day>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const IndexPage = () => {
  const { isLoading, isError } =
    useConferencesQueryQuery<ConferencesQueryQuery>();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="bg-header bg-grid h-screen text-white">
        <Header></Header>
        <FeaturedConference></FeaturedConference>
      </div>
    </Layout>
  );
};
export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useConferencesQueryQuery.getKey(),
    useConferencesQueryQuery.fetcher()
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default IndexPage;
