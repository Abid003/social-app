import { usePosts } from "@/context/PostsContext";
import { IconButton, Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import type { Comment } from "@/types";
import { Box, Text, HStack, VStack } from "@chakra-ui/react";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  const { posts, setPosts } = usePosts();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setDeleteId(null);
  };

  const confirmDelete = () => {
    if (deleteId == null) return;
    setPosts((prevPosts: any[]) =>
      prevPosts.map((post) => ({
        ...post,
        comments: post.comments.filter((c: Comment) => c.id !== deleteId),
      }))
    );
    setDeleteId(null);
    setIsOpen(false);
  };

  const handleEditComment = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };
  const handleSaveEdit = () => {
    setPosts((prevPosts: any[]) =>
      prevPosts.map((post) => ({
        ...post,
        comments: post.comments.map((c: Comment) =>
          c.id === editId ? { ...c, text: editText } : c
        ),
      }))
    );
    setEditId(null);
    setEditText("");
  };
  const handleCancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

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
    <VStack align="stretch" gap={2} mt={3} mb={2} px={2}>
      {[...comments]
        .slice()
        .reverse()
        .map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            editId={editId}
            editText={editText}
            setEditId={setEditId}
            setEditText={setEditText}
            handleEditComment={handleEditComment}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            handleDelete={handleDelete}
          />
        ))}
      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.400"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="white"
            p={6}
            borderRadius={8}
            minW="300px"
            boxShadow="lg"
          >
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Delete Comment
            </Text>
            <Text mb={4}>
              Are you sure you want to delete this comment? This action cannot be
              undone.
            </Text>
            <HStack justify="flex-end">
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </HStack>
          </Box>
        </Box>
      )}
    </VStack>
  );
}

