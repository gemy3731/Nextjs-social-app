

import { Box } from "@mui/material";
import { Post } from "@/types/Post.types";
import { PostCard } from "./PostCard";
import LoadingSpinner from "@/_components/shared/LoadingSpinner";

interface PostsListProps {
  posts: Post[];
  isLoading: boolean;
  hasMore: boolean;
  onSelectPost: (id: string) => void;
}

export function PostsList({ posts, isLoading, hasMore, onSelectPost }: PostsListProps) {
  return (
    <>
      {posts.map((post, i) => (
        <PostCard key={post._id + "-" + i} post={post} onSelect={onSelectPost} />
      ))}

      {isLoading && <LoadingSpinner />}

      {!hasMore && posts.length > 0 && (
        <Box sx={{ textAlign: "center", py: 3, color: "gray" }}>
          No more posts to load
        </Box>
      )}
    </>
  );
}