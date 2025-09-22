import LeftsideBar from "@/components/ui/leftSidebar";
// import styles from "../page.module.css";
import styles from "../../page.module.css";
import FeedBanner from "@/components/ui/FeedBanner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import WidgetGenerator from "@/widgets/WidgetGenerator";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug = [] } = await params;

  const slugPath = slug.join("/");

  const pageMetadata = await fetch(
    `http://localhost:3000/api/fetchMetaData?slug=${slugPath}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return {
    title: pageMetadata.title || "Default Title",
    description: pageMetadata.description || "Default Description",
  };
}

export default async function dashboardPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  if (session.user.role !== "USER") {
    return redirect("/admin");
  }

  const { slug = [] } = params;

  if (slug.length === 0)
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
            <FeedBanner />
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
