import { Link } from "react-router-dom";
import SuggestionItem from "./SuggestionItem";
import { CONFIG } from "@/config";
import { cn } from "cn";
import useSuggestionAction from "./hooks/useSuggestionAction";
import useUser from "@/components/hooks/useUser";

export type SuggestionsUser = {
    profilePicture: string | null;
    username: string;
    userId: string;
    isFollowing: boolean;
    _id: string;
};

function Suggestions() {
    const { suggestions, isSuggestionsPending } = useSuggestionAction();
    const { currentUsername, currentFullName, profilePicture, currentUserId } =
        useUser();
    return (
        <div
            className={cn(
                "flex flex-col gap-4 w-full",
                isSuggestionsPending
                    ? "opacity-0 translate-y-8"
                    : "opacity-100 translate-y-0",
            )}
        >
            <div className="">
                <Link to={`/profile/${currentUserId}`} className="flex gap-3">
                    {profilePicture ? (
                        <img
                            src={profilePicture}
                            className="w-12 rounded-full aspect-square"
                        />
                    ) : (
                        <div className="bg-amber-100 w-12  aspect-square capitalize rounded-full text-gray-700 flex items-center">
                            <p className="mx-auto text-xl font-semibold">
                                {currentUsername[0]}
                            </p>
                        </div>
                    )}
                    <div className="flex flex-col">
                        <p>{currentUsername}</p>
                        <p>{currentFullName}</p>
                    </div>
                </Link>
            </div>
            <div className="flex justify-between">
                <p>Gợi ý cho bạn</p>
                <Link to={""}>Xem tất cả</Link>
            </div>
            <div
                className={cn(
                    "flex flex-col gap-4",
                    isSuggestionsPending
                        ? "opacity-0 translate-y-8"
                        : "opacity-100 translate-y-0",
                )}
            >
                {suggestions.map((item: SuggestionsUser) => {
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
