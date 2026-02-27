

import { Post } from "@/types/Post.types";
import Posts from "./Posts";

interface PostCardProps {
  post: Post;
  onSelect: (id: string) => void;
}

export function PostCard({ post, onSelect }: PostCardProps) {
  return <Posts post={post} getSinglePost={onSelect} />;
}