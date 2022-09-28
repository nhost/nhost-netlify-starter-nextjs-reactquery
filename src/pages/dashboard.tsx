import { Header } from '@/components/Header';
import Layout from '@/components/Layout';
import { AddNewSpeaker } from '@/components/speakers/AddNewSpeaker';
import { AddNewTalk } from '@/components/talks/AddNewTalk';
import { data } from '@/data/info';
import { useAuthenticationStatus } from '@nhost/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  if (!isAuthenticated) {
    return <Layout title={data.pageTitle} />;
  }

  return (
    <Layout title={data.pageTitle}>
      <div className="bg-grid bg-header h-full text-white">
        <Header />

        <div className=" flex flex-col max-w-3xl mx-auto my-8">
          <div className="w-full max-w-lg py-10 mx-auto">
            <h2 className="text-dim pb-8 text-3xl font-medium leading-none">
              Add New Speaker
            </h2>
            <AddNewSpeaker />
          </div>

          <div className="w-full max-w-lg py-10 mx-auto">
            <h2 className="text-dim pb-8 text-3xl font-medium leading-none">
              Add New Talk
            </h2>

            <AddNewTalk />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
