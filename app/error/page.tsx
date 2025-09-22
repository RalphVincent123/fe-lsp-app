import styles from "./ErrorPage.module.scss";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;

  return (
    <main className={styles.notFoundContainer}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.title}>Page Not Found</p>
      <p className={styles.description}>
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <div className={styles.homeButton}>
        {sp.error === "account_not_linked"
          ? "this account is already linked to another sign in method"
          : "Something went wrong please try again"}
      </div>
    </main>
  );
}
