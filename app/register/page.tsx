import SignUpForm from "@/components/Signup";
import styles from "@/app/page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register| ActiGram App",
  description: "App for managing and monitoring their task of the users",
};

export default function registerPage() {
  return (
    <div
      className={styles.page}
      style={{ background: "rgba(22, 22, 22, 0.967)" }}
    >
      <main className={styles.main}>
        <SignUpForm />
      </main>
    </div>
  );
}
