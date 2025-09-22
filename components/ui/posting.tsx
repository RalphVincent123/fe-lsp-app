"use client";
import styles from "@/styles/posting.module.scss";
import Image from "next/image";
import sourceImage from "@/public/icons8-user.svg";
import { PostActions } from "@/lib/actions/PostAction";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Posting() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmitPost(evt: React.FormEvent<HTMLElement>) {
    evt.preventDefault();

    setIsPending(true);

    const formData = new FormData(evt.target as HTMLFormElement);

    const { error } = await PostActions(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Successfully Post");
      router.refresh();
    }

    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  }
  return (
    <div className={styles.statusBox}>
      <form onSubmit={handleSubmitPost} className={styles.container}>
        <div className={styles.task}>
          <span style={{ color: "white" }}>Task Today</span>
        </div>
        <div className={styles.userInput}>
          <Image
            src={sourceImage}
            alt="Profile-Pic"
            className={styles.profilePic}
          />

          <textarea
            ref={textareaRef}
            name="PostArea"
            placeholder={`What is your activities today ?`}
            className={styles.textarea}
            rows={1}
          />
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
