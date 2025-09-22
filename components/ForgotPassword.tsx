"use client";
import style from "@/styles/forgotPasswordForm.module.scss";
import { forgetPassword } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
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
    <div className={style.main}>
      <form className={style.container} onSubmit={handleSubmit}>
        <div className={style.logForm}>
          <div className={style.title}>Log in to continue</div>
          <div className={style.formsFields}>
            <label htmlFor="email" className={style.passwordLabel}>
              Email Address
            </label>
            <input
              type="email"
              className={style.passwordFields}
              name="email"
              id="email"
              placeholder="Enter your Email Address"
            />
          </div>
          <div className={style.submitButton}>
            <button className={style.buttonLogin}>Send</button>
          </div>
        </div>
      </form>
    </div>
  );
}
