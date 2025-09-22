"use client";
import { deleteUserAction } from "@/lib/actions/deleteUserAction";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteUserProps {
  userId: string;
}
export function DeleteUserButton({ userId }: DeleteUserProps) {
  const [IsPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);
    const { error } = await deleteUserAction({ userId });

    if (error) {
      toast.error(error);
    } else {
      toast.success("Users deleted successfully");
    }
    setIsPending(false);
  }

  return (
    <button
      style={{
        background: "red",
        color: "white",
        padding: "15px 5px",
        borderRadius: "10px",
      }}
      onClick={handleClick}
    >
      Delete
    </button>
  );
}
