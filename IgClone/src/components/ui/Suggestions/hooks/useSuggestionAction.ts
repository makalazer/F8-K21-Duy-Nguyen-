import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SuggestionsUser } from "../Suggestions";
import { deleteUnfollowUser, postFollowUser } from "@/services/commom.service";

type SuggestionsCache = { data?: SuggestionsUser[] };
type Backup = [readonly unknown[], SuggestionsCache | undefined][];

const SUGGESTIONS_KEY = ["suggestions"];
const SUGGESTIONS_ACTION_KEY = ["suggestion-action"];

function useSuggestionAction() {
    const queryClient = useQueryClient();

    const backupSuggestion = async (): Promise<Backup> => {
        queryClient.cancelQueries({ queryKey: SUGGESTIONS_KEY });
        return queryClient.getQueriesData({ queryKey: SUGGESTIONS_KEY });
    };

    const restoreSuggestion = (backup: Backup) => {
        backup.forEach(([key, data]) => {
            queryClient.setQueryData(key, data);
        });
    };

    // const syncWithServer = () => {
    //     const isLastAction =
    //         queryClient.isMutating({ mutationKey: SUGGESTIONS_ACTION_KEY }) ===
    //         1;

    //     if (isLastAction) {
    //         queryClient.invalidateQueries({ queryKey: SUGGESTIONS_KEY });
    //     }
    // };

    const updateSuggestion = (
        userId: string,
        getChange: (user: SuggestionsUser) => Partial<SuggestionsUser>,
    ) => {
        queryClient.setQueriesData<SuggestionsCache>(
            { queryKey: SUGGESTIONS_KEY },
            (old) => {
                console.log(old);
                if (!old?.data) return old;
                return {
                    ...old,
                    data: old.data.map((user) =>
                        user._id === userId
                            ? { ...user, ...getChange(user) }
                            : user,
                    ),
                };
            },
        );
    };

    const followMutation = useMutation({
        mutationKey: SUGGESTIONS_ACTION_KEY,
        mutationFn: async ({
            userId,
            isFollowing,
        }: {
            userId: string;
            isFollowing: boolean;
        }) => {
            return isFollowing
                ? await deleteUnfollowUser(userId)
                : await postFollowUser(userId);
        },
        onMutate: async ({ userId }) => {
            const backup = await backupSuggestion();
            updateSuggestion(userId, (user) => ({
                isFollowing: !user.isFollowing,
            }));
            return { backup };
        },
        onError: (error, _variables, context) => {
            console.error("Error during follow/unfollow action:", error);
            if (context?.backup) {
                restoreSuggestion(context.backup);
            }
        },
        onSettled: () => {
            // syncWithServer();
        },
    });

    return {
        followUser: (userId: string, isFollowing: boolean) => {
            followMutation.mutate({ userId, isFollowing });
        },
    };
}

export default useSuggestionAction;
