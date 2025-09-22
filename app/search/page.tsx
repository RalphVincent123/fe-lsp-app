import LeftsideBar from "@/components/ui/leftSidebar";
import styles from "../page.module.css";
import FeedBanner from "@/components/ui/FeedBanner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SearchFeed from "@/components/ui/searchFeed";

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
  let results: any[] = [];

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
        <LeftsideBar user={session.user} />
        <div style={{ width: "100%", marginLeft: "22%" }}>
          <SearchFeed loading={false} results={results} />
        </div>
      </main>
    </div>
  );
}
