import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next";
import { FormProvider } from "react-hook-form";
import FormInput from "@/client/components/FormInput";
import LoadingButton from "@/client/components/LoadingButton";
import FileUploader from "@/client/components/FileUpload";
import useRegisterHook from "./hooks/useRegisterHook";

const RegisterPage: NextPage = () => {
  const { methods, handleSubmit, onSubmitHandler, isLoading } =
    useRegisterHook();

  return (
    <section className="py-8 bg-ct-blue-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
          Welcome to Web!
        </h1>
        <h2 className="text-lg text-center mb-4 text-ct-dark-200">
          Sign Up To Get Started!
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
          >
            <FormInput label="Full Name" name="name" />
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Password" name="password" type="password" />
            <FormInput
              label="Confirm Password"
              name="passwordConfirm"
              type="password"
            />
            <FileUploader name="photo" />
            <span className="block">
              Already have an account?{" "}
              <Link href="/login" className="text-ct-blue-600">
                Login Here
              </Link>
            </span>
            <LoadingButton loading={isLoading} textColor="text-ct-blue-600">
              Sign Up
            </LoadingButton>
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
export default RegisterPage;
