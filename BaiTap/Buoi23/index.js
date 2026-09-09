import { clearToken, getAccessToken } from "./util.js";
import CONFIG from "./config.js";

const init = async () => {
    const loginBtn = document.querySelector("#login_btn");
    const logoutBtn = document.querySelector("#logout_btn");
    const postListEl = document.querySelector("#posts_list");
    const addPostBtn = document.querySelector("#add_post_btn");
    const postEl = document.querySelector("#posts");
    let postsList = [];

    function deletePost(id) {
        postsList = postsList.filter((post) => post.id !== id);
        renderPostsList();
    }

    function editPost(postData) {
        const { id, body, title } = postData;
        const post = postsList.find((post) => post.id === id);
        if (post) {
            post.body = body;
            post.title = title;
            renderPostsList();
        }
    }

    const addPost = async (postData) => {
        const addPostReposnse = await sendAddpost(postData);
        const newPost = await addPostReposnse.json();
        postsList.push(newPost);
        renderPostsList();
    };

    function handleModal(postData) {
        const { id, title, body, isEdit } = postData;
        const modalEl = document.querySelector("#edit_post_modal");
        modalEl.classList.remove("hidden");

        const saveBtn = document.querySelector("#save_btn");
        const inputTitileEl = document.querySelector("#edit_title");
        const inputBodyEl = document.querySelector("#edit_body");
        const cancelBtn = document.querySelector("#cancel_btn");
        const modalTitleEl = document.querySelector("#modal_title");

        modalTitleEl.innerText = isEdit ? "Edit post" : "Add post";
        inputTitileEl.value = title;
        inputBodyEl.value = body;

        cancelBtn.addEventListener("click", () => {
            inputTitileEl.value = "";
            inputBodyEl.value = "";
            modalEl.classList.add("hidden");
        });

        saveBtn.addEventListener("click", () => {
            const postData = {
                id: isEdit ? id : "",
                title: inputTitileEl.value,
                body: inputBodyEl.value,
                userId: currentUser ? currentUser.id : "",
            };
            if (isEdit) {
                editPost(postData);
            } else if (currentUser) {
                addPost(postData);
            }
            modalEl.classList.add("hidden");
            renderPostsList();
        });
    }

    function renderPostsList() {
        postListEl.innerHTML = "";

        postsList.forEach((post) => {
            const article = document.createElement("article");
            article.setAttribute("post_id", post.id);
            article.classList.add(
                "rounded-2xl",
                "border",
                "border-white/10",
                "bg-white/5",
                "p-6",
                "flex",
                "flex-col",
            );
            article.innerHTML = `               
                        <h3 class="mt-4 text-xl font-bold min-h-[56px]">${post.title}</h3>
                        <p class="mt-3 text-slate-400 text-pretty break-all grow">${post.body}</p>
                        <div class="mt-8 flex justify-center gap-4 ">
                            <button  class="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300 w-24 post_edit">Edit</button>
                            <button  class="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300 w-24 post_delete">Delete</button>
                        </div>
                    `;

            postListEl.appendChild(article);

            const editBtn = document.querySelector(
                `[post_id="${post.id}"] .post_edit`,
            );
            const deleteBtn = document.querySelector(
                `[post_id="${post.id}"] .post_delete`,
            );
            editBtn.addEventListener("click", () =>
                handleModal({
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    isEdit: true,
                }),
            );
            deleteBtn.addEventListener("click", () => deletePost(post.id));
        });
        postEl.classList.remove("hidden");
    }
    const handleLoginBtn = () => {
        window.location.href = "./login";
    };

    const sendAddpost = async (postData) => {
        const { title, body, userId } = postData;
        try {
            const accessToken = getAccessToken();
            const response = await fetch(`${CONFIG.BASE_URL}/posts/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Pass JWT via Authorization header
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: userId,
                }),
                credentials: "include", // Include cookies (e.g., accessToken) in the request
            });
            if (!response.ok) {
                throw new Error("404 not found");
                return false;
            } else return response;
        } catch (error) {
            console.dir(error);
        }
    };

    const getCurrentUser = async () => {
        try {
            const accessToken = getAccessToken();
            const response = await fetch(`${CONFIG.BASE_URL}/auth/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Pass JWT via Authorization header
                },
                credentials: "include", // Include cookies (e.g., accessToken) in the request
            });
            if (!response.ok) {
                throw new Error("404 not found");
                return false;
            } else return response;
        } catch (error) {
            console.dir(error);
        }
    };

    const getPostByUserId = async (id) => {
        try {
            const response = await fetch(
                `${CONFIG.BASE_URL}/posts/user/${id}`,
                {
                    method: "GET",
                    credentials: "include", // Include cookies (e.g., accessToken) in the request
                },
            );
            if (!response.ok) {
                throw new Error("404 not found");
                return false;
            } else return response;
        } catch (error) {
            console.dir(error);
        }
    };
    //check authorization
    const currentUserresponse = await getCurrentUser();
    let currentUser = false;
    if (currentUserresponse) {
        currentUser = await currentUserresponse.json();
    }

    //init postList
    if (currentUser) {
        //Hide login btn
        loginBtn.classList.add("hidden");
        logoutBtn.classList.remove("hidden");

        //get Posts
        const postsResponse = await getPostByUserId(currentUser.id);
        const posts = await postsResponse.json();
        postsList = posts?.posts;

        if (postsList && postsList.length > 0) {
            renderPostsList();
        }
    }

    const handleLogoutBtn = () => {
        clearToken();
        logoutBtn.classList.add("hidden");
        loginBtn.classList.remove("hidden");
        postEl.classList.add("hidden");
    };

    logoutBtn.addEventListener("click", handleLogoutBtn);
    loginBtn.addEventListener("click", handleLoginBtn);
    addPostBtn.addEventListener("click", () =>
        handleModal({
            title: "",
            body: "",
            isEdit: false,
        }),
    );
};

document.addEventListener("DOMContentLoaded", init);
