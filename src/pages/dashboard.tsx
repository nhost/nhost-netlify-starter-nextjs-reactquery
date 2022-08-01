import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { AddNewSpeaker } from '@/components/speakers/AddNewSpeaker';
import { AddNewTalk } from '@/components/talks/AddNewTalk';
import { useAuthenticated } from '@nhost/react';

const Dashboard = () => {
  const isAuthenticated = useAuthenticated();

  return (
    <Layout title="Nhost & Netlify NextJS React Query Starter Example">
      <div className="bg-grid bg-header h-full text-white">
        <Header />
        <div className=" flex flex-col max-w-3xl mx-auto my-8">
          {isAuthenticated ? (
            <div className="w-full max-w-lg py-10 mx-auto">
              <h1 className="text-dim pb-8 text-3xl font-medium leading-none">
                Add New Talk
              </h1>
              <AddNewTalk />
            </div>
          ) : null}
          {isAuthenticated ? (
            <div className="w-full max-w-lg py-10 mx-auto">
              <h1 className="text-dim pb-8 text-3xl font-medium leading-none">
                Add New Speaker
              </h1>
              <AddNewSpeaker />
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;
