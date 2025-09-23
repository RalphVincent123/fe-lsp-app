"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "@/styles/updatedForm.module.scss";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UpdateFormsProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  postId: string;
  title?: string;
  content?: string;
}

function UpdateForms({
  setShowModal,
  postId,
  // title,
  // content,
  title: initialTitle,
  content: initialContent,
}: UpdateFormsProps) {
  const [isPending, setIsPending] = useState(false);

  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");
  const router = useRouter();
  async function HandleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsPending(true);
    // setError(null);

    const formData = new FormData(evt.target as HTMLFormElement);
    const title = String(formData.get("title"));
    const content = String(formData.get("content"));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        }
      );
      if (!res.ok) throw new Error("Failed to update");
      toast.success("Post updated successfully 🎉");
      setShowModal(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  }
  return (
    <form onSubmit={HandleSubmit} className={styles["modal-form"]}>
      <label>
        <span>Title</span>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        <span>Activities</span>
        <textarea
          name="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <div className={styles["modal-actions"]}>
        <button type="submit" disabled={isPending} className={styles.btn}>
          {isPending ? "Updating..." : "Update"}
        </button>
        <button className={styles.closebtn} onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>
    </form>
  );
}

export default UpdateForms;
