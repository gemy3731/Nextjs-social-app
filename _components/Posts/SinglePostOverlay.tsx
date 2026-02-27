
import { Box } from "@mui/material";
import { Post } from "@/types/Post.types";
import SinglePost from "@/_components/SinglePost/SinglePost";

interface SinglePostOverlayProps {
  post: Post;
  onClose: () => void;
  onCreateComment: (data: { content: string; post: string | undefined }) => Promise<void>;
}

export function SinglePostOverlay({ post, onClose, onCreateComment }: SinglePostOverlayProps) {
  return (
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
      <SinglePost singlePost={post} closePost={onClose} createComment={onCreateComment} />
    </Box>
  );
}