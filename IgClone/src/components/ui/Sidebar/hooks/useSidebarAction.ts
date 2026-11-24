import { postLogout } from '@/services/auth.service';
import { postCreatePost } from '@/services/common.service';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSidebarAction = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [fileType, setFileType] = useState<string | null>(null);
  const [openCreatePostDialog, setOpenCreatePostDialog] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const createPostMutation = useMutation({
    mutationFn: ({ caption, file }: { caption: string; file: File }) =>
      postCreatePost(caption, file),
    onSettled: () => {
      handleClearDialogData();
    },
  });

  const mutationLogout = useMutation({
    mutationFn: postLogout,
    onError: (err) => {
      console.dir(err);
    },
    onSuccess: () => {
      navigate('/login');
    },
  });

  function handleClearDialogData() {
    setCaption('');
    setFileType('');
    setPreviewURL('');
    setSelectedFile(null);
  }

  return {
    submitPost: createPostMutation.mutate,
    logout: mutationLogout.mutate,
    setCaption,
    setSelectedFile,
    setPreviewURL,
    setFileType,
    setOpenCreatePostDialog,
    handleClearDialogData,
    selectedFile,
    previewURL,
    caption,
    fileType,
    openCreatePostDialog,
    isPending: createPostMutation.isPending,
  };
};

export default useSidebarAction;
