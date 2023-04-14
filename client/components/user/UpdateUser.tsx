import React from "react";
import { FormProvider } from "react-hook-form";
import useUpdateUserHook from "@/pages/profile/hooks/useUpdateUserHook";
import TextInput from "../TextInput";
import FileUpload from "../FileUpload";
import LoadingButton from "../LoadingButton";
import { IUser } from "@/client/lib/types";

interface IUpdateUser {
  user: IUser;
}

const UpdateUser: React.FC<IUpdateUser> = ({ user }) => {
  const { methods, handleSubmit, onSubmitHandler, isLoading } =
    useUpdateUserHook(user);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Update User</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
          <TextInput name="name" label="Name" />
          <TextInput name="email" label="Email" type="email" />
          <FileUpload name="photo" />
          <LoadingButton loading={isLoading} textColor="text-ct-blue-600">
            Update User
          </LoadingButton>
        </form>
      </FormProvider>
    </section>
  );
};

export default UpdateUser;
