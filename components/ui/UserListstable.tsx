import React from "react";
import styles from "@/styles/tableContent.module.scss";
import sourceImage from "@/public/icons8-user.svg";
import Image from "next/image";

export default async function UserListstable() {
  const PostsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`
  );
  const Postsrecords = await PostsData.json();

  const ExceptAdmin = Postsrecords.filter((ant: any) => ant.role !== "ADMIN");
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>List of Users</h2>
      <div className={styles.list}>
        {ExceptAdmin.map((users: any) => (
          <div key={users.id} className={styles.row}>
            <div className={styles.info}>
              <Image
                src={users.image || sourceImage}
                width={40}
                height={40}
                alt="Sdasdasd"
                className={styles.avatar}
              />
              <span className={styles.name}>{users.name}</span>
            </div>
            <span className={styles.posts}>{users.projects}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
