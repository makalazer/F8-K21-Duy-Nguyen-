/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useState } from "react";
import { UserList } from "./UserList";
import { Postlist } from "./Postlist";

const USER_URL = "https://jsonplaceholder.typicode.com/users";
// const WRONG_URL = "https://jsonplaceholder.typicode.com/user";
export interface User {
    id: string;
    username: string;
    email: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    phone: string;
}
export interface Post {
    userId: string;
    id: string;
    title: string;
    body: string;
}
export default function User() {
    const debounceID = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [userList, setUserList] = useState<User[]>([]);
    const [allUser, setAllUser] = useState<User[]>([]);
    const [postList, setPostList] = useState<Post[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorUser, setErrorUser] = useState<string | null>(null);
    const [errorPost, setErrorPost] = useState<string | null>(null);
    const [inputName, setInputName] = useState<string>("");
    const renderCountRef = useRef(0);
    renderCountRef.current = renderCountRef.current + 1;

    const debounce = (fn: () => void, delay: number) => {
        if (debounceID.current) {
            clearTimeout(debounceID.current);
        }
        debounceID.current = setTimeout(() => fn(), delay);
    };
    const handleSearch = (name: string) => {
        setIsLoading(true);
        
        //Simulator delay
        setTimeout(() => {
            setUserList(
                allUser.filter((user) =>
                    user.username.toLowerCase().includes(name.toLowerCase()),
                ),
            );
            setIsLoading(false);
        }, 1000);
    };

    const hanldeOnclickUser = async (user: User) => {
        try {
            const res = await fetch(USER_URL + `/${user.id}/posts`);
            if (!res.ok) throw new Error("Fetch failed");
            const postList = await res.json();
            setPostList(postList);
            setCurrentUser(user);
        } catch (err) {
            console.dir(err);
            setErrorPost("Không tải được dữ liệu");
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
        const controller = new AbortController();
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                //Simulator delay
                await new Promise((resolve) => setTimeout(resolve, 1500));
                const res = await fetch(USER_URL);
                if (!res.ok) throw new Error("Fetch failed");
                const listUser = await res.json();
                setAllUser(listUser);
                setUserList(listUser);
            } catch (err) {
                console.dir(err);
                setErrorUser("Không tải được dữ liệu");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
        return () => {
            controller.abort();
        };
    }, []);
    return (
        <div className="m-auto mt-8">
            <h1>User</h1>
            <p>Số lần render: {renderCountRef.current}</p>
            <input
                placeholder="Input name"
                ref={inputRef}
                type="text"
                name="user"
                id="user"
                className="border rounded-md p-1 pl-3 mb-4"
                value={inputName}
                onChange={(e) => {
                    setInputName(e.target.value);
                    debounce(() => {
                        handleSearch(e.target.value);
                    }, 500);
                }}
            />

            {errorUser ? (
                <p className="text-red-500">{errorUser}</p>
            ) : (
                <UserList
                    isLoading={isLoading}
                    userList={userList}
                    hanldeOnclickUser={hanldeOnclickUser}
                />
            )}
            {errorPost && <p className="text-red-500">{errorUser}</p>}
            {currentUser && <Postlist postList={postList} user={currentUser} />}
        </div>
    );
}
