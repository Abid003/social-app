// TypeScript types and interfaces for posts, users, comments, etc.

export interface Comment {
  id: number;
  author: string;
  text: string;
}

export interface Post {
  id: number;
  author: string;
  content: string;
  comments: Comment[];
}
