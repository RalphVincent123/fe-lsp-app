import styles from "@/styles/feedBanner.module.scss";
import Image from "next/image";
import sourceImage from "@/public/icons8-user.svg";
import Link from "next/link";
import Posting from "./posting";
import PostBanner from "./PostBanner";
import SearchFunction from "../SearchFunction";
import { Projects_Names, UserRole } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: UserRole;
  projects: Projects_Names;
};

export default async function FeedBanner() {
  const headerlist = await headers();
  const session = await auth.api.getSession({
    headers: headerlist,
  });
  const resData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/records`);
  const records = await resData.json();

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <Posting />
        <PostBanner />
      </div>
      <div className={styles.mainFeedRight}>
        <div className={styles.sidebarItem}>
          <SearchFunction />
        </div>
        <h2>Members</h2>
        <div>
          {session?.user.role === "ADMIN"
            ? records.map((user: any) => (
                <div key={user.id} className={styles.sidebarItem}>
                  <div className={styles.accountInfo}>
                    <Image
                      src={user.image || sourceImage}
                      width={40}
                      height={40}
                      alt="Profile Pic"
                    />
                    <div>
                      <Link href="#">{user.name}</Link>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <Link href="#">{user.role}</Link>
                </div>
              ))
            : records
                .filter((user: User) =>
                  [
                    Projects_Names.PROJECT_A,
                    Projects_Names.PROJECT_B,
                    Projects_Names.PROJECT_C,
                  ].includes(user?.projects)
                )
                .map((user: any) => (
                  <div key={user.id} className={styles.sidebarItem}>
                    <div className={styles.accountInfo}>
                      <Image
                        src={user.image || sourceImage}
                        width={40}
                        height={40}
                        alt="Profile Pic"
                      />
                      <div>
                        <Link href="#">{user.name}</Link>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <Link href="#">{user.role}</Link>
                  </div>
                ))}
        </div>
        <footer>
          <p>&copy; 2025 NEXTJS 15</p>
        </footer>
      </div>
    </section>
  );
}
