"use client";
import style from "@/styles/forgotPasswordForm.module.scss";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/auth-client";

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
    <div className={style.main}>
      <form className={style.container} onSubmit={handleSubmit}>
        <div className={style.logForm}>
          <div className={style.title}>Reset Password</div>
          <div className={style.formsFields}>
            <label htmlFor="password" className={style.passwordLabel}>
              Password
            </label>
            <input
              type="password"
              className={style.passwordFields}
              name="password"
              id="password"
              placeholder="******"
            />
            <label htmlFor="password" className={style.passwordLabel}>
              Confirm Password
            </label>
            <input
              type="password"
              className={style.passwordFields}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="******"
            />
          </div>
          <div className={style.submitButton}>
            <button
              type="submit"
              className={style.buttonLogin}
              disabled={isPending}
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
