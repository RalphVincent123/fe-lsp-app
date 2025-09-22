"use client";
import { createContext, Dispatch, SetStateAction } from "react";
import UpdateModals from "./UpdateModals";

type EditPost = {
  id: string;
  title?: string;
  content?: string;
};

type DeletePost = {
  id: string;
  title?: string;
  content?: string;
};

export const ModalContext = createContext<{
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setEditPost: Dispatch<SetStateAction<EditPost | null>>;
  setDeletePost: Dispatch<SetStateAction<DeletePost | null>>;
}>({
  setShowModal: () => {},
  setEditPost: () => {},
  setDeletePost: () => {},
});

export default function ModalProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { setShowModal, setEditPost, setDeletePost, ModalComponent } =
    UpdateModals();
  return (
    <ModalContext.Provider
      value={{
        setShowModal,
        setEditPost,
        setDeletePost,
      }}
    >
      <ModalComponent />
      {children}
    </ModalContext.Provider>
  );
}
