import { Link } from "react-router-dom";
type CaptionProps = {
    userId: string;
    username: string;
    caption: string;
};
function Caption(props: CaptionProps) {
    const { userId, caption, username } = props;
    return (
        <div className="flex gap-2">
            <Link to={`/profile/${userId}`}>
                <span className="font-bold">{username}</span>
            </Link>
            <span>{caption}</span>
        </div>
    );
}

export default Caption;
