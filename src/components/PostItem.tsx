import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { usePosts } from "@/context/PostsContext";
import { useState } from "react";
import type { Post } from "@/types";
import { useRouter } from "next/navigation";

interface PostItemProps {
  post: Post;
  onContentClick?: () => void;
}

export default function PostItem({ post, onContentClick }: PostItemProps) {
  const { posts, setPosts } = usePosts();
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const router = useRouter();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((p) => p.id !== post.id));
    }
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditContent(post.content);
    setEditing(false);
  };
  const handleSave = () => {
    setPosts(
      posts.map((p) =>
        p.id === post.id ? { ...p, content: editContent } : p
      )
    );
    setEditing(false);
  };

  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, background: "#fff" }}>
      {/* Back icon for post details page only, now above author */}
      {!onContentClick && (
        <div style={{ marginBottom: 8 }}>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              color: "#3182ce",
              fontSize: 22,
              cursor: "pointer",
              fontWeight: 700,
              lineHeight: 1,
              zIndex: 2,
              padding: 0,
            }}
            title="Back to home"
          >
            ←
          </button>
        </div>
      )}
      <div style={{ fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>{post.author}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleEdit}
            style={{
              background: "none",
              border: "none",
              color: "#3182ce",
              fontSize: 16,
              cursor: "pointer",
              fontWeight: 700,
              lineHeight: 1,
            }}
            title="Edit post"
          >
            ✎
          </button>
          <button
            onClick={handleDelete}
            style={{
              background: "none",
              border: "none",
              color: "#e53e3e",
              fontSize: 18,
              cursor: "pointer",
              fontWeight: 700,
              lineHeight: 1,
            }}
            title="Delete post"
          >
            ×
          </button>
        </div>
      </div>
      {editing ? (
        <div style={{ marginBottom: 12 }}>
          <textarea
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            style={{ width: "100%", minHeight: 60, borderRadius: 6, border: "1px solid #ccc", padding: 8 }}
          />
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button
              onClick={handleSave}
              style={{ background: "#38a169", color: "#fff", border: "none", borderRadius: 6, padding: "6px 16px", fontWeight: 600 }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{ background: "#e2e8f0", color: "#2d3748", border: "none", borderRadius: 6, padding: "6px 16px", fontWeight: 600 }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 12, cursor: onContentClick ? "pointer" : undefined }} onClick={onContentClick}>
          {post.content}
        </div>
      )}
      {onContentClick ? null : (
        <>
          <CommentForm postId={post.id} />
          <CommentList comments={post.comments} />
        </>
      )}
    </div>
  );
}
