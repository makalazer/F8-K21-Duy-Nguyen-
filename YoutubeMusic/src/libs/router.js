import Navigo from "navigo";

import * as loginPage from "../pages/login/login";
import * as homePage from "../pages/home/home";

export const router = new Navigo("/");

router.on("/", homePage.init);

router.on("/login", loginPage.init);
