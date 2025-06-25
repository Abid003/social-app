export default function CommentList({ comments }: { comments: any[] }) {
  if (!comments || comments.length === 0) return null;
  return (
    <div style={{ marginTop: 12, marginBottom: 8 }}>
      <div style={{ fontSize: 14, color: "#888", marginBottom: 4 }}>Comments:</div>
      <ul style={{ paddingLeft: 16 }}>
        {comments.map((c) => (
          <li key={c.id} style={{ fontSize: 15, marginBottom: 2 }}>
            <b>{c.author}:</b> {c.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
