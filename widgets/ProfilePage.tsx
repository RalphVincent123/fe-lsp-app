import LeftsideBar from "@/components/ui/leftSidebar";
import styles from "@/app/page.module.css";
import FeedBanner from "@/components/ui/FeedBanner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FormsUpdates from "@/components/FormsUpdates";

async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }
  if (session.user.role !== "USER") return redirect("/admin");
  return (
    <div className={styles.dashboardPage}>
      <main className={styles.mainContainer}>
        <LeftsideBar
          user={{
            ...session.user,
            projects: Object.values(session.user.projects),
          }}
        />
        <div className={styles.baseSection}>
          <FormsUpdates user={session.user} />
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
