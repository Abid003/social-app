"use client";
import { useState } from "react";
import { usePosts } from "@/context/PostsContext";
import { Input, Button, HStack } from "@chakra-ui/react";

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [text, setText] = useState("");
  const { posts, setPosts } = usePosts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setPosts(
      posts.map((post) => {
        if (String(post.id) === String(postId)) {
          const safeComments = Array.isArray(post.comments) ? post.comments : [];
          return {
            ...post,
            comments: [
              ...safeComments,
              {
                id: Math.floor(Math.random() * 1e9), // client-only unique id
                author: "abid", // or get from user context
                text,
              },
            ],
          };
        }
        return post;
      })
    );
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack style={{ marginTop: 8, gap: 8 }}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          size="sm"
          bg="white"
        />
        <Button type="submit" colorScheme="teal" size="sm" px={4}>
          Comment
        </Button>
      </HStack>
    </form>
  );
}
