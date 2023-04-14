import { create } from "zustand";
import { IUser } from "../lib/types";

type Store = {
  authUser: IUser | null;
  uploadingImage: boolean;
  pageLoading: boolean;
  openModal: boolean;
  openUserModal: boolean;
  setAuthUser: (user: IUser) => void;
  setUploadImage: (isUploading: boolean) => void;
  setPageLoading: (isLoading: boolean) => void;
  setOpenModal: (openModal: boolean) => void;
  setOpenUserModal: (openUserModal: boolean) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  uploadingImage: false,
  pageLoading: false,
  openModal: false,
  openUserModal: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setUploadImage: (isUploading) =>
    set((state) => ({ ...state, uploadingImage: isUploading })),
  setPageLoading: (isLoading) =>
    set((state) => ({ ...state, pageLoading: isLoading })),
  setOpenModal: (openModal) => set((state) => ({ ...state, openModal })),
  setOpenUserModal: (openUserModal) =>
    set((state) => ({ ...state, openUserModal })),
}));

export default useStore;
