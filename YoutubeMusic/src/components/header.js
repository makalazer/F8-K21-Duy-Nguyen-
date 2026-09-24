import { deleteLogout, getUserInfo } from "../services/auth";
import { deleteToken } from "../utils/utils";

const renderHeader = async () => {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    let userInfo = null;
    if (isLoggedIn) {
        try {
            userInfo = await getUserInfo();
        } catch (error) {
            console.dir("fail to get user infomation", error);
        }
    }
    const getHeaderRightHTML = () => {
        const loginBtn = `<a href="/login" class="rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Đăng nhập</a>`;
        const userIcon = `
        <div id="navbar-user">
        <div class="relative group select-none">
          <button id="user-btn" class="w-10 capitalize h-10 flex items-center justify-center bg-white/20 rounded-full text-white font-semibold cursor-pointer hover:bg-white/30 transition">
            ${userInfo?.name[0] || ""}
          </button>

          <div id="dropdown-user" class="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden bg-[#1f1f1f] shadow-lg border border-white/10 opacity-0 pointer-events-none translate-y-2 transition-all duration-150 z-50">
            <a href="/update-user-info" data-navigo="" class="block px-4 py-3 text-sm hover:bg-white/10 transition">
              Thông tin người dùng
            </a>

            <a href="/change-password" data-navigo="" class="block px-4 py-3 text-sm hover:bg-white/10 transition">
              Đổi mật khẩu
            </a>

            <a href="#" id="logout_btn" class="block px-4 py-3 text-sm text-red-700 hover:bg-white/10 transition">
              Đăng xuất
            </a>
          </div>
        </div>
        </div>
        `;
        return `
          <nav class="ml-auto flex items-center gap-3" aria-label="Điều hướng tài khoản">
            <button class="rounded-full p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white" aria-label="Cài đặt">⚙</button>
            <button class="rounded-full p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white" aria-label="Tải lên">↥</button>
            ${isLoggedIn ? userIcon : loginBtn}
          </nav>
            `;
    };

    const headerHTML = `
      <header id="header" class="flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-950 px-12 text-white">
        <a href="/" data-navigo class="flex shrink-0 items-center gap-2">
          <span class="ml-12 flex h-9 w-9 items-center justify-center rounded-full bg-red-600">
            <svg class="ml-0.5 h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.1C17.63 4.5 12 4.5 12 4.5s-5.63 0-7.48.59a2.98 2.98 0 0 0-2.1 2.1C1.83 9.04 1.83 12 1.83 12s0 2.96.59 4.81a2.98 2.98 0 0 0 2.1 2.1c1.85.59 7.48.59 7.48.59s5.63 0 7.48-.59a2.98 2.98 0 0 0 2.1-2.1c.59-1.85.59-4.81.59-4.81s0-2.96-.59-4.81ZM10 15.5v-7l6 3.5-6 3.5Z"/>
            </svg>
          </span>
          <span class="text-lg font-semibold tracking-tight">YouTube Music</span>
        </a>

        <label class="hidden max-w-xl flex-1 items-center gap-3 rounded-md bg-zinc-800 px-4 py-2.5 text-zinc-400 md:flex">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"/>
          </svg>
          <input type="search" placeholder="Tìm kiếm" class="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-400" />
        </label>

        ${getHeaderRightHTML()}
      </header>
    `;

    const app = document.querySelector("#app");

    const oldHeader = document.querySelector("#header");
    if (oldHeader) oldHeader.remove();

    app.insertAdjacentHTML("afterbegin", headerHTML);

    const dropdownUser = document.querySelector("#dropdown-user");
    const showDropdown = () => {
        dropdownUser.classList.remove(
            "opacity-0",
            "pointer-events-none",
            "translate-y-2",
        );
        dropdownUser.classList.add(
            "opacity-100",
            "pointer-events-auto",
            "translate-y-0",
        );
    };

    const hideDropdown = () => {
        dropdownUser.classList.remove(
            "opacity-100",
            "pointer-events-auto",
            "translate-y-0",
        );
        dropdownUser.classList.add(
            "opacity-0",
            "pointer-events-none",
            "translate-y-2",
        );
    };
    if (isLoggedIn) {
        const userButton = document.querySelector("#user-btn");
        userButton.addEventListener("click", (e) => {
            e.stopPropagation();
            showDropdown();
        });
        document.addEventListener("click", () => {
            hideDropdown();
        });

        const logout = async () => {
            const logoutRequest = await deleteLogout();
            if (logoutRequest) {
                deleteToken();
                window.location.href = "/";
            } else {
                throw new Error("Logout failed");
            }
        };
        const logOutBtn = document.querySelector("#logout_btn");
        logOutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            await logout();
        });
    }
};

const initHeader = () => {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarClose = document.getElementById("sidebar-close");
    function toggleSidebar(open) {
        sidebar.classList.toggle("-translate-x-full", !open);
    }
    menuToggle.addEventListener("click", () => toggleSidebar(true));
    sidebarClose.addEventListener("click", () => toggleSidebar(false));
};

export { renderHeader, initHeader };
