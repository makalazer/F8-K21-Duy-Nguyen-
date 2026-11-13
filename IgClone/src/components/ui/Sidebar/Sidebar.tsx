import { Bookmark, LogOut, Menu } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { sidebarButton } from "@/utils/Constant";
import {
    Menubar,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "../menubar";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const mutationLogout = useMutation({
        mutationFn: postLogout,
        onError: (err) => {
            console.dir(err);
        },
        onSuccess: () => {
            navigate("/login");
        },
    });

    return (
        <aside className="h-screen fixed w-14 hover:w-56 transition-all duration-300 ease-in-out  bg-transparent overflow-hidden group flex flex-col justify-between  z-10  top-0 left-0 ">
            <img
                src="src/assets/instagram-logo-facebook-2-svgrepo-com.svg"
                alt=""
                className="w-14 p-2"
            />
            <nav className="w-full mx-2 flex flex-col gap-4">
                {sidebarButton.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <SidebarItem
                            key={`sidebaritem-${index}`}
                            label={item.label}
                            link={item.link}
                            icon={<Icon />}
                        />
                    );
                })}
            </nav>
            <Menubar className={"border-0 w-full p-0 pb-2"}>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Menu
                            size={40}
                            className="hover:bg-gray-800 w-14 py-2 rounded-xl"
                        />
                    </MenubarTrigger>
                    <MenubarContent className="w-48">
                        <MenubarGroup>
                            <MenubarItem className={"text-lg"}>
                                <Bookmark size={48} />
                                Bài viết đã lưu
                            </MenubarItem>
                            <MenubarItem
                                className={"text-lg text-red-500"}
                                onClick={() => {
                                    mutationLogout.mutate();
                                }}
                            >
                                <LogOut size={48} />
                                Đăng xuất
                            </MenubarItem>
                        </MenubarGroup>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </aside>
    );
}

export default Sidebar;
