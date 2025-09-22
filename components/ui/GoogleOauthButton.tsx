"use client";
import { signIn } from "@/lib/auth-client";
import styles from "@/styles/loginForm.module.scss";
import { useState } from "react";
import toast from "react-hot-toast";

interface GoogleOauthProps {
  signUp?: boolean;
}
export function GoogleOauthButton({ signUp }: GoogleOauthProps) {
  const [isPending, setIsPending] = useState(false);
  const action = signUp ? "Up" : "In";

  async function handleClick() {
    await signIn.social({
      provider: "google",
      callbackURL: "/home",
      errorCallbackURL: "/error",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  }
  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={styles.googleButton}
    >
      Sign {action} with Google
    </button>
  );
}
