import React, { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { queryClient } from "@/client/requests/graphqlRequestClient";
import Header from "@/client/components/Header";
import useProfileHook from "@/client/hooks/useProfileHook";
import { axiosGetProfile } from "@/client/requests/axiosClient";
import { GetProfileDocument } from "@/client/generated/graphql";
import { dehydrate } from "@tanstack/react-query";
import UpdateUser from "@/client/components/user/UpdateUser";
import PostModal from "@/client/components/modals/PostModal";
import useStore from "@/client/store";

const Profile: NextPage = () => {
  const store = useStore();
  const { user } = useProfileHook();

  if (!user) return null;

  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="text-5xl font-semibold">Profile Page</p>
            <div className="mt-8">
              <p className="mb-4">ID: {user?._id}</p>
              <p className="mb-4">Name: {user?.name}</p>
              <p className="mb-4">Email: {user?.email}</p>
              <p className="mb-4">Role: {user?.role}</p>
            </div>
            <button
              className="mt-4 border border-2 p-2"
              onClick={() => store.setOpenUserModal(true)}
            >
              Update User
            </button>
          </div>
        </div>
      </section>
      <PostModal
        openModal={store.openUserModal}
        setOpenModal={store.setOpenUserModal}
      >
        <UpdateUser user={user} />
      </PostModal>
    </>
  );
};

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

export default Profile;
