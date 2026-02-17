import { postsService } from "@/services/Posts.service";
import { CreatePostData } from "@/types/Post.types";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(async (data: CreatePostData) => {
    setIsLoading(true);
    setError(null);

    try {
      const newPost = await postsService.createPost(data);
      toast.success("Post created successfully", { position: "top-right" });
      return newPost;
      //eslint-disable-next-line
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create post";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right" });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createPost,
    isLoading,
    error,
  };
};

export default useCreatePost;
