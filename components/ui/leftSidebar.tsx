"use client";
import styles from "@/styles/leftSideBar.module.scss";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import Image from "next/image";
import sourceImage from "@/public/icons8-user.svg";
import { SignOutButton } from "./signOut";
import { Projects_Names, UserRole } from "@prisma/client";
import { useState } from "react";
import NotificationPanel from "./NotificationPanel";
import type { ImageLoaderProps } from "next/image";

interface sideBarProps {
  user: {
    id: string;
    role: UserRole;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    image?: string | null;
    projects: Projects_Names[];
  };
}

export default function LeftsideBar({ user }: sideBarProps) {
  const [open, setOpen] = useState(false);

  function imageLoader(config: ImageLoaderProps): string {
    return config.src;
  }
  return (
    <div className={styles.main}>
      <span className={styles.logo}>ActivityGram</span>
      <nav>
        <Link href="/home">
          <Image
            src={user.image || sourceImage}
            loader={imageLoader}
            width={40}
            height={40}
            className={styles.ImageContainer}
            alt="Profile Pic"
          />
          <div className={styles.naming}>
            <span>{user.name}</span>
            <span style={{ color: "#a8a8a8", fontSize: "13px" }}>
              {user.email}
            </span>
          </div>
        </Link>
        <hr />
        {user.role === "USER" && (
          <>
            <Link
              href="/home"
              className={styles.active}
              onClick={() => setOpen(!open)}
            >
              <IoHome className={styles.icons} />
              <span>Home</span>
            </Link>
            {open && (
              <div className={styles.dropdownContent}>
                <Link href="/home/profile">Profile</Link>
              </div>
            )}
            <NotificationPanel userid={user.id}>
              <Link href="#">
                <IoMdNotifications className={styles.icons} />
                <span>Notifications</span>
              </Link>
            </NotificationPanel>

            <SignOutButton />
          </>
        )}
        {user.role === "ADMIN" && (
          <>
            <Link href="/admin">
              <IoMdNotifications className={styles.icons} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/accounts">
              <IoMdNotifications className={styles.icons} />
              <span>Accounts</span>
            </Link>
            <SignOutButton />
          </>
        )}
      </nav>
    </div>
  );
}
