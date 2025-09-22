"use client";
import { sendVerificationEmail } from "@/lib/auth-client";
import styles from "@/styles/base/verify.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EmailVerificationForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email address");

    await sendVerificationEmail({
      email,
      callbackURL: "/verify",
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
        onSuccess: () => {
          toast.success("Verification email send successfully");
          router.push("/verify/success");
        },
      },
    });
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>

      <button type="submit" disabled={isPending}>
        Resend Verification Email
      </button>
    </form>
  );
}
