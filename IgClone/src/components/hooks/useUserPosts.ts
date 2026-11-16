import { getUserPosts } from "@/services/userManament.service";
import { useQuery } from "@tanstack/react-query";

const useUserPosts = (userId: string) => {
    const { data, isPending, isError } = useQuery({
        queryKey: ["user-posts", userId],
        queryFn: async () => getUserPosts(userId),
        enabled: !!userId,
    });

    return {
        posts: data?.data?.posts ?? [],
        isPending,
        isError,
        totalPosts: data?.data?.total ?? 0,
    };
};

export default useUserPosts;
