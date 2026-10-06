type LikeButtonProps = {
    likes: number;
    onLike: () => void;
};

export function LikeButton({ likes, onLike }: LikeButtonProps) {
    return (
        <button
            style={{
                maxWidth: "300px",
                marginInline: "auto",
                minWidth: "200px",
            }}
            onClick={onLike}
        >
            Thích ({likes})
        </button>
    );
}
