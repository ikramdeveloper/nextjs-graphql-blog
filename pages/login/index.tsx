import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import FormInput from "@/client/components/FormInput";
import LoadingButton from "@/client/components/LoadingButton";
import useLoginHook from "./hooks/useLoginHook";

const LoginPage: NextPage = () => {
  const { methods, handleSubmit, onSubmitHandler, isLoading } = useLoginHook();

  return (
    <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
          Welcome Back
        </h1>
        <h2 className="text-lg text-center mb-4 text-ct-dark-200">
          Login to have access
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
          >
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Password" name="password" type="password" />

            <div className="text-right">
              <Link href="#" className="">
                Forgot Password?
              </Link>
            </div>
            <LoadingButton loading={isLoading} textColor="text-ct-blue-600">
              Login
            </LoadingButton>
            <span className="block">
              Need an account?{" "}
              <Link href="/register" className="text-ct-blue-600">
                Sign Up Here
              </Link>
            </span>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      requireAuth: false,
      enableAuth: false,
    },
  };
};

export default LoginPage;
