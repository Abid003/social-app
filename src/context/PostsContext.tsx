"use client";
import React, { createContext, useContext, useState } from "react";

const initialPosts = [
  {
    id: 1,
    author: "Alice",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    comments: [],
  },
];

const PostsContext = createContext<any>(null);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<any[]>(initialPosts);

  // Load posts from localStorage only on client after mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("posts");
      if (saved) {
        try {
          setPosts(JSON.parse(saved));
        } catch {}
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within a PostsProvider");
  return context;
}
