import styles from "@/styles/base/verify.module.scss";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.verifyContainer}>
      <div className={styles.verifyHeader}>
        <Link href="/">Back to Login</Link>
        <span>Success</span>
      </div>

      <span className={styles.verifyError}>
        Success ! You have successfully registered. Please check your email for
        verification
      </span>
    </div>
  );
}
