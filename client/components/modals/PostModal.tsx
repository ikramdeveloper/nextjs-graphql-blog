import React from "react";
import { createPortal } from "react-dom";

interface IPostModal {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  children: React.ReactNode;
}

const PostModal: React.FC<IPostModal> = ({
  children,
  openModal,
  setOpenModal,
}) => {
  if (!openModal) return null;
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,.5)] z-[1000]"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="max-w-lg w-full rounded-md fixed top-[5%] left-1/2 -translate-x-1/2 bg-white z-[1001] p-6">
        {children}
      </div>
    </>,
    document.getElementById("post-modal") as HTMLElement
  );
};

export default PostModal;
