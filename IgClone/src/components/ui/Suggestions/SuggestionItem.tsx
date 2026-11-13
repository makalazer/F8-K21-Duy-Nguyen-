import useSuggestionAction from "./hooks/useSuggestionAction";

type SuggestionItemProps = {
    profilePicture: string | null;
    username: string;
    userId: string;
    isFollowing: boolean;
};

function SuggestionItem(props: SuggestionItemProps) {
    const { followUser } = useSuggestionAction();

    const { profilePicture, userId, username, isFollowing } = props;
    return (
        <div className="flex justify-between align-middle items-center">
            <div className="flex gap-3">
                {profilePicture ? (
                    <img
                        src={profilePicture}
                        className="w-12 rounded-full aspect-square"
                    />
                ) : (
                    <div className="bg-amber-100 w-12  aspect-square capitalize rounded-full text-gray-700 flex items-center">
                        <p className="mx-auto text-xl font-semibold">
                            {username[0]}
                        </p>
                    </div>
                )}
                <div className=" flex flex-col">
                    <p>{username}</p>
                    <p>Gợi ý cho bạn</p>
                </div>
            </div>
            {isFollowing ? (
                <p
                    className="text-mauve-400 cursor-pointer hover:opacity-80 py-auto"
                    onClick={() => {
                        followUser(userId, isFollowing);
                    }}
                >
                    Đã theo dõi
                </p>
            ) : (
                <p
                    onClick={() => {
                        followUser(userId, isFollowing);
                    }}
                    className="text-blue-400 cursor-pointer hover:opacity-80 py-auto"
                >
                    Theo dõi
                </p>
            )}
        </div>
    );
}

export default SuggestionItem;
