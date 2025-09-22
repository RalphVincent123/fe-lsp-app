import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import styles from "@/app/page.module.css";
import LeftsideBar from "@/components/ui/leftSidebar";
import AccountsTable from "@/components/ui/AccountsTable";

export default async function Accounts() {
  const headerlist = await headers();
  const session = await auth.api.getSession({
    headers: headerlist,
  });
  if (!session) {
    return redirect("/");
  }
  if (session.user.role !== "ADMIN") return redirect("/home");

  const resData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/records`);
  const refData = await resData.json();

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
          <AccountsTable users={refData} />
        </div>
      </main>
    </div>
  );
}
