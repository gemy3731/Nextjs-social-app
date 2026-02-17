import { postsService } from "@/services/Posts.service";
import { Post } from "@/types/Post.types";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

 const useSinglePost = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const getPost = useCallback(async (id: string) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const fetchedPost = await postsService.getPostById(id);
        setPost(fetchedPost);
        //eslint-disable-next-line
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load post";
        setError(errorMessage);
        toast.error(errorMessage, { position: "top-center" });
      } finally {
        setIsLoading(false);
      }
    }, []);
  
    const closePost = useCallback(() => {
      setPost(null);
      setError(null);
    }, []);
  
    return {
      post,
      isLoading,
      error,
      getPost,
      closePost,
    };
  };

export default useSinglePost