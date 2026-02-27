"use client";

import { CreatePostTrigger } from "./Createposttrigger";
import { CreatePostModal } from "./CreatePostModal";

interface CreatePostSectionProps {
  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onSuccess: () => void;
}

export function CreatePostSection({
  modalOpen,
  onOpenModal,
  onCloseModal,
  onSuccess,
}: CreatePostSectionProps) {
  return (
    <>
      <CreatePostTrigger onClick={onOpenModal} />
      <CreatePostModal open={modalOpen} onClose={onCloseModal} onSuccess={onSuccess} />
    </>
  );
}