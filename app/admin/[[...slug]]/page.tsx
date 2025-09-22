import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import WidgetGenerator from "@/widgets/WidgetGenerator";
import styles from "../../page.module.css";
import LeftsideBar from "@/components/ui/leftSidebar";
import AdminDashboard from "@/components/ui/adminDashboard";

export default async function page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const headerlist = await headers();
  const session = await auth.api.getSession({
    headers: headerlist,
  });
  if (!session) {
    return redirect("/");
  }

  if (session.user.role !== "ADMIN") return redirect("/home");

  const { slug = [] } = await params;

  if (slug.length === 0)
    return (
      <div className={styles.dashboardPage}>
        <main className={styles.mainContainer}>
          <div className={styles.containers}>
            <LeftsideBar
              user={{
                ...session.user,
                projects: Object.values(session.user.projects),
              }}
            />
            <AdminDashboard />
          </div>
        </main>
      </div>
    );

  return (
    <>
      <WidgetGenerator params={{ slug }} />
    </>
  );
}
