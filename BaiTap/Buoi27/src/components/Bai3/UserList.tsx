import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { User } from "./User";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

type UserListProp = {
    userList: User[];
    hanldeOnclickUser: (user: User) => void;
    isLoading: boolean;
};
export const UserList = ({
    userList,
    hanldeOnclickUser,
    isLoading,
}: UserListProp) => {
    const activeCardId = useRef("");
    const activeCard = () => {
        if (activeCardId.current !== "") {
            const activeCard = document.getElementById(
                `${activeCardId.current}`,
            );
            activeCard?.classList.add("bg-sky-500/50", "text-black");
        }
    };
    const deactiveCard = () => {
        if (activeCardId.current !== "") {
            const activeCard = document.getElementById(
                `${activeCardId.current}`,
            );
            activeCard?.classList.remove("bg-sky-500/50", "text-black");
        }
    };
    useEffect(() => {
        activeCard();
    }, []);
    return (
        <div className="grid grid-flow-col grid-rows-4 gap-4 border-solid border-2 rounded-2xl p-3 mb-8  ">
            {isLoading ? (
                <div className="flex w-full justify-center ">
                    <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        size="xl"
                        style={{ fontSize: "80px" }}
                    />
                </div>
            ) : (
                userList.map((user) => {
                    return (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                hanldeOnclickUser(user);
                                deactiveCard();
                                activeCardId.current = user.id + "-usercard";
                            }}
                            key={user.id}
                            id={user.id + "-usercard"}
                            className="p-3 border-solid border-2 rounded-2xl cursor-pointer "
                        >
                            <p>Name : {user.username}</p>
                            <p>Copamny : {user.company.name}</p>
                            <p>Emai : {user.email}</p>
                            <p>phone : {user.phone}</p>
                        </div>
                    );
                })
            )}
        </div>
    );
};
