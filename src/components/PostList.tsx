import PostItem from "./PostItem";
import { usePosts } from "@/context/PostsContext";
import { Spinner, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import type { Post } from "@/types";

export default function PostList() {
  const { posts, loading } = usePosts();
  const router = useRouter();

  const handlePostClick = useCallback(
    (_e: React.MouseEvent<HTMLDivElement>, postId: number | string) => {
      router.push(`/post/${postId}`);
    },
    [router]
  );

  if (loading) {
    return (
      <Center py={8}>
        <Spinner size="lg" color="teal.500" thickness="4px" />
      </Center>
    );
  }
  if (!posts || posts.length === 0) {
    return (
      <Center py={8}>
        <Text color="gray.500">No posts available.</Text>
      </Center>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {posts.map((post: Post) => (
        <PostItem
          key={post.id}
          post={post}
          onContentClick={() => handlePostClick(undefined as any, post.id)}
        />
      ))}
    </div>
  );
}
