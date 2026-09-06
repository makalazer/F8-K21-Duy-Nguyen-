import CONFIG from "../config.js";
import { saveToken } from "../util.js";
const init = () => {
    const loginForm = document.querySelector("#login_form");
    const signInBtn = document.querySelector("#signin_btn");
    const usernameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");

    const sendLoginRequest = async (data) => {
        try {
            const response = await fetch(`${CONFIG?.BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ expiresInMins: 300, ...data }),
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = usernameEl.value;
        const password = passwordEl.value;
        const response = await sendLoginRequest({ username, password });
        const token = await response.json();
        if (!token) {
            const erorrMsg = document.querySelector("#error-msg");
            erorrMsg.classList.remove("hidden");
        } else {
            saveToken(token);
            window.location.href = "../index.html";
        }
    };

    loginForm.addEventListener("submit", handleSubmit);
};

document.addEventListener("DOMContentLoaded", init);
