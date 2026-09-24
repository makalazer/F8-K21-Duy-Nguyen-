import Navigo from "navigo";

import * as loginPage from "../pages/login/login";
import * as registerPage from "../pages/register/register";
import * as homePage from "../pages/home/home";
import * as album from "../pages/album/album";
import * as updateUserInfoPage from "../pages/updateUserInfo/updateUserInfo";
import * as changePasswordPage from "../pages/changePassword/changePassword";

export const router = new Navigo("/");

router.on("/", homePage.init);

router.on("/login", loginPage.init);

router.on("/register", registerPage.init);

router.on("/change-password", changePasswordPage.init);

router.on("/update-user-info", updateUserInfoPage.init);

router.on("/moods/:mood", ({ data, params, queryString }) => {
    console.log(data); // { id: 'xxx', action: 'save' }
    console.log(params); // { m: "n", k: "z" }
    console.log(queryString); // "m=n&k=z"
});

router.on("/playlists/details/:album", ({ data, params, queryString }) => {
    album.init({ data, params, queryString });
});

router.notFound(() => {
    document.querySelector("#app").innerHTML =
        `<h1 class="text-7xl align-text-center">404 Page Not Found!</h1>`;
});
