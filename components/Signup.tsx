"use client";

import styles from "@/styles/signUpForm.module.scss";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signUpEmailAction } from "@/lib/actions/sign-Up-email";
import { GoogleOauthButton } from "./ui/GoogleOauthButton";
import Image from "next/image";
// image picker

export default function SignUpForm() {
  const [isPending, setIsPending] = useState(false);

  const [pickImage, setPickImage] = useState<string | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);

  const [project, setProject] = useState("");

  function handlePickImage() {
    imageInput.current?.click();
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsPending(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const { error } = await signUpEmailAction(formData);

    if (error) {
      toast.error(error);
      setIsPending(false);
    } else {
      toast.success(
        "Register complete!. Please verify your email for verification purposes. thank you"
      );
      redirect("/register/success");
    }
  }
  return (
    <div className={styles.main}>
      <form className={styles.signInForm} onSubmit={handleSubmit}>
        <span className={styles.title}>Register Account</span>
        <p className={styles.subtitle}>Enter your Personal Information</p>
        <div className={styles.googleContainer}>
          <GoogleOauthButton signUp />
        </div>

        <div className={styles.divider}>
          <hr />
          <p>or</p>
          <hr />
        </div>

        <label htmlFor="name" className={styles.label}>
          Username
        </label>
        <input
          name="name"
          id="name"
          type="name"
          placeholder="Lucas Garcia"
          className={styles.input}
        />

        <label htmlFor="projects" className={styles.label}>
          Select assigned Project
        </label>
        <select
          name="projects"
          id="projects"
          className={styles.input}
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          {project === "" && (
            <option value="" disabled>
              Select a project
            </option>
          )}
          <option value="PROJECT_A">Project A</option>
          <option value="PROJECT_B">Project B</option>
          <option value="PROJECT_C">Project C</option>
        </select>

        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="sample@example.com"
          className={styles.input}
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Enter a password"
          className={styles.input}
        />
        <label htmlFor="imageInput">Preview Image</label>
        <input
          type="file"
          className={styles.input}
          id="ImageName"
          accept="image/png, image/jpeg"
          name="image"
          ref={imageInput}
          onChange={handleImageChange}
        />
        <div>
          {!pickImage && <p>No Image picked yet</p>}
          {pickImage && (
            <Image
              src={pickImage}
              alt="Preview"
              width={150}
              height={150}
              className={styles.previewImage}
            />
          )}
        </div>

        {/* Remember me & Forgot password */}
        <div className={styles.options}>
          <Link href="/forgot-password" className={styles.forgot}>
            Forget password?
          </Link>
        </div>

        {/* Submit */}
        <div className={styles.submitContainer}>
          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            Sign Up
          </button>
        </div>

        {/* Signup */}
        <p className={styles.footerText}>
          Do you have Existing Account ? &nbsp;
          <Link href="/register" className={styles.signupLink}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
