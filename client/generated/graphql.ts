import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['String'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String'];
  success: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostResponse;
  deletePost: PostDeleteResponse;
  loginUser: LoginResponse;
  registerUser: UserResponse;
  updatePost: PostResponse;
  updateUser: LogoutResponse;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationRegisterUserArgs = {
  input: SignUpInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['String'];
  input: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateInput>;
};

export type PostData = {
  __typename?: 'PostData';
  _id: Scalars['String'];
  category: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  image: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
};

export type PostDeleteResponse = {
  __typename?: 'PostDeleteResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type PostFilter = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};

export type PostInput = {
  category: Scalars['String'];
  content: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type PostListResponse = {
  __typename?: 'PostListResponse';
  posts: Array<PostPopulatedData>;
  results: Scalars['Float'];
  success: Scalars['Boolean'];
};

export type PostPopulatedData = {
  __typename?: 'PostPopulatedData';
  _id: Scalars['String'];
  category: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  image: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: UserData;
};

export type PostPopulatedResponse = {
  __typename?: 'PostPopulatedResponse';
  post: PostPopulatedData;
  success: Scalars['Boolean'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  post: PostData;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getPost: PostPopulatedResponse;
  getPosts: PostListResponse;
  getProfile: UserResponse;
  logoutUser: LogoutResponse;
  refreshToken: LoginResponse;
};


export type QueryGetPostArgs = {
  id: Scalars['String'];
};


export type QueryGetPostsArgs = {
  input?: InputMaybe<PostFilter>;
};

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
  photo?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type UpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
};

export type UpdatePostInput = {
  category?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UserData = {
  __typename?: 'UserData';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  photo: Scalars['String'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  message: Scalars['String'];
  success: Scalars['String'];
  user: UserData;
};

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', success: boolean, post: { __typename?: 'PostData', _id: string, title: string, content: string, image: string, category: string, createdAt: any, updatedAt: any } } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'PostDeleteResponse', success: boolean, message: string } };

export type GetAllPostsQueryVariables = Exact<{
  input: PostFilter;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PostListResponse', success: boolean, results: number, posts: Array<{ __typename?: 'PostPopulatedData', _id: string, title: string, content: string, category: string, image: string, createdAt: any, updatedAt: any, user: { __typename?: 'UserData', email: string, name: string, photo: string } }> } };

export type GetPostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost: { __typename?: 'PostPopulatedResponse', success: boolean, post: { __typename?: 'PostPopulatedData', _id: string, title: string, content: string, image: string, category: string, createdAt: any, updatedAt: any, user: { __typename?: 'UserData', email: string, name: string, photo: string } } } };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
  id: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostResponse', success: boolean, post: { __typename?: 'PostData', _id: string, title: string, content: string, category: string, image: string, createdAt: any, updatedAt: any } } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'UserResponse', success: string, user: { __typename?: 'UserData', _id: string, name: string, email: string, role: string, photo: string, updatedAt: any, createdAt: any } } };

export type LoginUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResponse', success: string, accessToken: string } };

export type LogoutUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserQuery = { __typename?: 'Query', logoutUser: { __typename?: 'LogoutResponse', success: string, message: string } };

export type RefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken: { __typename?: 'LoginResponse', success: string, accessToken: string } };

export type RegisterUserMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'UserResponse', success: string, user: { __typename?: 'UserData', name: string, email: string, photo: string, role: string, createdAt: any, updatedAt: any } } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'LogoutResponse', success: string, message: string } };


export const CreatePostDocument = `
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    success
    post {
      _id
      title
      content
      image
      category
      createdAt
      updatedAt
    }
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['CreatePost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    );
export const DeletePostDocument = `
    mutation DeletePost($id: String!) {
  deletePost(id: $id) {
    success
    message
  }
}
    `;
export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      ['DeletePost'],
      (variables?: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(client, DeletePostDocument, variables, headers)(),
      options
    );
export const GetAllPostsDocument = `
    query GetAllPosts($input: PostFilter!) {
  getPosts(input: $input) {
    success
    results
    posts {
      _id
      title
      content
      category
      image
      user {
        email
        name
        photo
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export const useGetAllPostsQuery = <
      TData = GetAllPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAllPostsQueryVariables,
      options?: UseQueryOptions<GetAllPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllPostsQuery, TError, TData>(
      ['GetAllPosts', variables],
      fetcher<GetAllPostsQuery, GetAllPostsQueryVariables>(client, GetAllPostsDocument, variables, headers),
      options
    );
export const GetPostDocument = `
    query GetPost($id: String!) {
  getPost(id: $id) {
    success
    post {
      _id
      title
      content
      image
      category
      user {
        email
        name
        photo
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export const useGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostQueryVariables,
      options?: UseQueryOptions<GetPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostQuery, TError, TData>(
      ['GetPost', variables],
      fetcher<GetPostQuery, GetPostQueryVariables>(client, GetPostDocument, variables, headers),
      options
    );
export const UpdatePostDocument = `
    mutation UpdatePost($input: UpdatePostInput!, $id: String!) {
  updatePost(input: $input, id: $id) {
    success
    post {
      _id
      title
      content
      category
      image
      createdAt
      updatedAt
    }
  }
}
    `;
export const useUpdatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      ['UpdatePost'],
      (variables?: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(client, UpdatePostDocument, variables, headers)(),
      options
    );
export const GetProfileDocument = `
    query GetProfile {
  getProfile {
    success
    user {
      _id
      name
      email
      role
      photo
      updatedAt
      createdAt
    }
  }
}
    `;
export const useGetProfileQuery = <
      TData = GetProfileQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetProfileQueryVariables,
      options?: UseQueryOptions<GetProfileQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetProfileQuery, TError, TData>(
      variables === undefined ? ['GetProfile'] : ['GetProfile', variables],
      fetcher<GetProfileQuery, GetProfileQueryVariables>(client, GetProfileDocument, variables, headers),
      options
    );
export const LoginUserDocument = `
    mutation LoginUser($input: LoginInput!) {
  loginUser(input: $input) {
    success
    accessToken
  }
}
    `;
export const useLoginUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginUserMutation, TError, LoginUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginUserMutation, TError, LoginUserMutationVariables, TContext>(
      ['LoginUser'],
      (variables?: LoginUserMutationVariables) => fetcher<LoginUserMutation, LoginUserMutationVariables>(client, LoginUserDocument, variables, headers)(),
      options
    );
export const LogoutUserDocument = `
    query LogoutUser {
  logoutUser {
    success
    message
  }
}
    `;
export const useLogoutUserQuery = <
      TData = LogoutUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: LogoutUserQueryVariables,
      options?: UseQueryOptions<LogoutUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LogoutUserQuery, TError, TData>(
      variables === undefined ? ['LogoutUser'] : ['LogoutUser', variables],
      fetcher<LogoutUserQuery, LogoutUserQueryVariables>(client, LogoutUserDocument, variables, headers),
      options
    );
export const RefreshTokenDocument = `
    query RefreshToken {
  refreshToken {
    success
    accessToken
  }
}
    `;
export const useRefreshTokenQuery = <
      TData = RefreshTokenQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: RefreshTokenQueryVariables,
      options?: UseQueryOptions<RefreshTokenQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RefreshTokenQuery, TError, TData>(
      variables === undefined ? ['RefreshToken'] : ['RefreshToken', variables],
      fetcher<RefreshTokenQuery, RefreshTokenQueryVariables>(client, RefreshTokenDocument, variables, headers),
      options
    );
export const RegisterUserDocument = `
    mutation RegisterUser($input: SignUpInput!) {
  registerUser(input: $input) {
    success
    user {
      name
      email
      photo
      role
      createdAt
      updatedAt
    }
  }
}
    `;
export const useRegisterUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>(
      ['RegisterUser'],
      (variables?: RegisterUserMutationVariables) => fetcher<RegisterUserMutation, RegisterUserMutationVariables>(client, RegisterUserDocument, variables, headers)(),
      options
    );
export const UpdateUserDocument = `
    mutation UpdateUser($input: UpdateInput!) {
  updateUser(input: $input) {
    success
    message
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers)(),
      options
    );