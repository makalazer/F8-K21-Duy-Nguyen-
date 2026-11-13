import { Link } from "react-router-dom";
import SuggestionItem from "./SuggestionItem";
import { useQuery } from "@tanstack/react-query";
import { getSuggestionUser } from "@/services/commom.service";
import { CONFIG } from "@/config";

export type SuggestionsUser = {
    profilePicture: string | null;
    username: string;
    userId: string;
    isFollowing: boolean;
    _id: string;
};

function Suggestions() {
    const { data } = useQuery({
        queryKey: ["suggestions"],
        queryFn: async () => getSuggestionUser("10"),
    });
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="">
                <Link to={""} className="flex gap-3">
                    <img
                        src="src/assets/instagram-logo-facebook-2-svgrepo-com.svg"
                        className="w-10"
                    />
                    <div className="flex flex-col">
                        <p>Username</p>
                        <p>name</p>
                    </div>
                </Link>
            </div>
            <div className="flex justify-between">
                <p>Gợi ý cho bạn</p>
                <Link to={""}>Xem tất cả</Link>
            </div>
            <div className="flex flex-col gap-4">
                {data?.data?.map((item: SuggestionsUser) => {
                    return (
                        <SuggestionItem
                            key={item._id}
                            profilePicture={
                                item.profilePicture
                                    ? CONFIG.BASE_URL + item.profilePicture
                                    : ""
                            }
                            userId={item._id}
                            username={item.username}
                            isFollowing={item.isFollowing}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Suggestions;
