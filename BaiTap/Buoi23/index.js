import { clearToken, getAccessToken } from "./util.js";
import CONFIG from "./config.js";

const init = async () => {
    const loginBtn = document.querySelector("#login_btn");
    const logoutBtn = document.querySelector("#logout_btn");
    const postListEl = document.querySelector("#posts_list");
    const postEl = document.querySelector("#posts");

    const handleLoginBtn = () => {
        window.location.href = "./login";
    };

    const getCurrentUser = async () => {
        try {
            const accessToken = getAccessToken();
            console.log(accessToken);
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

    if (currentUser) {
        //Hide login btn
        loginBtn.classList.add("hidden");

        //get Posts
        const postsResponse = await getPostByUserId(currentUser.id);
        const posts = await postsResponse.json();
        const postsList = posts?.posts;
        console.log(postsList);
        console.log(postsList.length);
        if (postsList && postsList.length > 0) {
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
                );
                article.innerHTML = `               
                        <h3 class="mt-4 text-xl font-bold">${post.title}</h3>
                        <p class="mt-3 text-slate-400">${post.body}</p>
                        <div class="mt-8 flex justify-center gap-4">
                            <button  class="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300 w-24 post_edit">Edit</button>
                            <button  class="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300 w-24 post_delete">Delete</button>
                        </div>
                    `;

                // postListEl.insertAdjacentHTML("beforeend", article);
                postListEl.appendChild(article);
            });
            postEl.classList.remove("hidden");
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
};

document.addEventListener("DOMContentLoaded", init);
