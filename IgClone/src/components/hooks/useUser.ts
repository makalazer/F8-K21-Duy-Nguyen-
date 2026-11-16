import { CONFIG } from "@/config";
import { getCurrentUser } from "@/services/userManament.service";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
        retry: false,
    });
    return {
        currentUser: data?.data,
        isLoading,
        isAuthenticated: error ? false : true,
        profilePicture: data?.data?.profilePicture
            ? CONFIG.BASE_URL + data.data.profilePicture
            : "",
        currentUsername: data?.data?.username ?? "",
        currentFullName: data?.data?.fullName ?? "",
        currentUserId: data?.data?._id ?? "",
    };
};

export default useUser;
