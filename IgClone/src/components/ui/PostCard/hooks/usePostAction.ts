import { CONFIG } from "@/config";
import type { NewsfeedPost } from "@/page/NewFeed";
import {
    deleteUnlikePost,
    deleteUnsavePost,
    getNewsfeed,
    postLikePost,
    postSavePost,
} from "@/services/commom.service";
import { formatTimeAgo } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PostCardProps } from "../PostCard";

const NEWSFEED_KEY = ["newsfeed"];
const POST_ACTION_KEY = ["post-action"];
type NewsfeedCache = { data?: { posts?: NewsfeedPost[] } };
type Backup = [readonly unknown[], NewsfeedCache | undefined][];

function usePostAction() {
    const queryClient = useQueryClient();
    const backupNewsfeed = async (): Promise<Backup> => {
        await queryClient.cancelQueries({ queryKey: NEWSFEED_KEY });
        return queryClient.getQueriesData<NewsfeedCache>({
            queryKey: NEWSFEED_KEY,
        });
    };

    const restoreNewsfeed = (backup?: Backup) => {
        backup?.forEach(([key, data]) => queryClient.setQueryData(key, data));
    };

    // reFetch API and set data to cache
    const syncWithServer = () => {
        const isLastAction =
            queryClient.isMutating({ mutationKey: POST_ACTION_KEY }) === 1;

        if (isLastAction) {
            queryClient.invalidateQueries({ queryKey: NEWSFEED_KEY });
        }
    };

    const updatePost = (
        postId: string,
        getChanges: (post: NewsfeedPost) => Partial<NewsfeedPost>,
    ) => {
        queryClient.setQueriesData<NewsfeedCache>(
            { queryKey: NEWSFEED_KEY },
            (old) => {
                if (!old?.data?.posts) return old;

                return {
                    ...old,
                    data: {
                        ...old.data,
                        posts: old.data.posts.map((post) =>
                            post._id === postId
                                ? { ...post, ...getChanges(post) }
                                : post,
                        ),
                    },
                };
            },
        );
    };
    const likeMutation = useMutation({
        mutationKey: POST_ACTION_KEY,
        mutationFn: ({
            postId,
            isLiked,
        }: {
            postId: string;
            isLiked: boolean;
        }) => {
            return isLiked ? deleteUnlikePost(postId) : postLikePost(postId);
        },
        onMutate: async ({ postId, isLiked }) => {
            const backup = await backupNewsfeed();
            updatePost(postId, (post) => ({
                isLiked: !post.isLiked,
                likes: Math.max(0, Number(post.likes) + (isLiked ? -1 : 1)),
            }));
            return backup;
        },
        onError: (_error, _vars, backup) => {
            //TODO
            console.dir(_error);
            restoreNewsfeed(backup);
        },
        onSettled: syncWithServer,
    });

    const saveMutation = useMutation({
        mutationKey: POST_ACTION_KEY,
        mutationFn: ({
            postId,
            isSaved,
        }: {
            postId: string;
            isSaved: boolean;
        }) => {
            return isSaved ? deleteUnsavePost(postId) : postSavePost(postId);
        },
        onMutate: async ({ postId }) => {
            const backup = await backupNewsfeed();
            updatePost(postId, (post) => ({
                isSaved: !post.isSaved,
            }));
            return backup;
        },
        onError: (_error, _vars, backup) => {
            //TODO
            console.dir(_error);
            restoreNewsfeed(backup);
        },
        onSettled: syncWithServer,
    });

    const { data, isPending, isError } = useQuery({
        queryKey: ["newsfeed"],
        queryFn: async () => getNewsfeed("10", "0"),
    });

    function toPostCardView(post: NewsfeedPost): PostCardProps {
        return {
            userId: post.userId._id,
            id: post._id,
            avatar: post?.avatar ? CONFIG.BASE_URL + post.avatar : "",
            img: post.image ? CONFIG.BASE_URL + post.image : "",
            username: post.userId.username,
            creatAt: formatTimeAgo(post.createdAt),
            isLiked: post.isLiked,
            isSaved: post.isSaved,
            likes: post.likes,
            mediaType: post.mediaType === "video" ? "video" : "image",
            video: post.video ? CONFIG.BASE_URL + post.video : "",
            caption: post.caption,
        };
    }

    return {
        toggleLike: (postId: string, isLiked: boolean) =>
            likeMutation.mutate({ postId, isLiked }),
        toggleSave: (postId: string, isSaved: boolean) =>
            saveMutation.mutate({ postId, isSaved }),
        posts: data?.data?.posts ?? [],
        toPostCardView,
        isNewsfeedPending: isPending,
        isNewsfeedError: isError,
    };
}

export default usePostAction;
