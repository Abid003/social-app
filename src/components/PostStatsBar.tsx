import React from "react";

interface PostStatsBarProps {
  liked: boolean;
  likeCount: number;
  onLike: () => void;
  commentCount: number;
  onCommentClick?: () => void;
  showCommentButton?: boolean;
}

export default function PostStatsBar({
  liked,
  likeCount,
  onLike,
  commentCount,
  onCommentClick,
  showCommentButton = true,
}: PostStatsBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
        gap: 16,
      }}
    >
      <button
        onClick={onLike}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginRight: 2,
          display: "flex",
          alignItems: "center",
          fontSize: 20,
          color: liked ? "#e53e3e" : "#A0AEC0",
          transition: "transform 0.1s",
        }}
        title={liked ? "Unlike" : "Like"}
        aria-label="Like"
      >
        {liked ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#e53e3e" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" /></svg>
        )}
        <span style={{ fontSize: 14, marginLeft: 6, color: "#4A5568", fontWeight: 500 }}>{likeCount}</span>
      </button>
      {showCommentButton ? (
        <button
          onClick={onCommentClick}
          style={{
            fontSize: 13,
            color: "#4A5568",
            background: "#EDF2F7",
            borderRadius: 12,
            padding: "2px 10px",
            fontWeight: 500,
            display: "inline-block",
            border: "none",
            cursor: "pointer",
            outline: "none",
            transition: "background 0.15s",
          }}
          title="View post details"
        >
          💬 {commentCount}
        </button>
      ) : (
        <span style={{
          fontSize: 13,
          color: "#4A5568",
          background: "#EDF2F7",
          borderRadius: 12,
          padding: "2px 10px",
          fontWeight: 500,
          display: "inline-block",
        }}>
          💬 {commentCount}
        </span>
      )}
    </div>
  );
}
