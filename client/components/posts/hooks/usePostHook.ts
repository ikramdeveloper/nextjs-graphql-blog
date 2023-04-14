import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/client/generated/graphql";
import graphqlRequestClient, {
  queryClient,
} from "@/client/requests/graphqlRequestClient";
import { toast } from "react-toastify";
import useStore from "@/client/store";
import { postSchema, PostInput } from "@/client/schemas/post.schema";
import { IPost } from "@/client/lib/types";

const usePostHook = (post?: IPost) => {
  const store = useStore();

  // Create Post Mutation
  const { isLoading: isCreateLoading, mutate: createPost } =
    useCreatePostMutation(graphqlRequestClient, {
      onSuccess() {
        store.setPageLoading(false);
        store.setOpenModal(false);
        queryClient.refetchQueries(["GetAllPosts"]);
        toast("Post created successfully", {
          type: "success",
          position: "top-right",
        });
      },
      onError(error: any) {
        store.setPageLoading(false);
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: "error",
            position: "top-right",
          });
        });
      },
    });

  // Update Post Mutation
  const { isLoading: isUpdateLoading, mutate: updatePost } =
    useUpdatePostMutation(graphqlRequestClient, {
      onSuccess() {
        store.setPageLoading(false);
        store.setOpenModal(false);
        queryClient.refetchQueries(["GetAllPosts"]);
        toast("Post updated successfully", {
          type: "success",
          position: "top-right",
        });
      },
      onError(error: any) {
        store.setPageLoading(false);
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: "error",
            position: "top-right",
          });
        });
      },
    });

  const methods = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const isLoading = isCreateLoading || isUpdateLoading;

  useEffect(() => {
    if (isLoading) {
      store.setPageLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (post) {
      methods.reset(post);
    }
  }, []);

  const onSubmitHandler: SubmitHandler<PostInput> = async (data) => {
    if (post && Object.keys(post)?.length) {
      updatePost({ input: data, id: post?._id });
    } else {
      createPost({ input: data });
    }
  };

  return {
    isLoading,
    handleSubmit,
    register,
    onSubmitHandler,
    errors,
    methods,
  };
};

export default usePostHook;
