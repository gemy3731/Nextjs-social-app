import { PostsFeed } from "@/_components/Posts/PostsFeed";
import { authService } from "@/services/Authservice";
import { postsService } from "@/services/Posts.service";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await authService.isAuthenticated();
  
  if (!user) {
    redirect("/login");
  }
  const initialPosts = await postsService.getPosts(1).catch(() => []);
  return <PostsFeed initialPosts={initialPosts} initialHasMore={initialPosts.length > 0} />;
}
