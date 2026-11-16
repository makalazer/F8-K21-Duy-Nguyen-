import usePostAction from "@/components/ui/PostCard/hooks/usePostAction";
import PostCard from "@/components/ui/PostCard/PostCard";
import Suggestions from "@/components/ui/Suggestions/Suggestions";
import MainLayout from "@/layouts/MainLayout";
import { cn } from "cn";
import { CircleX } from "lucide-react";

export type NewsfeedPost = {
    _id: string;
    image: string;
    userId: {
        username: string;
        _id: string;
    };
    createdAt: string;
    isLiked: boolean;
    isSaved: boolean;
    likes: number;
    mediaType?: string;
    video?: string;
    caption: string;
    avatar?: string;
};

function NewFeed() {
    const { posts, toPostCardView, isNewsfeedPending, isNewsfeedError } =
        usePostAction();

    return (
        <MainLayout>
            <div className="m-auto w-240 flex relative justify-between">
                <div
                    className={cn(
                        "transition-all duration-800 ease-out transform m-auto w-120 flex flex-col ",
                        isNewsfeedPending
                            ? "opacity-0 translate-y-8"
                            : "opacity-100 translate-y-0",
                    )}
                >
                    {isNewsfeedError ? (
                        <CircleX size={180} className="w-full mt-30" />
                    ) : (
                        posts.map((post: NewsfeedPost) => {
                            return (
                                <PostCard
                                    key={post?._id}
                                    {...toPostCardView(post)}
                                />
                            );
                        })
                    )}
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
