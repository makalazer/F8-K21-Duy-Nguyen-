const BASE_URL = "https://dummyjson.com/auth";
const modal = document.getElementById("modal");
const openModal = (title) => {
    document.getElementById("modalTitle").textContent = title;
    modal.classList.replace("hidden", "flex");
};
document.getElementById("loginButton").onclick = () =>
    openModal("Welcome back");
document.getElementById("signupButton").onclick = () =>
    openModal("Create your account");
document.getElementById("heroSignup").onclick = () =>
    openModal("Create your account");
document.getElementById("closeButton").onclick = () =>
    modal.classList.replace("flex", "hidden");
// document.getElementById("continueButton").onclick = () => {
//     modal.classList.replace("flex", "hidden");
//     document.getElementById("posts").classList.remove("hidden");
//     document.getElementById("posts").scrollIntoView({ behavior: "smooth" });
// };

const continueButton = document.querySelector("#continueButton");
const loginForm = document.querySelector("#login_form");

const saveToken = async (token) => {
    localStorage.setItem("accessToken", token?.accessToken);
    localStorage.setItem("refreshToken", token?.refreshToken);
};

const wrrapperFetch = async (data, url) => {
    try {
        const response = await fetch(url, data);
        if (!response.ok) {
            throw new Error("404 not found");
        } else return response;
    } catch (error) {
        console.log(error);
    }
};

const handleSubmit = (e) => {
    e.prevenDefault();
    console.log("OK");
};

loginForm.addEventListener("submit", handleSubmit);
