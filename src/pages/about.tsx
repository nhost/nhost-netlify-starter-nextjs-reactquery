import { Header } from '@/components/Header';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout title="Nhost & Netlify Starter Template">
      <div className="bg-grid bg-header h-screen text-white">
        <Header />
        <div className="flex flex-col max-w-2xl mx-auto my-12 text-center">
          <h1 className="text-dim text-2xl font-semibold leading-none text-center">
            Nhost Netlify Starter Template
          </h1>
          <p className="pt-2 text-center">
            This is an example front-end for the multi-conference example app
            created with Nhost. It uses Next.js, React-Query, Tailwind, Nhost as
            the backend (authentication, Postgres Database, GraphQL API) and
            Netlify to host the front-end.
          </p>
          <div className="flex flex-col mt-10">
            <a>
              https://github.com/nhost/nhost-netlify-starter-nextjs-reactquery
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
