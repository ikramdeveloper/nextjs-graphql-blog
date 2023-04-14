import React from "react";
import { FormProvider } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import FileUpload from "../FileUpload";
import LoadingButton from "../LoadingButton";
import TextInput from "../TextInput";
import usePostHook from "./hooks/usePostHook";
import { IPost } from "@/client/lib/types";

interface ICreatePost {
  post?: IPost;
}

const CreatePost: React.FC<ICreatePost> = ({ post }) => {
  const {
    methods,
    handleSubmit,
    onSubmitHandler,
    register,
    errors,
    isLoading,
  } = usePostHook(post);

  const isPostExist = post && Object.keys(post).length;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        {isPostExist ? "Update Post" : "Create Post"}{" "}
      </h2>
      <FormProvider {...methods}>
        <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
          <TextInput name="title" label="Title" />
          <TextInput name="category" label="Category" />
          <div className="mb-2">
            <label
              htmlFor="content"
              className="block text-gray-700 text-lg mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              rows={4}
              {...register("content")}
              className={twMerge(
                `appearance-none border border-ct-dark-200 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
                `${errors.content && "border-red-500"}`
              )}
            />
            <p
              className={twMerge(
                `text-red-500 text-xs italic mb-2 invisible`,
                `${errors.content && "visible"}`
              )}
            >
              {errors.content ? errors.content.message : ""}
            </p>
          </div>
          <FileUpload name="image" />
          <LoadingButton loading={isLoading} textColor="text-ct-blue-600">
            {isPostExist ? "Update Post" : "Create Post"}
          </LoadingButton>
        </form>
      </FormProvider>
    </section>
  );
};

export default CreatePost;
