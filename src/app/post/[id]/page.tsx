"use client";
import PostItem from "@/components/PostItem";
import { usePosts } from "@/context/PostsContext";
import { useParams } from "next/navigation";

export default function PostDetailPage() {
  const { id } = useParams();
  const { posts } = usePosts();
  const post = posts.find((p: any) => String(p.id) === String(id));

  if (!post) {
    return <div style={{ textAlign: "center", padding: 40 }}>Post not found.</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <PostItem post={post} />
    </div>
  );
}
