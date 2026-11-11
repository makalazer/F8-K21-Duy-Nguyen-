import { postFollowUser } from "@/services/commom.service";
import { useMutation } from "@tanstack/react-query";

type SuggestionItemProps = {
    avatar: string | null;
    username: string;
    userId: string;
};
function SuggestionItem(props: SuggestionItemProps) {
    const mutation = useMutation({
        mutationFn: postFollowUser,
    });
    const { avatar, userId, username } = props;
    return (
        <div className="flex justify-between align-middle items-center">
            <div className="flex gap-3">
                <img src={avatar || ""} className="w-10" />
                <div className=" flex flex-col">
                    <p>{username}</p>
                    <p>Gợi ý cho bạn</p>
                </div>
            </div>
            <p
                onClick={() => {
                    mutation.mutate(userId);
                }}
                className="text-blue-400 cursor-pointer hover:opacity-80 py-auto"
            >
                Theo dõi
            </p>
        </div>
    );
}

export default SuggestionItem;
