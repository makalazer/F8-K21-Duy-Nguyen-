import { Ellipsis } from "lucide-react";

type PostCardProps = {
    avatar: string;
    username: string;
    creatAt: string;
};
function PostCard(props: PostCardProps) {
    const { avatar, username, creatAt } = props;
    return (
        <div>
            <div>
                <img src={avatar} alt="" />
                <span>{username}</span>
                <span>{creatAt}</span>
                <Ellipsis size={24} />
            </div>
        </div>
    );
}

export default PostCard;
