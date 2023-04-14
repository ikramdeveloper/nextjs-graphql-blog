import React, { useEffect } from "react";
import {
  useGetProfileQuery,
  useRefreshTokenQuery,
  GetProfileQuery,
  RefreshTokenQuery,
} from "../generated/graphql";
import { IUser } from "../lib/types";
import graphqlRequestClient, {
  queryClient,
} from "../requests/graphqlRequestClient";
import useStore from "../store";

interface IAuthMiddleware {
  children: React.ReactNode;
  requireAuth?: boolean;
  enableAuth?: boolean;
}

const AuthMiddleware: React.FC<IAuthMiddleware> = ({
  children,
  requireAuth,
  enableAuth,
}) => {
  const store = useStore();
  // console.log("auth user", store.authUser);
  const query = useRefreshTokenQuery(
    graphqlRequestClient,
    {},
    {
      enabled: false,
      retry: 1,
      onError(error: any) {
        console.error("error from refresh token", error);
        store.setPageLoading(false);
        document.location.href = "/login";
      },
      onSuccess(data: RefreshTokenQuery) {
        console.log("response from refresh token", data);
        store.setPageLoading(false);
        queryClient.refetchQueries(["getProfile"]);
      },
    }
  );

  const { isLoading, isFetching } = useGetProfileQuery(
    graphqlRequestClient,
    {},
    {
      enabled: !!enableAuth && store.authUser === null,
      retry: 1,
      onError(error: any) {
        store.setPageLoading(false);
        error.response?.errors?.forEach((err: any) => {
          console.log("each error", err);
          if (
            err.message.includes("Unauthenticated") ||
            err.message.includes("Invalid session")
          ) {
            query.refetch({ throwOnError: true });
          }
        });
      },
      onSuccess(data: GetProfileQuery) {
        store.setPageLoading(false);
        store.setAuthUser(data.getProfile.user as IUser);
      },
    }
  );

  const loading =
    isLoading || isFetching || query.isLoading || query.isFetching;

  useEffect(() => {
    if (loading) {
      store.setPageLoading(true);
    }
  }, [loading]);

  return <>{children}</>;
};

export default AuthMiddleware;
