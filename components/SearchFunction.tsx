"use client";
import React, { useState } from "react";
import styles from "@/styles/search.module.scss";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

function SearchFunction() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
    const data = await res.json();

    setResults(data);
    setLoading(false);
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
      {/* {loading && <p>Searching...</p>}
      <SearchResults loading={loading} results={results} /> */}

      {/* <ul className="space-y-4">
        {results.map((post) => (
          <li key={post.id} className="border-b pb-2">
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default SearchFunction;
