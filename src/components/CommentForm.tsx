import { useState } from "react";

export default function CommentForm({ postId }: { postId: number }) {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    alert(`Fake submit comment: ${text} (for post ${postId})`);
    setText("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: 8,
        display: "flex",
        gap: 8,
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        style={{
          flex: 1,
          padding: 6,
          borderRadius: 4,
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "6px 12px",
          borderRadius: 4,
          background: "#3182ce",
          color: "#fff",
          border: "none",
        }}
      >
        Post
      </button>
    </form>
  );
}
