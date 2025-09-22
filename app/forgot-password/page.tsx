import ForgotPasswordForm from "@/components/ForgotPassword";
import styles from "../page.module.css";
export default function ForgotPasswordPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
