import ResetPasswordForm from "@/components/ResetPassword";
import styles from "../page.module.css";
import { redirect } from "next/navigation";
interface PageProps {
  searchParams: Promise<{ token: string }>;
}
export default async function resetPasswordPage({ searchParams }: PageProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/");
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ResetPasswordForm token={token} />
      </main>
    </div>
  );
}
