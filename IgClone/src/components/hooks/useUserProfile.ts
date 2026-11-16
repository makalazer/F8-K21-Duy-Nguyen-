import { CONFIG } from "@/config";
import { getUserById } from "@/services/userManament.service";
import { useQuery } from "@tanstack/react-query";

const useUserProfile = (userId: string) => {
    const { data, isPending, isError, isSuccess } = useQuery({
        queryKey: ["user-profile", userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
    });
    return {
        profile: data?.data,
        isPending,
        isError,
        isSuccess,
        profilePicture: data?.data?.profilePicture
            ? CONFIG.BASE_URL + data.data.profilePicture
            : "",
        username: data?.data?.username ?? "",
        fullName: data?.data?.fullName ?? "",
        followersCount: data?.data?.followersCount ?? 0,
        followingCount: data?.data?.followingCount ?? 0,
        postsCount: data?.data?.postsCount ?? 0,
    };
};

export default useUserProfile;
