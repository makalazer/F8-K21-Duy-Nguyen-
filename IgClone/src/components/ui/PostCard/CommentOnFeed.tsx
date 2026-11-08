import { Link } from "react-router-dom";
type CommontOnFeedProps = {
    userLink: string;
    username: string;
    comment: string;
};
function CommentOnFeed(props: CommontOnFeedProps) {
    const { userLink, comment, username } = props;
    return (
        <div className="flex gap-2">
            <Link to={userLink}>
                <span className="font-bold">{username}</span>
            </Link>
            <span>{comment}</span>
        </div>
    );
}

export default CommentOnFeed;
