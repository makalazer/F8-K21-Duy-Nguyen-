import { getUserPosts } from "@/services/userManament.service";
import { useQuery } from "@tanstack/react-query";

const useUserPosts = (userId: string) => {
    const { data, isPending, isError } = useQuery({
        queryKey: ["user-posts", userId],
        queryFn: async () => getUserPosts(userId),
        enabled: !!userId,
    });

    const totalPosts = data?.data?.length ?? 0;
    return { posts: data?.data?.posts, isPending, isError, totalPosts };
};

export default useUserPosts;
