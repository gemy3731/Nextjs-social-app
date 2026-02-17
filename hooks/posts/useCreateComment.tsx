import { postsService } from "@/services/Posts.service";
import { CreateCommentData } from "@/types/Post.types";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const useCreateComment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = useCallback(async (data: CreateCommentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const newComment = await postsService.createComment(data);
      toast.success("Comment created successfully", { position: "top-right" });
      return newComment;
      //eslint-disable-next-line
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create comment";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right" });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createComment,
    isLoading,
    error,
  };
};

export default useCreateComment;
