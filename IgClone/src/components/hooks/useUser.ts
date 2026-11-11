import { getCurrentUser } from "@/services/userManament.service";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false,
    });
    //     const queryClient = useQueryClient();
    return { user: data, isLoading, isAuthenticated: error ? false : true };
};

export default useUser;
