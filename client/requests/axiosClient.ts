import axios from "axios";
import { GetProfileQuery, GetAllPostsQuery } from "../generated/graphql";
const BASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosGetProfile = async (data: string, accessToken: string) => {
  const response = await authApi.post<GetProfileQuery>(
    "",
    { query: data },
    {
      headers: {
        cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const axiosGetAllPosts = async (data: string, accessToken: string) => {
  const response = await authApi.post<GetAllPostsQuery>(
    "",
    { query: data },
    {
      headers: {
        cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
