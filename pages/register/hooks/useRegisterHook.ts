import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import {
  RegisterUserMutation,
  useRegisterUserMutation,
} from "@/client/generated/graphql";
import graphqlRequestClient from "@/client/requests/graphqlRequestClient";
import { toast } from "react-toastify";
import { registerSchema, RegisterInput } from "@/client/schemas/user.schema";

const useRegisterHook = () => {
  const router = useRouter();
  const { mutate, isLoading } = useRegisterUserMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess(data: RegisterUserMutation) {
        if (data.registerUser.success) {
          reset();
          toast(`Welcome ${data.registerUser.user.name}!`, {
            type: "success",
            position: "top-right",
          });
          router.push("/login");
        }
      },
      onError(error: any) {
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: "error",
            position: "top-right",
          });
        });
      },
    }
  );

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { reset, handleSubmit, formState } = methods;

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    mutate({ input: values });
  };

  return { methods, handleSubmit, onSubmitHandler, isLoading };
};

export default useRegisterHook;
