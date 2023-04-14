import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateUserMutation } from "@/client/generated/graphql";
import graphqlRequestClient, {
  queryClient,
} from "@/client/requests/graphqlRequestClient";
import { toast } from "react-toastify";
import useStore from "@/client/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateUserSchema,
  UpdateUserInput,
} from "@/client/schemas/user.schema";
import { IUser } from "@/client/lib/types";

const useUpdateUserHook = (user: IUser) => {
  const store = useStore();

  const { isLoading, mutate } = useUpdateUserMutation(graphqlRequestClient, {
    onSuccess() {
      store.setOpenUserModal(false);
      store.setPageLoading(false);
      queryClient.refetchQueries(["GetProfile"]);
      toast("Profile updated successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError(error: any) {
      store.setPageLoading(false);
      error.response.errors.map((err: any) => {
        toast(err.message, {
          type: "error",
          position: "top-right",
        });
      });
    },
  });

  useEffect(() => {
    if (isLoading) {
      store.setPageLoading(true);
    }
  }, [isLoading]);

  const methods = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<UpdateUserInput> = async (values) => {
    mutate({ input: values });
  };

  useEffect(() => {
    if (user) {
      methods.reset(user);
    }
  }, [user]);

  return {
    register,
    handleSubmit,
    onSubmitHandler,
    errors,
    methods,
    isLoading,
  };
};

export default useUpdateUserHook;
