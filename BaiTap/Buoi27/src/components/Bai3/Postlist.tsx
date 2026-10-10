import type { Post, User } from "./User";

type PostProp = { postList: Post[]; user: User };

export const Postlist = ({ postList, user }: PostProp) => {
    console.log(postList);
    return (
        <div>
            {user && <h2>{user.username}'post:</h2>}
            <div className="grid grid-flow-col grid-rows-4 gap-4 border-solid border-2 rounded-2xl p-3 mt-4">
                {postList.map((post) => {
                    return (
                        <div
                            className="p-3 border-solid border-2 rounded-2xl flex flex-col justify-between"
                            key={post.id}
                        >
                            <p className="mb-4 text-xl font-semibold text-white text-start">
                                Title : {post.title}
                            </p>
                            <p className="text-start">{post.body}</p>
                        </div>
                    );
                })}
            </div>{" "}
        </div>
    );
};
