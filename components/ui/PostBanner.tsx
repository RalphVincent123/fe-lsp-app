import styles from "@/styles/feedBanner.module.scss";
import Image from "next/image";
import sourceImage from "@/public/icons8-user.svg";
import TogglePostBanner from "./togglePostBanner";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Projects_Names } from "@prisma/client";

type User = {
  id: string;
  name: string;
  email: string;
  projects: Projects_Names;
  image: string | null;
};

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
};

export default async function PostBanner() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/postUser`
  );
  const Raser = await resData.json();

  return (
    <div className={styles.posts}>
      {Raser.filter(
        (rase: Post) => rase.user?.projects === session?.user.projects
      ).map((rase: Post) => {
        return (
          <div
            key={rase.id}
            className={styles.post}
            style={{ position: "relative" }}
          >
            <div className={styles.postHeader}>
              <div className={styles.userDetails}>
                <div className={styles.imagesContain} id={styles.newStatus}>
                  <Image
                    src={rase.user?.image || sourceImage}
                    width={40}
                    height={40}
                    alt="Profile-Pic"
                  />
                </div>
                <div className={styles.userInfo}>
                  <span>
                    {rase.user?.name} &nbsp;
                    <span className={styles.timestamp}>
                      {new Date(
                        new Date(rase.updatedAt) > new Date(rase.createdAt)
                          ? rase.updatedAt
                          : rase.createdAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <p className={styles.country}>{rase.user?.email}</p>
                  </span>
                </div>
              </div>
              {rase.user?.id === session?.user.id ? (
                <TogglePostBanner
                  postId={rase.id}
                  title={rase.title}
                  content={rase.content}
                />
              ) : (
                ""
              )}
            </div>
            <span style={{ color: "white" }}>{rase.title}</span>
            <br />
            <span style={{ color: "white" }}>{rase.content}</span>
          </div>
        );
      })}
    </div>
  );
}
