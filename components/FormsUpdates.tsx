"use client";
import React from "react";
import styles from "@/styles/formsUpdates.module.scss";
import Image from "next/image";
import sourceImage from "@/public/icons8-user.svg";
import { useState, useRef } from "react";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";
import type { ImageLoaderProps } from "next/image";

interface UpdateUserProps {
  user: {
    id: string;
    role: UserRole;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    image?: string | null;
  };
}

export default function FormsUpdates({ user }: UpdateUserProps) {
  const [active, setActive] = useState("user");
  const [pickImage, setPickImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // function imageLoader(config: any) {
  //   return config.src;
  // }
  function imageLoader(config: ImageLoaderProps): string {
    return config.src;
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickImage(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const name = String(formData.get("name"));
    const imageFile = formData.get("image");
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (!name && !imageFile && !password) {
      return toast.error("Please enter a name, image, or password");
    }

    if (password) {
      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters");
      }
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }
    }

    let imageUrl = user.image;
    if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const data = await res.json();
        if (data.url) {
          imageUrl = data.url;
        } else {
          return toast.error("Image upload failed");
        }
      } catch (error) {
        console.log(error);
        return toast.error("Image upload failed");
      }
    }

    await updateUser({
      ...(name && { name }),
      ...(password && { password }),
      ...(imageUrl && { image: imageUrl }),
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
          toast.success("User updated successfully");
          (evt.target as HTMLFormElement).reset();
          router.refresh();
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.UpdateContainer}>
      <div className={styles.UpdateImage}>
        <div className={styles.imageContainer}>
          {pickImage ? (
            <Image
              src={pickImage}
              loader={imageLoader}
              alt="Preview"
              width={150}
              height={150}
              className={styles.previewImage}
            />
          ) : (
            <Image
              src={user.image || sourceImage}
              loader={imageLoader}
              width={40}
              height={40}
              alt="asdasdasdsd"
            />
          )}
        </div>
        <div className={styles.UserName}>
          <span>{user.name}</span>
        </div>
        <div className={styles.Email}>
          <span>{user.email}</span>
        </div>
        <div className={styles.inputImage}>
          <input
            type="file"
            id="upload"
            accept="image/png, image/jpeg"
            name="image"
            ref={imageInput}
            onChange={handleImageChange}
          />
          <label htmlFor="upload">Upload New Photo</label>
        </div>
      </div>
      <div className={styles.UpdateForms}>
        {/* Header with Tabs */}
        <div className={styles.Information}>
          <span className={styles.title}>Edit Profile</span>

          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${
                active === "user" ? styles.active : ""
              }`}
              onClick={() => setActive("user")}
            >
              User Information
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Username</label>
            <input type="text" name="name" placeholder={user.name} />
          </div>

          <div className={styles.field}>
            <label>New Password</label>
            <input type="password" name="password" placeholder="*******" />
          </div>

          <div className={styles.field}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="*******"
            />
          </div>

          <div className={styles.field}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder={user.email}
              disabled
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className={styles.buttonContainer}>
          <button type="submit" disabled={isPending} className={styles.button}>
            Update info
          </button>
        </div>
      </div>
    </form>
  );
}
