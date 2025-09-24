"use client";
// import style from "@/styles/forgotPasswordForm.module.scss";
import styles from "@/styles/loginForm.module.scss";
import { forgetPassword } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
export default function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email address");

    await forgetPassword({
      email,
      redirectTo: "/reset-password",
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
          toast.success("Resend Email successfully");
          router.push("/forgot-password/success");
        },
      },
    });
  }
  return (
    <div className={styles.main}>
      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <span className={styles.title} style={{ marginBottom: "25px" }}>
          Forgot Password
        </span>

        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="sample@example.com"
          className={styles.input}
        />

        {/* Submit */}
        <div className={styles.submitContainer}>
          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            Send
          </button>
        </div>

        {/* Signup */}
        <p className={styles.footerText}>
          Not registered yet?{" "}
          <Link href="/register" className={styles.signupLink}>
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  );
}
