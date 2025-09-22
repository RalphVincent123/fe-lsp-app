import styles from "../page.module.css";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.mainContainer}>{children}</main>;
}
