import { useEffect } from "react";
import Head from "next/head";
import type { NextPage, GetServerSideProps, GetStaticPaths } from "next";
import Header from "@/client/components/Header";
import useStore from "@/client/store";
import {
  GetProfileDocument,
  useGetAllPostsQuery,
} from "@/client/generated/graphql";
import graphqlRequestClient, {
  queryClient,
} from "@/client/requests/graphqlRequestClient";
import { toast } from "react-toastify";
import Message from "@/client/components/Message";
import {
  axiosGetAllPosts,
  axiosGetProfile,
} from "@/client/requests/axiosClient";
import { dehydrate } from "@tanstack/react-query";
import PostItem from "@/client/components/posts/PostItem";

const Home: NextPage = () => {
  const store = useStore();
  const { isLoading, data: posts } = useGetAllPostsQuery(
    graphqlRequestClient,
    { input: { limit: 10, page: 1 } },
    {
      select: (data) => data.getPosts.posts,
      onError(error: any) {
        store.setPageLoading(false);
        error.response.errors.forEach((err: any) => {
          toast(err.message, {
            type: "error",
            position: "top-right",
          });
        });
      },
      onSuccess() {
        store.setPageLoading(false);
      },
    }
  );

  useEffect(() => {
    if (isLoading) {
      store.setPageLoading(true);
    }
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div>
          {!posts?.length ? (
            <Message>No post at the moment</Message>
          ) : (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 px-6">
              {posts?.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// export const getStaticPaths: GetStaticPaths = async (args) => {
//   console.log("args", args);
//   let products: any = [];
//   // if(args.req.cookies.access_token) {
//   //   product = await axiosGetAllPosts()
//   // }
//   return {
//     paths: products.map((item: any) => {
//       return {
//         params: {
//           postId: item._id,
//         },
//       };
//     }),
//     fallback: false,
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.access_token) {
    await queryClient.prefetchQuery(["getProfile", {}], () =>
      axiosGetProfile(GetProfileDocument, req.cookies.access_token as string)
    );
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      requireAuth: true,
      enableAuth: true,
    },
  };
};

export default Home;
