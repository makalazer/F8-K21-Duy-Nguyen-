import { postCreatePost } from '@/services/common.service';
import { useMutation } from '@tanstack/react-query';

const useSidebarAction = () => {
  const createPostMutation = useMutation({
    mutationFn: ({ caption, file }: { caption: string; file: File }) =>
      postCreatePost(caption, file),
  });
  return { submitPost: createPostMutation.mutate };
};

export default useSidebarAction;
