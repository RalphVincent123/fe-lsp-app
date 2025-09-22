// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
import styles from "../page.module.css";
import { SignOutButton } from "@/components/ui/signOut";
// import { redirect } from "next/navigation";

export default async function ProfilePage() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session) {
  //   return redirect("/");
  // }

  // console.log(session.user.role);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Profile</h1>
        <SignOutButton />
        {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      </main>
    </div>
  );
}
