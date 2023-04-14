import React, { useEffect } from "react";
import graphqlRequestClient, {
  queryClient,
} from "@/client/requests/graphqlRequestClient";
import { useDeletePostMutation } from "@/client/generated/graphql";
import useStore from "@/client/store";
import { toast } from "react-toastify";

const useDeletePostHook = () => {
  const store = useStore();
  const { isLoading, mutate: deletePost } = useDeletePostMutation(
    graphqlRequestClient,
    {
      onSuccess() {
        store.setPageLoading(false);
        queryClient.refetchQueries(["GetAllPosts"]);
        toast("Post deleted successfully", {
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
    }
  );

  useEffect(() => {
    if (isLoading) {
      store.setPageLoading(true);
    }
  }, [isLoading]);

  return { deletePost };
};

export default useDeletePostHook;
