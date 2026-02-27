"use client";

import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Post } from "@/types/Post.types";
import usePosts from "@/hooks/posts/usePosts";
import useSinglePost from "@/hooks/posts/useSinglePost";
import useCreateComment from "@/hooks/posts/useCreateComment";
import { useInfiniteScroll } from "@/hooks/Useinfinitescroll";
import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import { PostsList } from "./PostsList";
import { CreatePostSection } from "./CreatePostSection";
import { SinglePostOverlay } from "./SinglePostOverlay";

interface PostsFeedProps {
  initialPosts: Post[];
  initialHasMore: boolean;
}

export function PostsFeed({ initialPosts, initialHasMore }: PostsFeedProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const { posts, isLoading, hasMore, loadMore, refresh } = usePosts({
    initialPosts,
    initialHasMore,
  });

  const {
    post: singlePost,
    isLoading: isSinglePostLoading,
    getPost,
    closePost,
  } = useSinglePost();

  const { createComment } = useCreateComment();

  useInfiniteScroll({ onLoadMore: loadMore, isLoading, hasMore, threshold: 10 });

  const handleCreateComment = async (data: {
    content: string;
    post: string | undefined;
  }) => {
    if (!data.post) return;
    try {
      await createComment({ content: data.content, post: data.post });
      closePost();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <>
      {isSinglePostLoading && <LoadingSpinner fullScreen />}

      <Box sx={{ display: singlePost ? "none" : "block", mx: "auto" }}>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <CreatePostSection
              modalOpen={modalOpen}
              onOpenModal={() => setModalOpen(true)}
              onCloseModal={() => setModalOpen(false)}
              onSuccess={refresh}
            />

            <PostsList
              posts={posts}
              isLoading={isLoading}
              hasMore={hasMore}
              onSelectPost={getPost}
            />
          </Grid>
        </Grid>
      </Box>

      {singlePost && (
        <SinglePostOverlay
          post={singlePost}
          onClose={closePost}
          onCreateComment={handleCreateComment}
        />
      )}
    </>
  );
}