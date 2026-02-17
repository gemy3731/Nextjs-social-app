"use client";

import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import Posts from "@/_components/Posts/Posts";
import SinglePost from "@/_components/SinglePost/SinglePost";
import { useAuth } from "@/hooks/UseAuth";
import usePosts from "@/hooks/posts/usePosts";
import useSinglePost from "@/hooks/posts/useSinglePost";
import useCreateComment from "@/hooks/posts/useCreateComment";
import { CreatePostModal } from "@/_components/Posts/CreatePostModal";
import LoadingSpinner from "@/_components/shared/LoadingSpinner";
import { useInfiniteScroll } from "@/hooks/Useinfinitescroll";
import { CreatePostTrigger } from "@/_components/Posts/Createposttrigger";


export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  // Posts management
  const { posts, isLoading, hasMore, loadMore, refresh } = usePosts();

  // Single post view
  const { post: singlePost, isLoading: isSinglePostLoading, getPost, closePost } = useSinglePost();

  // Comment creation
  const { createComment } = useCreateComment();

  // Infinite scroll
  useInfiniteScroll({
    onLoadMore: loadMore,
    isLoading,
    hasMore,
    threshold: 10,
  });

  // Authentication check
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Handlers
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleModalSuccess = () => {
    refresh(); // Reload posts after creating new one
  };

  const handleGetSinglePost = (id: string) => {
    getPost(id);
  };

  const handleClosePost = () => {
    closePost();
  };

  const handleCreateComment = async (data: { content: string; post: string | undefined }) => {
    if (!data.post) return;

    try {
      await createComment({
        content: data.content,
        post: data.post,
      });
      closePost();
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <>
      {/* Full screen loader */}
      {isSinglePostLoading && <LoadingSpinner fullScreen />}

      {/* Main feed */}
      <Box sx={{ display: singlePost ? "none" : "block",mx:"auto" }}>
        <Grid container spacing={3} sx={{ display: "flex",alignItems:"center",justifyContent:"center" }}>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Create post trigger */}
            <CreatePostTrigger onClick={handleOpenModal} />

            {/* Posts list */}
            {posts.map((post, i) => (
              <Posts
                key={post._id + "-" + i}
                post={post}
                getSinglePost={handleGetSinglePost}
              />
            ))}

            {/* Loading indicator for infinite scroll */}
            {isLoading && <LoadingSpinner />}

            {/* End of posts message */}
            {!hasMore && posts.length > 0 && (
              <Box sx={{ textAlign: "center", py: 3, color: "gray" }}>
                No more posts to load
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Single post view */}
      {singlePost && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
          }}
        >
          <SinglePost
            singlePost={singlePost}
            closePost={handleClosePost}
            createComment={handleCreateComment}
          />
        </Box>
      )}

      {/* Create post modal */}
      <CreatePostModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}