import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from "lucide-react";
import usePostAction from "./hooks/usePostAction";
import Caption from "./Caption";

export type PostCardProps = {
    id: string;
    avatar: string;
    username: string;
    creatAt: string;
    img: string;
    isLiked: boolean;
    isSaved: boolean;
    likes: number;
    like?: () => void;
    unlike?: () => void;
};
const mockCmt = {
    userLink: "string",
    username: "string",
    comment: "string",
};
function PostCard(props: PostCardProps) {
    const { id, avatar, username, creatAt, img, isLiked, isSaved, likes } =
        props;
    const { toggleLike, toggleSave } = usePostAction();
    return (
        <div className="w-full max-w-full min-w-0 flex flex-col gap-3 mt-8">
            <div className="flex max-w-full">
                <div className="flex-1 min-w-0 flex gap-3 items-center justify-start">
                    <img
                        src={avatar}
                        alt=""
                        className="size-8 rounded-full object-cover shrink-0"
                    />
                    <span className="truncate">{username}</span>
                    <span className="shrink-0">{creatAt}</span>
                </div>
                <Ellipsis size={24} />
            </div>
            <img
                src={img}
                className="w-full max-w-full aspect-4/5 object-cover"
            />
            <div className="flex gap-3">
                <div className="flex-1 flex gap-3 justify-start">
                    <div className="flex gap-1 items-center ">
                        {isLiked ? (
                            <Heart
                                fill="red"
                                color="red"
                                className="cursor-pointer"
                                onClick={() => toggleLike(id, isLiked)}
                            />
                        ) : (
                            <Heart
                                className="cursor-pointer"
                                onClick={() => toggleLike(id, isLiked)}
                            />
                        )}
                        <span className="text-lg">{likes}</span>
                    </div>
                    <MessageCircle className="cursor-pointer" />
                    <Send className="cursor-pointer" />
                </div>
                {isSaved ? (
                    <Bookmark
                        fill="white"
                        className="cursor-pointer"
                        onClick={() => toggleSave(id, isSaved)}
                    />
                ) : (
                    <Bookmark
                        className="cursor-pointer"
                        onClick={() => toggleSave(id, isSaved)}
                    />
                )}
            </div>
            <Caption {...mockCmt} />
        </div>
    );
}

export default PostCard;
