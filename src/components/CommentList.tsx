import { useState } from "react";
import type { Comment } from "@/types";
import { Box, Avatar, Text, HStack, VStack, Tag } from "@chakra-ui/react";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return (
      <Box mt={3} mb={2} px={2}>
        <Text fontSize="sm" color="gray.400">
          No comments yet.
        </Text>
      </Box>
    );
  }
  return (
    <VStack align="stretch" spacing={2} mt={3} mb={2} px={2}>
      {comments.map((c) => (
        <HStack key={c.id} align="start" spacing={2}>
          <Avatar size="xs" name={c.author} />
          <Box bg="gray.100" px={3} py={2} borderRadius={8} flex={1}>
            <HStack spacing={2} mb={1}>
              <Text fontWeight="bold" fontSize="sm">
                {c.author}
              </Text>
              <Tag size="sm" colorScheme="teal">
                Comment
              </Tag>
            </HStack>
            <Text fontSize="sm">{c.text}</Text>
          </Box>
        </HStack>
      ))}
    </VStack>
  );
}
