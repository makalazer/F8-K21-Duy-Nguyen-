import { Bookmark, Grid3x3, SquarePlay } from "lucide-react";
import { Button } from "../button";
import useProfileAction from "./hooks/useProfileAction";
import { cn } from "cn";
import useUser from "@/components/hooks/useUser";
import useUserProfile from "@/components/hooks/useUserProfile";
import useUserPosts from "@/components/hooks/useUserPosts";

function Profile() {
    //     const { posts } = {
    //         posts: 10,
    //     };
    const { currentTag, setCurrentTag } = useProfileAction();
    const { user } = useUser();
    const { profilePicture, _id: userId } = user;
    const { profile } = useUserProfile(userId);
    //
    const { posts, totalPosts } = useUserPosts(userId);
    console.log(posts);

    return (
        <div className="w-full mt-20">
            <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                    <img
                        src={
                            profilePicture
                                ? ""
                                : "src/assets/instagram-logo-facebook-2-svgrepo-com.svg"
                        }
                        alt=""
                        className="w-30 rounded-full p-4"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                        <h3 className="text-2xl font-black ">
                            {user?.username ?? ""}
                        </h3>
                        <h2 className="text-xl">{user?.fullName ?? ""}</h2>
                        <div className="flex gap-3 font-light ">
                            <span className="">
                                <span className="font-bold">{totalPosts}</span>{" "}
                                bài viết
                            </span>
                            <span>
                                <span className="font-bold">
                                    {profile?.followersCount ?? 0}
                                </span>{" "}
                                người theo dõi
                            </span>
                            <span>
                                <span className="font-bold">
                                    {profile?.followingCount ?? 0}
                                </span>{" "}
                                Đang theo dõi
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-3 justify-between">
                    <Button className={"flex-1 bg-[#25292e] text-white py-5"}>
                        Chỉnh sửa trang cá nhân
                    </Button>
                    <Button className={"flex-1 bg-[#25292e] text-white py-5"}>
                        Xem kho lưu trữ
                    </Button>
                </div>
                <div className="flex h-30 w-full gap-30 justify-center pt-4 border-b-white border-b items-center">
                    <Grid3x3
                        strokeWidth={currentTag === "post" ? 2 : 1}
                        className={cn(
                            "hover:opacity-80 h-full w-24 px-8",
                            currentTag === "post" && "border-b-3 border-white ",
                        )}
                        onClick={() => {
                            setCurrentTag("post");
                        }}
                    />
                    <Bookmark
                        strokeWidth={currentTag === "saved" ? 2 : 1}
                        className={cn(
                            "hover:opacity-80 h-full w-24 px-8",
                            currentTag === "saved" &&
                                "border-b-3 border-white ",
                        )}
                        onClick={() => {
                            setCurrentTag("saved");
                        }}
                    />
                    <SquarePlay
                        strokeWidth={currentTag === "video" ? 2 : 1}
                        className={cn(
                            "hover:opacity-80 h-full w-24 px-8",
                            currentTag === "video" &&
                                "border-b-3 border-white ",
                        )}
                        onClick={() => {
                            setCurrentTag("video");
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;
