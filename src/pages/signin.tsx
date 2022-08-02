import { useAuthenticated, useSignInEmailPassword } from '@nhost/react';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';
import { Header } from '@/components/Header';
import { useAuthenticatedRedirect } from '@/hooks/useAuthenticatedRedirect';

type SignInFormProps = {
  email: string;
  password: string;
};

export function SignInWithEmail() {
  const { signInEmailPassword, isLoading, isError, error } =
    useSignInEmailPassword();

  const { register, handleSubmit, setValue } = useForm<SignInFormProps>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormProps) => {
    const { email, password } = data;

    await signInEmailPassword(email, password);
  };

  return (
    <div className=" max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 flex flex-col px-10 py-8 space-y-4 rounded-md"
      >
        <div className="space-y-2">
          <div className="flex flex-col pt-2">
            <h1 className="text-list text-sm font-medium leading-none">
              Email
            </h1>
          </div>
          <div className="flex w-full">
            <input
              {...register('email')}
              onChange={(e) => {
                setValue('email', e.target.value);
              }}
              tabIndex={1}
              className="bg-input text-list w-full px-2 py-3 text-sm rounded-md"
              autoFocus
              id="email"
              placeholder="Email"
              required
              minLength={2}
              maxLength={128}
              spellCheck="false"
              aria-label="email"
              autoCapitalize="none"
              type="email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col pt-2">
            <h1 className="text-list text-sm font-medium leading-none">
              Password
            </h1>
          </div>
          <div className="flex mt-1">
            <input
              {...register('password')}
              onChange={(e) => {
                setValue('password', e.target.value);
              }}
              className="bg-input text-list w-full px-2 py-3 text-sm rounded-md"
              tabIndex={2}
              id="password"
              placeholder="Password"
              required
              minLength={2}
              maxLength={128}
              spellCheck="false"
              aria-label="password"
              autoCapitalize="none"
              autoComplete="false"
              type="Password"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <button
            className="text-list hover:border-white hover:text-white border-list flex items-center justify-center w-full py-2 mt-4 text-sm transition-colors duration-200 border rounded-md"
            tabIndex={3}
            type="submit"
            disabled={isLoading}
          >
            Sign In
          </button>
        </div>
      </form>

      {isError && (
        <div className="my-3">
          <p className="text-red font-medium">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}

const IndexPage = () => {
  const isAuthenticated = useAuthenticated();
  useAuthenticatedRedirect();
  return (
    <Layout title="">
      <div className="bg-header bg-grid h-screen text-white">
        <Header />
        <div className="max-w-md py-20 mx-auto">
          {!isAuthenticated ? (
            <div className="flex flex-col">
              <SignInWithEmail />
            </div>
          ) : (
            <div>Dashboard</div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default IndexPage;
