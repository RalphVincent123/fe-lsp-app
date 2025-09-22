import LeftsideBar from "@/components/ui/leftSidebar";
import styles from "../page.module.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SearchFeed from "@/components/ui/searchFeed";
import { UserRole } from "@prisma/client";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: UserRole;
};
type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const params = await searchParams;
  const query = params?.q || "";
  let results: Post[] = [];

  if (query) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(
        query
      )}`,
      {
        cache: "no-store",
      }
    );
    results = await res.json();
  }
  return (
    <div className={styles.dashboardPage}>
      <main className={styles.mainContainer}>
        <LeftsideBar
          user={{
            ...session.user,
            projects: Object.values(session.user.projects),
          }}
        />
        <div style={{ width: "100%", marginLeft: "22%" }}>
          <SearchFeed loading={false} results={results} />
        </div>
      </main>
    </div>
  );
}
