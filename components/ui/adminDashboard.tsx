import styles from "@/styles/adminDashboard.module.scss";
import TableContent from "./tableContent";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import UserListstable from "./UserListstable";
import BarChart from "./BarChart";

export default async function AdminDashboard() {
  const headerlist = await headers();

  const session = await auth.api.getSession({
    headers: headerlist,
  });

  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`
  );
  const records = await resData.json();

  const PostsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/postUser`
  );
  const Postsrecords = await PostsData.json();

  const mappingPosts = Postsrecords.map((record: any) => record.userid);

  const uniqueActiveUsers = [...new Set(mappingPosts)];

  const uniqueProjectsCount = new Set(
    records.map((user: any) => user.projects).filter(Boolean)
  ).size;

  return (
    <main className={styles.main}>
      <header className={styles.topbar}>
        <h1>Dashboard</h1>
        <div className={styles.user}>👤 {session?.user.role}</div>
      </header>

      <section className={styles.cards}>
        <div className={styles.card}>
          <p>Employee</p>
          <h2>{records.length}</h2>
        </div>
        <div className={styles.card}>
          <p>Projects</p>
          <h2>{uniqueProjectsCount}</h2>
        </div>
        <div className={styles.card}>
          <p>Active Users</p>
          <h2>{uniqueActiveUsers.length}</h2>
        </div>
        <div className={styles.card}>
          <p>Total Posts</p>
          <h2>{Postsrecords.length}</h2>
        </div>
      </section>
      <div className={styles.sections}>
        <div className={styles.usersLists}>
          <TableContent />
        </div>
        <div className={styles.ListProject}>
          <UserListstable />
        </div>
      </div>
      <div className={styles.sections}>
        <BarChart />
      </div>
    </main>
  );
}
