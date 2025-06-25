import { useState, useEffect } from "react";
import { usePosts } from "@/context/PostsContext";

export default function PostEditor() {
  const [content, setContent] = useState("");
  const { posts, setPosts } = usePosts();

  // Load posts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch {}
    }
    // eslint-disable-next-line
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const newPost = {
      id: Date.now(),
      author: "abid",
      content,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 18px",
          borderRadius: 6,
          background: "#38a169",
          color: "#fff",
          border: "none",
          fontWeight: 600,
        }}
      >
        Post
      </button>
    </form>
  );
}
