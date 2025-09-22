"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import styles from "@/styles/leftSideBar.module.scss";

export const SignOutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // async function handleClick() {
  //   await signOut({
  //     fetchOptions: {
  //       onRequest: () => {
  //         setIsPending(true);
  //       },
  //       onResponse: () => {
  //         setIsPending(false);
  //       },
  //       onError: (ctx) => {
  //         toast.error(ctx.error.message);
  //       },
  //       onSuccess: () => {
  //         toast.success("You've logged out");
  //         router.push("/");
  //       },
  //     },
  //   });
  // }

  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault(); // stop Link from navigating immediately

    if (isPending) return; // block double-clicks

    await signOut({
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("You've logged out");
          router.push("/");
        },
      },
    });
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      style={{
        cursor: isPending ? "not-allowed" : "pointer",
        opacity: isPending ? 0.5 : 1,
        pointerEvents: isPending ? "none" : "auto",
      }}
    >
      <MdLogout className={styles.icons} />
      {isPending ? "Signing out..." : "Sign Out"}
    </Link>
  );
};
