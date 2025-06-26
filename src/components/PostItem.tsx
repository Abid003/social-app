import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { usePosts } from "@/context/PostsContext";
import { useState } from "react";
import type { Post } from "@/types";
import { useRouter } from "next/navigation";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import PostStatsBar from "./PostStatsBar";

interface PostItemProps {
  post: Post;
  onContentClick?: () => void;
}

export default function PostItem({ post, onContentClick }: PostItemProps) {
  const { posts, setPosts } = usePosts();
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [deletePostOpen, setDeletePostOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setDeletePostOpen(true);
  };
  const confirmDeletePost = () => {
    setPosts(posts.filter((p) => p.id !== post.id));
    setDeletePostOpen(false);
  };
  const cancelDeletePost = () => {
    setDeletePostOpen(false);
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

  // Count total comments and replies
  function getTotalCommentsAndReplies() {
    let total = 0;
    for (const comment of post.comments) {
      total += 1;
      if (comment.replies && Array.isArray(comment.replies)) {
        total += comment.replies.length;
      }
    }
    return total;
  }
  const totalComments = getTotalCommentsAndReplies();

  // Like state for demo (not persisted)
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // demo: random likes

  const handleLike = () => {
    setLiked((prev) => {
      if (prev) {
        setLikeCount((c) => c - 1);
        return false;
      } else {
        setLikeCount((c) => c + 1);
        return true;
      }
    });
  };

  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, background: "#fff", position: 'relative' }}>
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
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Avatar for post author */}
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
              color: "#2d3748",
              marginRight: 6,
            }}
          >
            {post.author?.charAt(0)?.toUpperCase()}
          </span>
          {post.author}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Menu button for edit/delete options */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowMenu((v) => !v)}
              style={{
                background: "none",
                border: "none",
                color: "#444",
                fontSize: 22,
                cursor: "pointer",
                fontWeight: 700,
                lineHeight: 1,
                padding: 4,
                borderRadius: 4,
                minWidth: 0,
              }}
              aria-label="Post options"
            >
              &#8942;
            </button>
            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 28,
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  minWidth: 120,
                  zIndex: 10,
                }}
              >
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleEdit();
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "8px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: 15,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleDelete();
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "8px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "#e53e3e",
                    fontSize: 15,
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
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
          {/* Like and comment count bar for post details page */}
          <PostStatsBar
            liked={liked}
            likeCount={likeCount}
            onLike={handleLike}
            commentCount={totalComments}
            showCommentButton={false}
          />
          <CommentForm postId={post.id} />
          <CommentList comments={post.comments} />
        </>
      )}
      {/* Total comments+replies badge at bottom center (only on news feed, not post details) */}
      {onContentClick && (
        <PostStatsBar
          liked={liked}
          likeCount={likeCount}
          onLike={handleLike}
          commentCount={totalComments}
          onCommentClick={onContentClick}
          showCommentButton={true}
        />
      )}
      {deletePostOpen && (
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
              Delete Post
            </Text>
            <Text mb={4}>
              Are you sure you want to delete this post? This action cannot be undone.
            </Text>
            <HStack justify="flex-end">
              <Button onClick={cancelDeletePost}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDeletePost} ml={3}>
                Delete
              </Button>
            </HStack>
          </Box>
        </Box>
      )}
    </div>
  );
}
