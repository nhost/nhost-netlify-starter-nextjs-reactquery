import Layout from "../components/Layout";
import { useConferencesQueryQuery } from "../utils/__generated__/graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { getHours } from "date-fns";
import { Header } from ".";
import {
  useAuthenticated,
  useSignInEmailPassword,
  useSignInEmailPasswordless,
} from "@nhost/react";
import { useForm } from "react-hook-form";

type SignInFormProps = {
  email: string;
  password: string;
};

export function SignInWithEmail() {
  const { signInEmailPassword, isLoading, isSuccess, isError, error } =
    useSignInEmailPassword();

  const { register, handleSubmit, setValue } = useForm<SignInFormProps>({
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormProps) => {
    const { email, password } = data;

    await signInEmailPassword(email, password);
  };

  return (
    <div className="max-w-5xl mx-auto  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  py-8 px-10 rounded-md space-y-4 w-96"
      >
        <div className="space-y-2">
          <div className="flex flex-col pt-2">
            <h1 className="text-list text-sm font-medium leading-none">
              Email
            </h1>
          </div>
          <div className="flex w-full">
            <input
              {...register("email")}
              onChange={(e) => {
                setValue("email", e.target.value);
              }}
              tabIndex={1}
              className="rounded-md py-3 px-2 text-sm w-full bg-input text-list"
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
              {...register("password")}
              onChange={(e) => {
                setValue("password", e.target.value);
              }}
              className="rounded-md py-3 px-2 text-sm w-full bg-input text-list"
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
            className="border mt-4 py-2 text-list hover:border-white hover:text-white transition-colors duration-200 border-list text-sm rounded-md flex w-full items-center justify-center"
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
          <p className="font-medium text-red">Error: {error.message}</p>
        </div>
      )}
    </div>
  );
}

const IndexPage = () => {
  const isAuthenticated = useAuthenticated();
  return (
    <Layout title="">
      <div className="bg-header bg-grid h-screen text-white">
        <Header></Header>
        <div className="max-w-md mx-auto py-20">
          {!isAuthenticated ? (
            <div className="flex flex-col">
              <SignInWithEmail></SignInWithEmail>
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
