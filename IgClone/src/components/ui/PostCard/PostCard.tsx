import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from "lucide-react";
import CommentOnFeed from "./CommentOnFeed";

type PostCardProps = {
    avatar: string;
    username: string;
    creatAt: string;
    img: string;
};
const mockCmt = {
    userLink: "string",
    username: "string",
    comment: "string",
};
function PostCard(props: PostCardProps) {
    const { avatar, username, creatAt, img } = props;
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
            <img src={img} className="aspect-4/5 min-w-full" />
            <div className="flex gap3">
                <div className="flex-1 flex gap-3 justify-start">
                    <Heart />
                    <MessageCircle />
                    <Send />
                </div>
                <Bookmark className="" />
            </div>
            <CommentOnFeed {...mockCmt} />
        </div>
    );
}

export default PostCard;
