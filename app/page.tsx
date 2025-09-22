import styles from "./page.module.css";
import LoginForm from "@/components/login";

export default function Home() {
  return (
    <div
      className={styles.page}
      style={{ background: "rgba(22, 22, 22, 0.967)" }}
    >
      <main className={styles.main}>
        <LoginForm />
      </main>
    </div>
  );
}
