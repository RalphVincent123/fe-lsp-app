import React from "react";
import styles from "@/styles/feedBanner.module.scss";
import sourceImage from "@/public/icons8-user.svg";
import Image from "next/image";

type User = {
  id: string;
  name: string;
  email: string;
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

function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className={styles.posts}>
      {results.map((rase: Post) => {
        return (
          <div
            key={rase.id}
            className={styles.post}
            style={{ position: "relative" }}
          >
            <div className={styles.postHeader}>
              <div className={styles.userDetails}>
                <div className={styles.imagesContain} id={styles.newStatus}>
                  <Image src={sourceImage} alt="Profile-Pic" />
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
              {/* <TogglePostBanner
                postId={rase.id}
                title={rase.title}
                content={rase.content}
              /> */}
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

export default SearchResults;
