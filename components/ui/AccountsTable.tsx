"use client";
import React, { useState } from "react";
import style from "@/styles/AccountTable.module.scss";
import { FaHome } from "react-icons/fa";
import { PiGreaterThan } from "react-icons/pi";
import Link from "next/link";
import sourceImage from "@/public/icons8-user.svg";
import Image from "next/image";
import { Projects_Names, UserRole } from "@prisma/client";

interface User {
  id: string;
  name: string;
  email: string;
  projects: string;
  role: string;
  image?: string;
}

interface AccountsTableProps {
  users: User[];
}

export default function AccountsTable({ users }: AccountsTableProps) {
  const [isEditId, setIsEditId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    project: "",
    role: "",
  });

  function handleSubmitChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(userId: string) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      setIsEditId(null);
    } catch (err) {
      console.error(err);
    }
  }

  const handleEditClick = (user: User) => {
    setIsEditId(user.id);
    setEditFormData({
      name: user.name,
      email: user.email,
      project: user.projects,
      role: user.role,
    });
  };
  return (
    <div className={style.main}>
      <div className={style.FirstRowContainer}>
        <span className={style.titles}>User Management</span>
        <div className={style.container}>
          <div className={style.breadcrumbs}>
            <FaHome className={style.icon} />
            <PiGreaterThan className={style.icon} />
            <Link href="/admin/accounts">
              <span className={style.breadcrumbsName}>User Management</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={style.SecondContainer}>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Project</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((users: User) =>
              isEditId === users.id ? (
                <tr key={users.id}>
                  <td>
                    <Image
                      src={users.image || sourceImage}
                      width={40}
                      height={40}
                      alt="Profile Pic"
                      style={{ borderRadius: "60px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      placeholder={users.name}
                      value={editFormData.name}
                      onChange={handleSubmitChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      placeholder={users.email}
                      value={editFormData.email}
                      onChange={handleSubmitChange}
                    />
                  </td>
                  <td>
                    <select
                      name="project"
                      id="project"
                      value={editFormData.project}
                      onChange={handleSubmitChange}
                    >
                      {Object.values(Projects_Names).map((project) => (
                        <option
                          key={project}
                          value={project}
                          disabled={project === users.projects}
                        >
                          {project}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      name="role"
                      id="role"
                      value={editFormData.role}
                      onChange={handleSubmitChange}
                    >
                      {Object.values(UserRole).map((roles) => (
                        <option key={roles} value={roles}>
                          {roles}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSave(users.id)}>Save</button>
                    <button onClick={() => setIsEditId(null)}>Cancel</button>
                    <a href="#">Delete</a>
                  </td>
                </tr>
              ) : (
                <tr key={users.id}>
                  <td>
                    <Image
                      src={users.image || sourceImage}
                      width={40}
                      height={40}
                      alt="Profile Pic"
                      style={{ borderRadius: "60px" }}
                    />
                  </td>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td>{users.projects}</td>
                  <td>{users.role}</td>
                  <td>
                    <button onClick={() => handleEditClick(users)}>Edit</button>
                    <a href="#">Delete</a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
