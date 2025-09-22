"use client";
import React, { useState } from "react";
import styles from "@/styles/search.module.scss";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
// import { UserRole } from "@prisma/client";

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   image?: string;
//   role?: UserRole;
// };
// type Post = {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
//   user?: User;
// };

function SearchFunction() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [results, setResults] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);

    // const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
    // const data = await res.json();

    // setResults(data);
    // setLoading(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <form onSubmit={handleSearch} className={styles.SearchForm}>
        <input
          value={searchQuery}
          onChange={(evt) => setSearchQuery(evt.target.value)}
          placeholder="Search Here"
          className={styles.inputSearch}
        />
        <button type="submit" className={styles.fa}>
          <CiSearch />
        </button>
      </form>
    </>
  );
}

export default SearchFunction;
