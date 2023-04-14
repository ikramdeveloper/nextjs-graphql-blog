import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import graphqlRequestClient from "@/client/requests/graphqlRequestClient";
import { GetPostDocument, useGetPostQuery } from "@/client/generated/graphql";
import { useRouter } from "next/router";
import useStore from "@/client/store";
import Header from "@/client/components/Header";
import Image from "next/image";

const PostDetails = () => {
  const store = useStore();
  const { query } = useRouter();
  const id = query.id as string;

  const { isLoading, data: post } = useGetPostQuery(
    graphqlRequestClient,
    { id },
    {
      select: (data) => data.getPost.post,
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

  if (!post) return;

  return (
    <>
      <Head>
        <title>Details | {post.title}</title>
      </Head>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20 px-5">
        <article>
          <h3>{post.title}</h3>
          <figure>
            <Image src={post.image} alt={post.title} width={100} height={100} />
          </figure>
        </article>
        <article>{post.content}</article>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies.access_token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      requireAuth: true,
      enableAuth: true,
    },
  };
};

export default PostDetails;
