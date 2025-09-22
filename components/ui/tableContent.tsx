import styles from "@/styles/tableContent.module.scss";
import sourceImage from "@/public/icons8-user.svg";
import Image from "next/image";

export default async function TableContent() {
  const PostsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/postUser`,
    { cache: "no-store" } // disable caching para laging fresh data
  );
  const Postsrecords = await PostsData.json();

  const contributorsMap: Record<
    string,
    { name: string; posts: number; image?: string }
  > = {};

  Postsrecords.forEach((record: any) => {
    const userId = record.userid;
    const userName = record.user?.name || "Unknown User";
    const image = record.user?.image;

    if (!contributorsMap[userId]) {
      contributorsMap[userId] = { name: userName, posts: 0, image };
    }
    contributorsMap[userId].posts += 1;
  });

  const contributors = Object.values(contributorsMap).sort(
    (a, b) => b.posts - a.posts
  );

  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>🏆 Active Users</h2>
      <div className={styles.list}>
        {contributors.map((user, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.info}>
              <Image
                src={user.image || sourceImage}
                width={40}
                height={40}
                alt={user.name}
                className={styles.avatar}
              />
              <span className={styles.name}>{user.name}</span>
            </div>
            <span className={styles.posts}>{user.posts} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
