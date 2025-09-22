import styles from "@/styles/base/verify.module.scss";
import Link from "next/link";
import EmailVerificationForm from "@/components/ui/EmailVerificationForm";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}
export default async function VerifyPage({ searchParams }: PageProps) {
  const sp = (await searchParams).error;

  if (!sp) redirect("/home");

  if (!sp)
    return (
      <div className={styles.verifyContainer}>
        <div className={styles.verifyHeader}>
          <Link href="/">Back to Login</Link>
          <span>Verify Email</span>
        </div>

        <span className={styles.verifyError}>
          <span>
            {sp === "invalid_token" || sp === "token_expired"
              ? "Your token is invalid or expired please request a new one."
              : sp === "email_not_verified"
              ? "Please verify your email, or request a new verification below"
              : "Oops! something went wrong."}
          </span>
          <EmailVerificationForm />
        </span>
      </div>
    );
}
