import { Bookmark, Grid3x3, SquarePlay } from "lucide-react";
import { Button } from "../button";
import useProfileAction from "./hooks/useProfileAction";
import { cn } from "cn";
import useUser from "@/components/hooks/useUser";
import useUserProfile from "@/components/hooks/useUserProfile";
import useUserPosts from "@/components/hooks/useUserPosts";
import { useParams } from "react-router-dom";

function Profile() {
    const { id } = useParams<{ id: string }>();
    const { currentTag, setCurrentTag } = useProfileAction();
    const { currentUser } = useUser();
    const isCurrentUserProfile = currentUser._id === id;
    const {
        profilePicture,
        username,
        fullName,
        followersCount,
        followingCount,
    } = useUserProfile(id ?? "");
    const { posts, totalPosts } = useUserPosts(id ?? "");
    console.log(posts);
    console.log(isCurrentUserProfile);
    return (
        <div className="w-full mt-20">
            <div className="flex flex-col gap-6">
                <div className="flex gap-6">
                    {profilePicture ? (
                        <img
                            src={profilePicture}
                            className="w-30 rounded-full aspect-square"
                        />
                    ) : (
                        <div className="bg-amber-100 w-30  aspect-square capitalize rounded-full text-gray-700 flex items-center">
                            <p className="mx-auto text-4xl font-semibold">
                                {username[0]}
                            </p>
                        </div>
                    )}
                    {/* <img
                        src={profilePicture}
                        alt=""
                        className="w-30 rounded-full p-4"
                    /> */}
                    <div className="flex-1 flex flex-col justify-between">
                        <h3 className="text-2xl font-black ">{username}</h3>
                        <h2 className="text-xl">{fullName}</h2>
                        <div className="flex gap-3 font-light ">
                            <span className="">
                                <span className="font-bold">{totalPosts}</span>{" "}
                                bài viết
                            </span>
                            <span>
                                <span className="font-bold">
                                    {followersCount}
                                </span>{" "}
                                người theo dõi
                            </span>
                            <span>
                                <span className="font-bold">
                                    {followingCount}
                                </span>{" "}
                                Đang theo dõi
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-3 justify-between">
                    {isCurrentUserProfile ? (
                        <>
                            {" "}
                            <Button
                                className={
                                    "flex-1 bg-[#25292e] text-white py-5"
                                }
                            >
                                Chỉnh sửa trang cá nhân
                            </Button>
                            <Button
                                className={
                                    "flex-1 bg-[#25292e] text-white py-5"
                                }
                            >
                                Xem kho lưu trữ
                            </Button>
                        </>
                    ) : (
                        <Button
                            className={"flex-1 bg-[#25292e] text-white py-5"}
                        >
                            Theo dõi
                        </Button>
                    )}
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
