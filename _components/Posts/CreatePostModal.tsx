import { useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  Input,
  IconButton,
  Button,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "@mui/system";
import useCreatePost from "@/hooks/posts/useCreatePost";



const InputElement = styled("input")(() => `
  width: 100%;
  color: white;
  background-color: #252728;
  border-bottom: gray 1px solid;
  padding: 10px;
  resize: none;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`);

const VisuallyHiddenInput = styled("input")({
  height: "100%",
  position: "absolute",
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  whiteSpace: "nowrap",
  width: "100%",
  opacity: 0,
});


interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreatePostModal = ({
  open,
  onClose,
  onSuccess,
}: CreatePostModalProps) => {
  const { createPost, isLoading } = useCreatePost();
  const postCaptionRef = useRef<HTMLInputElement>(null);
  const postImgRef = useRef<HTMLInputElement>(null);

  const handleCreatePost = async () => {
    const body = postCaptionRef.current?.value || "";
    const image = postImgRef.current?.files?.[0];

    if (!body.trim() && !image) {
      return;
    }

    try {
      await createPost({ body, image });
      
      // Reset form
      if (postCaptionRef.current) postCaptionRef.current.value = "";
      if (postImgRef.current) postImgRef.current.value = "";
      
      onClose();
      onSuccess?.();
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <Modal
      aria-labelledby="create-post-modal"
      aria-describedby="create-post-form"
      open={open}
      onClose={onClose}
      sx={{
        mx: "auto",
        mt: "100px",
        width: { xs: "90%", md: "70%" },
        bgcolor: "rgb(0,0,0,0.6)",
      }}
    >
      <Box sx={{ bgcolor: "#252728", p: 2 }}>
        <Typography component="h2" variant="h5" sx={{ color: "white", mb: 2 }}>
          Create Post
        </Typography>

        <Input
          inputComponent="textarea"
          inputRef={postCaptionRef}
          title="Create Post"
          slots={{ input: InputElement }}
          fullWidth
          multiline
          disableUnderline
          placeholder="What's on your mind?..."
        />

        <IconButton
          sx={{
            position: "relative",
            width: "fit-content",
            mx: "auto",
            display: "block",
            cursor: "pointer",
          }}
        >
          <AddPhotoAlternateIcon
            titleAccess="Attach Image"
            sx={{ color: "white" }}
          />
          <VisuallyHiddenInput
            ref={postImgRef}
            type="file"
            accept="image/*"
            sx={{ cursor: "pointer" }}
          />
        </IconButton>

        <Button
          title="Create"
          variant="contained"
          onClick={handleCreatePost}
          disabled={isLoading}
          sx={{ width: "fit-content", ml: "auto", display: "block" }}
        >
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </Box>
    </Modal>
  );
};