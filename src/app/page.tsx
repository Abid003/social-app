"use client";
import { Box } from "@chakra-ui/react";
import PostList from "@/components/PostList";
import PostEditor from "@/components/PostEditor";
import { ColorModeButton } from "@/components/ui/color-mode"

export default function HomePage() {
  return (
    <Box maxWidth={600} margin="0 auto" padding={6}>
      <h1 style={{ textAlign: "center" }}>News Feed</h1>
      <ColorModeButton />
      <section style={{ marginBottom: 32 }}>
        <PostEditor />
      </section>
      <section>
        <PostList />
      </section>
    </Box>
  );
}