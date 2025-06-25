import PostItem from "./PostItem";

// Fake posts data
const posts = [
  {
    id: 1,
    author: "Alice",
    content: "This is my first post!",
    comments: [
      { id: 1, author: "Bob", text: "Nice post!" },
      { id: 2, author: "Charlie", text: "Welcome!" },
    ],
  },
  {
    id: 2,
    author: "Bob",
    content: "Hello everyone!",
    comments: [],
  },
];

export default function PostList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
