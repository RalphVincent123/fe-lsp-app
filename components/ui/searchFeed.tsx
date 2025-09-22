import React from "react";
import styles from "@/styles/feedBanner.module.scss";
import SearchFunction from "../SearchFunction";
import SearchResults from "../searchResults";
import Image from "next/image";
import Link from "next/link";
import sourceImage from "@/public/icons8-user.svg";
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

type SearchResultsProps = {
  loading: boolean;
  results: Post[];
};

export default async function SearchFeed({
  loading,
  results,
}: SearchResultsProps) {
  const resData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/records`);
  const records = await resData.json();

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        {/* <Posting /> */}

        <SearchResults loading={loading} results={results} />
      </div>
      <div className={styles.mainFeedRight}>
        <div className={styles.sidebarItem} style={{ marginTop: "35px" }}>
          <SearchFunction />
        </div>
        <h2>Members</h2>
        <div>
          {records.map((user: User) => (
            <div key={user.id} className={styles.sidebarItem}>
              <div className={styles.accountInfo}>
                <Image
                  src={user.image ? user.image : sourceImage}
                  width={50}
                  height={50}
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
          <p>&copy; 2025 sadasdasdasd</p>
        </footer>
      </div>
    </section>
  );
}
