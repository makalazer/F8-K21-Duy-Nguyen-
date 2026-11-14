import { getUserById } from "@/services/userManament.service";
import { useQuery } from "@tanstack/react-query";

const useUserProfile = (userId: string) => {
    const { data, isPending, isError, isSuccess } = useQuery({
        queryKey: ["user-profile", userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
    });
    return { profile: data?.data, isPending, isError, isSuccess };
};

export default useUserProfile;
