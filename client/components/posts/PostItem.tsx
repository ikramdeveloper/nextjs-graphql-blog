import React, { useState, useRef, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { IPost } from "@/client/lib/types";
import PostModal from "../modals/PostModal";
import CreatePost from "./CreatePost";
import useDeletePostHook from "./hooks/useDeletePostHook";
import useStore from "@/client/store";

interface IPostProps {
  post: IPost;
}

const PostItem: React.FC<IPostProps> = ({ post }) => {
  const store = useStore();
  const menuRef = useRef<HTMLUListElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { deletePost } = useDeletePostHook();

  const toggleMenu = () => {
    setOpenMenu((pre) => !pre);
  };

  const onDeleteHandler = (id: string) => {
    toggleMenu();
    if (window.confirm("Are you sure to delete it?")) {
      deletePost({ id });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <div className="rounded-md shadow-md bg-white">
        <figure className="mx-2 mt-2 overflow-hidden rounded-md">
          <Image
            src={post.image}
            alt={post.title}
            width={300}
            height={200}
            className="object-fill"
          />
        </figure>
        <article className="p-4">
          <h5 className="font-semibold text-xl text-[#4d4d4d] mb-4">
            {post.title.length > 25
              ? post.title.substring(0, 25) + "..."
              : post.title}
          </h5>
          <div className="flex items-center mt-4">
            <p className="p-1 rounded-sm mr-4 bg-[#dad8d8]">{post.category}</p>
            <p className="text-[#ffa238]">
              {format(parseISO(post.createdAt), "PPP")}
            </p>
          </div>
        </article>
        <article className="flex justify-between items-center px-4 pb-4">
          <div className="flex items-center">
            <figure className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={post.user.photo}
                alt={post.user.name}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </figure>
            <p className="ml-4 text-sm font-semibold ">{post.user.name}</p>
          </div>
          <div className="relative">
            <div
              className="text-[#4d4d4d] cursor-pointer p-3"
              onClick={toggleMenu}
            >
              <span>Menu</span>
            </div>
            <ul
              ref={menuRef}
              className={twMerge(
                `absolute bottom-5 -right-1 z-50 py-2 rounded-sm bg-white shadow-lg transition ease-out duration-300 invisible`,
                `${openMenu ? "visible" : "invisible"}`
              )}
            >
              <li
                className="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                onClick={() => {
                  store.setOpenModal(true);
                  toggleMenu();
                }}
              >
                <i className="bx bx-edit-alt"></i> <span>Edit</span>
              </li>
              <li
                className="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300"
                onClick={() => onDeleteHandler(post._id)}
              >
                <i className="bx bx-trash"></i> <span>Delete</span>
              </li>
              <li className="w-24 h-7 py-3 px-2 hover:bg-[#f5f5f5] flex items-center gap-2 cursor-pointer transition ease-in duration-300">
                <Link href={`/post/${post._id}`}>View</Link>
              </li>
            </ul>
          </div>
        </article>
      </div>
      <PostModal openModal={store.openModal} setOpenModal={store.setOpenModal}>
        <CreatePost post={post} />
      </PostModal>
    </>
  );
};

export default PostItem;
