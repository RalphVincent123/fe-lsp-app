"use client";
import { UserRole } from "@prisma/client";
import { useState } from "react";
import styles from "@/styles/UserRoleSelect.module.scss";
import { useRouter } from "next/navigation";
import { admin } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface UserRoleSelectProps {
  userId: string;
  role: UserRole;
}
export function UserRoleSelect({ userId, role }: UserRoleSelectProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = evt.target.value as UserRole;

    const canChangeRole = await admin.hasPermission({
      permissions: {
        user: ["set-role"],
      },
    });
    if (!canChangeRole.data?.success) {
      return toast.error("Forbidden");
    }

    await admin.setRole({
      userId,
      role: newRole,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("User Role updated");
          router.refresh();
        },
      },
    });
  }
  return (
    <select
      value={role}
      onChange={handleChange}
      disabled={role === "ADMIN" || isPending}
      className={styles.roleSelect}
    >
      <option value="ADMIN">ADMIN</option>
      <option value="USER">USER</option>
    </select>
  );
}
