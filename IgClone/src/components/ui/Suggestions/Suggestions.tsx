import { Link } from "react-router-dom";
import SuggestionItem from "./SuggestionItem";
import { useQuery } from "@tanstack/react-query";
import { getSuggestionUser } from "@/services/commom.service";
import { CONFIG } from "@/config";
// const mockItems = [
//     {
//         _id: "696757b40f8a1b525a556637",
//         username: "Thanhdora",
//         fullName: "Lê Thanh Đạt",
//         profilePicture: "/uploads/profilePicture-1769431565683-551113807.jpeg",
//         postsCount: 6,
//         followersCount: 20,
//         followingCount: 18,
//         recentImages: [
//             "/uploads/posts/file-1769431764250-707524516.jpeg",
//             "/uploads/posts/file-1769241513230-5164248.mp4",
//             "/uploads/posts/file-1769237850130-155817808.mp4",
//         ],
//         isFollowing: false,
//     },
//     {
//         _id: "6967b7cc0f8a1b525a5568ce",
//         username: "namphanhai2703",
//         fullName: "valkyrie27",
//         profilePicture: "/uploads/profilePicture-1769170181267-436625057.jpg",
//         postsCount: 2,
//         followersCount: 15,
//         followingCount: 0,
//         recentImages: [
//             "/uploads/posts/file-1769180660535-873269507.jpg",
//             "/uploads/posts/file-1768490103944-935871226.jpg",
//         ],
//         isFollowing: false,
//     },
//     {
//         _id: "6967b6120f8a1b525a5568ca",
//         username: "nam270303",
//         fullName: "phanhainam",
//         profilePicture: "src/assets/instagram-logo-facebook-2-svgrepo-com.svg",
//         postsCount: 0,
//         followersCount: 14,
//         followingCount: 0,
//         recentImages: [],
//         isFollowing: false,
//     },
//     {
//         _id: "6967ba520f8a1b525a5568d4",
//         username: "khanh1",
//         fullName: "khanh1",
//         profilePicture: "src/assets/instagram-logo-facebook-2-svgrepo-com.svg",
//         postsCount: 0,
//         followersCount: 9,
//         followingCount: 0,
//         recentImages: [],
//         isFollowing: false,
//     },
//     {
//         _id: "6967bb1b0f8a1b525a5568da",
//         username: "khanh2",
//         fullName: "khanh2",
//         profilePicture: "src/assets/instagram-logo-facebook-2-svgrepo-com.svg",
//         postsCount: 0,
//         followersCount: 9,
//         followingCount: 0,
//         recentImages: [],
//         isFollowing: false,
//     },
// ];

type SuggestionsUser = {
    profilePicture: string | null;
    username: string;
    userId: string;
    isFollowing: boolean;
    _id: string;
};

function Suggestions() {
    const { data } = useQuery({
        queryKey: ["suggestions"],
        queryFn: async () => getSuggestionUser("10"),
    });
    console.log(data);
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="">
                <Link to={""} className="flex gap-3">
                    <img
                        src="src/assets/instagram-logo-facebook-2-svgrepo-com.svg"
                        className="w-10"
                    />
                    <div className="flex flex-col">
                        <p>Username</p>
                        <p>name</p>
                    </div>
                </Link>
            </div>
            <div className="flex justify-between">
                <p>Gợi ý cho bạn</p>
                <Link to={""}>Xem tất cả</Link>
            </div>
            <div className="flex flex-col gap-4">
                {data?.data?.map((item: SuggestionsUser) => {
                    return (
                        <SuggestionItem
                            key={item._id}
                            profilePicture={
                                item.profilePicture
                                    ? CONFIG.BASE_URL + item.profilePicture
                                    : ""
                            }
                            userId={item._id}
                            username={item.username}
                            isFollowing={item.isFollowing}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Suggestions;
