import React from "react";
import useStore from "@/client/store";
import {
  useGetProfileQuery,
  GetProfileQuery,
} from "@/client/generated/graphql";
import graphqlRequestClient from "@/client/requests/graphqlRequestClient";
import { IUser } from "@/client/lib/types";

const useProfileHook = () => {
  const store = useStore();
  const user = store.authUser;
  const query = useGetProfileQuery<GetProfileQuery, Error>(
    graphqlRequestClient,
    {},
    {
      retry: 1,
      onSuccess: (data: GetProfileQuery) => {
        store.setAuthUser(data.getProfile.user as IUser);
      },
    }
  );
  return { user };
};

export default useProfileHook;
