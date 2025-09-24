"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/NotificationPanel.module.scss";
import { Projects_Names } from "@prisma/client";

type User = {
  id: string;
  name: string;
  email: string;
  projects: Projects_Names;
};

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
};

export default function NotificationPanel({
  userid,
  children,
}: {
  userid: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch(`/api/notification/`);
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchNotifications();
  }, [userid]);

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setOpen(true)}>{children}</div>

      {/* Overlay */}
      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`${styles.notifications} ${open ? styles.open : ""}`}>
        <div className={styles.header}>
          <h3>Notifications</h3>
          <button className={styles.button} onClick={() => setOpen(false)}>
            X
          </button>
        </div>

        <div className={styles.list}>
          {notifications.length === 0 ? (
            <p className={styles.empty}>No notifications yet</p>
          ) : (
            notifications.map((n: Post) => (
              <div key={n.id} className={styles.item}>
                <div className={styles.content}>
                  <p className={styles.title}>
                    <span className={styles.highlight}>
                      {n.user?.name} &nbsp; New Post
                    </span>
                  </p>
                  <span className={styles.time}>
                    {new Date(n.createdAt).toLocaleString(undefined, {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
