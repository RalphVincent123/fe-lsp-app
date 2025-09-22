"use client";

import styles from "@/styles/loginForm.module.scss";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginInAction } from "@/lib/actions/login-email";
import { GoogleOauthButton } from "./ui/GoogleOauthButton";

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsPending(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const { error, role } = await LoginInAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success("Login successful");
      if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    }
  }
  return (
    <div className={styles.main}>
      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <span className={styles.title}>Sign In</span>
        <p className={styles.subtitle}>Enter your email and password</p>
        <div className={styles.googleContainer}>
          <GoogleOauthButton />
        </div>

        <div className={styles.divider}>
          <hr />
          <p>or</p>
          <hr />
        </div>

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
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Enter a password"
          className={styles.input}
        />

        {/* Remember me & Forgot password */}
        <div className={styles.options}>
          <Link href="/forgot-password" className={styles.forgot}>
            Forget password?
          </Link>
        </div>

        {/* Submit */}
        <div className={styles.submitContainer}>
          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            Sign In
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
