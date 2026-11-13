import PostCard, {
    type PostCardProps,
} from "@/components/ui/PostCard/PostCard";
import Suggestions from "@/components/ui/Suggestions/Suggestions";
import { CONFIG } from "@/config";
import MainLayout from "@/layouts/MainLayout";
import { getNewsfeed } from "@/services/commom.service";
import { formatTimeAgo } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";

export type NewsfeedPost = {
    _id: string;
    image: string;
    userId: {
        username: string;
    };
    createdAt: string;
    isLiked: boolean;
    isSaved: boolean;
    likes: number;
};

function NewFeed() {
    const { data } = useQuery({
        queryKey: ["newsfeed"],
        queryFn: async () => getNewsfeed("10", "0"),
    });

    function toPostCardView(post: NewsfeedPost): PostCardProps {
        return {
            id: post._id,
            avatar: post.image,
            img: post.image ? CONFIG.BASE_URL + post.image : "",
            username: post.userId.username,
            creatAt: formatTimeAgo(post.createdAt),
            isLiked: post.isLiked,
            isSaved: post.isSaved,
            likes: post.likes,
        };
    }
    return (
        <MainLayout>
            <div className="m-auto w-240 flex relative justify-between">
                <div className="m-auto w-120 flex flex-col ">
                    {data?.data?.posts?.map((post: NewsfeedPost) => {
                        return (
                            <PostCard
                                key={post?._id}
                                {...toPostCardView(post)}
                            />
                        );
                    })}
                </div>
                <div className="w-90">
                    <div className="sticky w-90 top-8">
                        <Suggestions />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default NewFeed;
