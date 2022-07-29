import { Header } from '@/components/Header';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="bg-grid bg-header h-screen text-white">
        <Header />
        <div className="flex flex-col max-w-2xl mx-auto my-12 text-center">
          <h1 className="text-dim text-2xl font-semibold leading-none text-center">
            NextJS and Nhost Starter
          </h1>
          <p className="pt-2 text-center">
            This is an example project using Vue.js and Nhost to create a simple
            conference management application.
          </p>
          <div className="flex flex-col mt-10">
            <a>https://github.com/nhost/vue-netlify-starter</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
