import { useRef } from "react";
import { Box, Typography, Input, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "@mui/system";

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

interface CreatePostTriggerProps {
  onClick: () => void;
}

export const CreatePostTrigger = ({ onClick }: CreatePostTriggerProps) => {
  const removeFocus = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    removeFocus.current?.blur();
    onClick();
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        bgcolor: "#252728",
        p: 2,
        cursor: "pointer",
        "&:hover": {
          bgcolor: "#2d2f30",
        },
        transition: "background-color 0.2s",
      }}
    >
      <Typography component="h2" variant="h5" sx={{ color: "white", mb: 1 }}>
        Create Post
      </Typography>
      
      <Input
        inputRef={removeFocus}
        onFocus={handleClick}
        title="Create Post"
        slots={{ input: InputElement }}
        fullWidth
        multiline
        disableUnderline
        placeholder="What's on your mind?..."
        readOnly
      />
      
      <IconButton sx={{ mx: "auto", display: "block" }}>
        <AddPhotoAlternateIcon
          titleAccess="Create Post"
          sx={{ color: "white" }}
        />
      </IconButton>
    </Box>
  );
};