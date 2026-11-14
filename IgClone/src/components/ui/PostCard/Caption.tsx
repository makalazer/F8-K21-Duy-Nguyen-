import { Link } from "react-router-dom";
type CaptionProps = {
    userLink: string;
    username: string;
    caption: string;
};
function Caption(props: CaptionProps) {
    const { userLink, caption, username } = props;
    return (
        <div className="flex gap-2">
            <Link to={userLink}>
                <span className="font-bold">{username}</span>
            </Link>
            <span>{caption}</span>
        </div>
    );
}

export default Caption;
