import ModalProvider from "@/components/ui/modals/providers";
import styles from "../page.module.css";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <ModalProvider>{children}</ModalProvider>
      </div>
    </main>
  );
}
