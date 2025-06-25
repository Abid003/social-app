import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

export default function PostItem({ post }: { post: any }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, background: "#fff" }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{post.author}</div>
      <div style={{ marginBottom: 12 }}>{post.content}</div>
      <CommentList comments={post.comments} />
      <CommentForm postId={post.id} />
    </div>
  );
}
