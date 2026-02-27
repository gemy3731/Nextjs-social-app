import { postsService } from "@/services/Posts.service";
import { Post } from "@/types/Post.types";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface UsePostsOptions {
  initialPosts?: Post[];
  initialHasMore?: boolean;
}
 const usePosts = ({ initialPosts = [], initialHasMore = true }: UsePostsOptions = {}) => {
    const [posts, setPosts] = useState<Post[]>(initialPosts );
    const [page, setPage] = useState<number>(initialPosts.length > 0 ? 2 : 1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
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

      if (page === 1 && initialPosts.length > 0) return;
      loadPosts(page);
      // eslint-disable-next-line react-hooks/exhaustive-deps
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