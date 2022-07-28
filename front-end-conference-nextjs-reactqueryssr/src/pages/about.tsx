import { Agenda, FeaturedConference, Header } from ".";
import Layout from "../components/Layout";
import { useSpeakersQuery } from "../utils/__generated__/graphql";

function Speaker({ avatarUrl, name, social, job }) {
  return (
    <div className="flex flex-col border border-dim p-2 transition-all duration-150 ease-in rounded-md">
      <img
        className="object-cover rounded-md aspect-square p-0.5"
        width={350}
        height={350}
        src={avatarUrl}
      ></img>
      <div className="py-2">
        <h1 className="font-medium text-white text-lg">{name}</h1>
        <h2 className="font-medium text-dim text-xs">@{social}</h2>
        <h2 className="font-medium text-dim text-sm mt-2">{job}</h2>
      </div>
    </div>
  );
}

const About = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
     <div className="bg-grid bg-header h-screen text-white">
        <Header></Header>
        <div className="mx-auto max-w-2xl flex flex-col my-20 text-center">
          <h1 className="text-dim text-2xl text-center font-semibold leading-none">
            NextJS and Nhost Starter
          </h1>
          <p className="text-center pt-2">
            This is an example project using Vue.js and Nhost to create a simple
            conference management application.
          </p>
          <div className="mt-10 flex flex-col">
            <a>https://github.com/nhost/vue-netlify-starter</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
