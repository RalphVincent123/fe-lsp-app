"use client";
// import style from "@/styles/forgotPasswordForm.module.scss";
import styles from "@/styles/loginForm.module.scss";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/auth-client";
import Link from "next/link";
interface ResetPasswordProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (!password) return toast.error("Please enter your password.");

    if (password !== confirmPassword)
      return toast.error("Password do not match");

    await resetPassword({
      newPassword: password,
      token,
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
          toast.success("Password Reset Successfully");
          router.push("/");
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

        <label htmlFor="password" className={styles.label}>
          New Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="*****"
          className={styles.input}
        />
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password
        </label>

        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="******"
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
