import { postsService } from "@/services/Posts.service";
import { Post } from "@/types/Post.types";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

 const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const isLoadingRef = useRef(false);

    const loadPosts = useCallback(async (pageNum: number) => {
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);
  
      try {
        const newPosts = await postsService.getPosts(pageNum);
        
        if (newPosts.length === 0) {
          setHasMore(false);
          return;
        }
  
        setPosts((prevPosts) => {
          const existingIds = new Set(prevPosts.map(p => p._id));
          const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p._id));
          return [...prevPosts, ...uniqueNewPosts];
        });
        //eslint-disable-next-line
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load posts";
        setError(errorMessage);
        toast.error(errorMessage, { position: "top-center" });
      } finally {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    }, []);
  
    const loadMore = useCallback(() => {
      if (!isLoadingRef.current && hasMore) {
        setPage((prev) => prev + 1);
      }
    }, [ hasMore]);
  
    const refresh = useCallback(async () => {
      setPosts([]);
      setPage(1);
      setHasMore(true);
      await loadPosts(1);
    }, [loadPosts]);
  
  
    useEffect(() => {
      loadPosts(page);
    }, [page, loadPosts]);
  
    return {
      posts,
      isLoading,
      hasMore,
      error,
      loadMore,
      refresh,
    };
  };

  export default usePosts