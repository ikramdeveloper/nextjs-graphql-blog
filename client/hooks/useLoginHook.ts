import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
  GetProfileQuery,
} from "@/client/generated/graphql";
import graphqlRequestClient from "@/client/requests/graphqlRequestClient";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useStore from "@/client/store";
import { IUser } from "@/client/lib/types";
import { loginSchema, LoginInput } from "@/client/schemas/user.schema";

const useLoginHook = () => {
  const router = useRouter();
  const store = useStore();

  const query = useGetProfileQuery(
    graphqlRequestClient,
    {},
    {
      enabled: false,
      onSuccess: (data: GetProfileQuery) => {
        store.setAuthUser(data.getProfile.user as IUser);
      },
    }
  );

  const { isLoading, mutate } = useLoginUserMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: LoginUserMutation) {
        if (data.loginUser.success) reset();
        toast("Logged in successfully", {
          type: "success",
          position: "top-right",
        });
        query.refetch();
        router.push("/profile");
      },
      onError(error: any) {
        reset({
          password: "",
        });
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: "error",
            position: "top-right",
          });
        });
      },
    }
  );

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //   }
  // }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    mutate({ input: values });
  };

  return { methods, handleSubmit, onSubmitHandler, isLoading };
};

export default useLoginHook;
