import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from "lucide-react";
import CommentOnFeed from "./CommentOnFeed";

export type PostCardProps = {
    avatar: string;
    username: string;
    creatAt: string;
    img: string;
    isLiked: boolean;
    isSaved: boolean;
    likes: string;
    like?: () => void;
    unlike?: () => void;
};
const mockCmt = {
    userLink: "string",
    username: "string",
    comment: "string",
};
function PostCard(props: PostCardProps) {
    const {
        avatar,
        username,
        creatAt,
        img,
        isLiked,
        isSaved,
        likes,
        like,
        unlike,
    } = props;
    return (
        <div className="w-full flex flex-col gap-3 mt-8">
            <div className="flex">
                <div className="flex-1 flex gap-3 justify-start">
                    <img src={avatar} alt="" />
                    <span>{username}</span>
                    <span>{creatAt}</span>
                </div>
                <Ellipsis size={24} />
            </div>
            <img src={img} className="aspect-4/5 min-w-full rounded-xl" />
            <div className="flex gap3">
                <div className="flex-1 flex gap-3 justify-start">
                    <div className="flex gap-1 items-center ">
                        {isLiked ? (
                            <Heart
                                fill="red"
                                color="red"
                                className="cursor-pointer"
                                onClick={() => {
                                    unlike?.();
                                }}
                            />
                        ) : (
                            <Heart
                                className="cursor-pointer"
                                onClick={() => like?.()}
                            />
                        )}
                        <span className="text-lg">{likes}</span>
                    </div>
                    <MessageCircle className="cursor-pointer" />
                    <Send className="cursor-pointer" />
                </div>
                {isSaved ? (
                    <Bookmark fill="white" className="cursor-pointer" />
                ) : (
                    <Bookmark className="cursor-pointer" />
                )}
            </div>
            <CommentOnFeed {...mockCmt} />
        </div>
    );
}

export default PostCard;