function CommentItem({ comment: c, editId, editText, setEditId, setEditText, handleEditComment, handleSaveEdit, handleCancelEdit, handleDelete }: any) {
  const [showMenu, setShowMenu] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const { posts, setPosts } = usePosts();
  // Add this state to control replies collapse/expand
  const [showReplies, setShowReplies] = useState(false);
  // Add this state to track which reply menu is open
  const [showReplyMenuId, setShowReplyMenuId] = useState<number | null>(null);

  // Add reply logic
  const handleAddReply = () => {
    if (!replyText.trim()) return;
    setPosts((prevPosts: any[]) =>
      prevPosts.map((post) => ({
        ...post,
        comments: post.comments.map((comment: any) => {
          if (comment.id === c.id) {
            const newReply = {
              id: Date.now(),
              author: "You", // Replace with actual user if available
              text: replyText,
              createdAt: new Date().toISOString(),
            };
            return {
              ...comment,
              replies: comment.replies ? [...comment.replies, newReply] : [newReply],
            };
          }
          return comment;
        }),
      }))
    );
    setReplyText("");
    setShowReplyForm(false);
  };

  // Edit/delete reply logic
  const [editReplyId, setEditReplyId] = useState<number | null>(null);
  const [editReplyText, setEditReplyText] = useState("");
  const [deleteReplyId, setDeleteReplyId] = useState<number | null>(null);
  const [isReplyDeleteOpen, setIsReplyDeleteOpen] = useState(false);

  const handleEditReply = (replyId: number, text: string) => {
    setEditReplyId(replyId);
    setEditReplyText(text);
  };
  const handleSaveEditReply = () => {
    setPosts((prevPosts: any[]) =>
      prevPosts.map((post) => ({
        ...post,
        comments: post.comments.map((comment: any) => {
          if (comment.id === c.id) {
            return {
              ...comment,
              replies: comment.replies?.map((r: any) =>
                r.id === editReplyId ? { ...r, text: editReplyText } : r
              ),
            };
          }
          return comment;
        }),
      }))
    );
    setEditReplyId(null);
    setEditReplyText("");
  };
  const handleCancelEditReply = () => {
    setEditReplyId(null);
    setEditReplyText("");
  };
  const handleDeleteReply = (replyId: number) => {
    setDeleteReplyId(replyId);
    setIsReplyDeleteOpen(true);
  };
  const confirmDeleteReply = () => {
    setPosts((prevPosts: any[]) =>
      prevPosts.map((post) => ({
        ...post,
        comments: post.comments.map((comment: any) => {
          if (comment.id === c.id) {
            return {
              ...comment,
              replies: comment.replies?.filter((r: any) => r.id !== deleteReplyId),
            };
          }
          return comment;
        }),
      }))
    );
    setDeleteReplyId(null);
    setIsReplyDeleteOpen(false);
  };
  const onCloseReplyDelete = () => {
    setIsReplyDeleteOpen(false);
    setDeleteReplyId(null);
  };

  return (
    <Box position="relative" mb={c.replies && c.replies.length ? 2 : 0}>
      {/* 3-dot menu for comment options */}
      <div style={{ position: "absolute", top: 1, right: 1, zIndex: 2 }}>
        <button
          onClick={() => setShowMenu((v) => !v)}
          style={{
            background: "none",
            border: "none",
            color: "#444",
            fontSize: 18,
            cursor: "pointer",
            fontWeight: 700,
            lineHeight: 1,
            padding: 2,
            borderRadius: 4,
            minWidth: 0,
          }}
          aria-label="Comment options"
        >
          &#8942;
        </button>
        {showMenu && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 22,
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 6,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              minWidth: 90,
              zIndex: 10,
            }}
          >
            <button
              onClick={() => {
                setShowMenu(false);
                handleEditComment(c.id, c.text);
              }}
              style={{
                display: "block",
                width: "100%",
                background: "none",
                border: "none",
                padding: "6px 12px",
                textAlign: "left",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                handleDelete(c.id);
              }}
              style={{
                display: "block",
                width: "100%",
                background: "none",
                border: "none",
                padding: "6px 12px",
                textAlign: "left",
                cursor: "pointer",
                color: "#e53e3e",
                fontSize: 14,
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <HStack align="start" gap={2}>
        {/* Simple avatar alternative */}
        <Box
          width="24px"
          height="24px"
          borderRadius="50%"
          bg="gray.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="xs"
          fontWeight="bold"
          color="gray.700"
        >
          {c.author.charAt(0).toUpperCase()}
        </Box>
        <Box bg="gray.100" px={3} py={2} borderRadius={8} flex={1}>
          <HStack gap={2} mb={1}>
            <Text fontWeight="bold" fontSize="sm">
              {c.author}
            </Text>
            {/* Simple tag alternative */}
          </HStack>
          {editId === c.id ? (
            <Box>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{
                  width: "100%",
                  fontSize: "14px",
                  padding: "4px 8px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
              <HStack mt={2} gap={2}>
                <Button
                  size="xs"
                  colorScheme="teal"
                  onClick={handleSaveEdit}
                >
                  Save
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </HStack>
            </Box>
          ) : (
            <Text fontSize="sm">{c.text}</Text>
          )}
          {/* Reply button */}
          <Button
            size="xs"
            variant="ghost"
            colorScheme="teal"
            mt={1}
            onClick={() => setShowReplyForm((v) => !v)}
          >
            Reply
          </Button>
          {/* Reply form */}
          {showReplyForm && (
            <Box mt={2}>
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                style={{
                  width: "100%",
                  fontSize: "14px",
                  padding: "4px 8px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
                placeholder="Write a reply..."
              />
              <HStack mt={2} gap={2}>
                <Button size="xs" colorScheme="teal" onClick={handleAddReply}>
                  Reply
                </Button>
                <Button size="xs" variant="ghost" onClick={() => setShowReplyForm(false)}>
                  Cancel
                </Button>
              </HStack>
            </Box>
          )}
          {/* Replies collapse/expand toggle */}
          {c.replies && c.replies.length > 0 && (
            <Box mt={2}>
              <Button
                size="xs"
                variant="ghost"
                colorScheme="gray"
                onClick={() => setShowReplies((v) => !v)}
                leftIcon={<span style={{ display: 'inline-block', transform: showReplies ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>{showReplies ? '▼' : '►'}</span>}
                style={{ fontWeight: 500 }}
              >
                {showReplies ? `Hide replies` : `Show replies (${c.replies.length})`}
              </Button>
            </Box>
          )}
          {/* Replies list */}
          {c.replies && c.replies.length > 0 && showReplies && (
            <VStack align="stretch" gap={1} mt={3} pl={4} borderLeft="2px solid #e2e8f0">
              {[...c.replies]
                .slice()
                .reverse()
                .map((r: any) => (
                  <Box key={r.id} position="relative">
                    {/* 3-dot menu for reply options */}
                    <div style={{ position: "absolute", top: 1, right: 1, zIndex: 2 }}>
                      <button
                        onClick={() => setShowReplyMenuId(showReplyMenuId === r.id ? null : r.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#444",
                          fontSize: 16,
                          cursor: "pointer",
                          fontWeight: 700,
                          lineHeight: 1,
                          padding: 2,
                          borderRadius: 4,
                          minWidth: 0,
                        }}
                        aria-label="Reply options"
                      >
                        &#8942;
                      </button>
                      {showReplyMenuId === r.id && (
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 22,
                            background: "#fff",
                            border: "1px solid #eee",
                            borderRadius: 6,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            minWidth: 90,
                            zIndex: 10,
                          }}
                        >
                          <button
                            onClick={() => {
                              setShowReplyMenuId(null);
                              handleEditReply(r.id, r.text);
                            }}
                            style={{
                              display: "block",
                              width: "100%",
                              background: "none",
                              border: "none",
                              padding: "6px 12px",
                              textAlign: "left",
                              cursor: "pointer",
                              fontSize: 14,
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setShowReplyMenuId(null);
                              handleDeleteReply(r.id);
                            }}
                            style={{
                              display: "block",
                              width: "100%",
                              background: "none",
                              border: "none",
                              padding: "6px 12px",
                              textAlign: "left",
                              cursor: "pointer",
                              color: "#e53e3e",
                              fontSize: 14,
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <HStack align="start" gap={2}>
                      <Box
                        width="22px"
                        height="22px"
                        borderRadius="50%"
                        bg="gray.200"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="xs"
                        fontWeight="bold"
                        color="gray.700"
                      >
                        {r.author.charAt(0).toUpperCase()}
                      </Box>
                      <Box bg="gray.50" px={3} py={2} borderRadius={8} flex={1}>
                        <HStack gap={2} mb={1}>
                          <Text fontWeight="bold" fontSize="xs">
                            {r.author}
                          </Text>
                        </HStack>
                        {editReplyId === r.id ? (
                          <Box>
                            <input
                              value={editReplyText}
                              onChange={(e) => setEditReplyText(e.target.value)}
                              style={{
                                width: "100%",
                                fontSize: "14px",
                                padding: "4px 8px",
                                borderRadius: 4,
                                border: "1px solid #ccc",
                              }}
                            />
                            <HStack mt={2} gap={2}>
                              <Button size="xs" colorScheme="teal" onClick={handleSaveEditReply}>
                                Save
                              </Button>
                              <Button size="xs" variant="ghost" onClick={handleCancelEditReply}>
                                Cancel
                              </Button>
                            </HStack>
                          </Box>
                        ) : (
                          <Text fontSize="sm">{r.text}</Text>
                        )}
                      </Box>
                    </HStack>
                  </Box>
                ))}
              {/* Reply delete confirmation modal */}
              {isReplyDeleteOpen && (
                <Box
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.4)",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    bg="white"
                    p={6}
                    borderRadius={8}
                    minW="300px"
                    boxShadow="lg"
                  >
                    <Text fontWeight="bold" fontSize="lg" mb={2}>
                      Delete Reply
                    </Text>
                    <Text mb={4}>
                      Are you sure you want to delete this reply? This action cannot be undone.
                    </Text>
                    <HStack justify="flex-end">
                      <Button onClick={onCloseReplyDelete}>Cancel</Button>
                      <Button colorScheme="red" onClick={confirmDeleteReply} ml={3}>
                        Delete
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              )}
            </VStack>
          )}
        </Box>
      </HStack>
    </Box>
  );
}
