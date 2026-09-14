const getHeaderHTML = () => {
    return `<header class="flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-950 px-6 text-white">
    <button id="menu-toggle" class="rounded-md p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
      aria-label="Mở menu" aria-controls="sidebar" aria-expanded="false">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <a href="#" class="flex shrink-0 items-center gap-2" aria-label="YouTube Music">
      <span class="flex h-9 w-9 items-center justify-center rounded-full bg-red-600">
        <svg class="ml-0.5 h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.1C17.63 4.5 12 4.5 12 4.5s-5.63 0-7.48.59a2.98 2.98 0 0 0-2.1 2.1C1.83 9.04 1.83 12 1.83 12s0 2.96.59 4.81a2.98 2.98 0 0 0 2.1 2.1c1.85.59 7.48.59 7.48.59s5.63 0 7.48-.59a2.98 2.98 0 0 0 2.1-2.1c.59-1.85.59-4.81.59-4.81s0-2.96-.59-4.81ZM10 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
      </span>
      <span class="text-lg font-semibold tracking-tight">YouTube Music</span>
    </a>
    <label class="hidden max-w-xl flex-1 items-center gap-3 rounded-md bg-zinc-800 px-4 py-2.5 text-zinc-400 md:flex">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
      </svg>
      <input type="search" placeholder="Tìm kiếm"
        class="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-400" />
    </label>
    <nav class="ml-auto flex items-center gap-3" aria-label="Điều hướng tài khoản">
      <button class="rounded-full p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white" aria-label="Cài đặt">⚙</button>
      <button class="rounded-full p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white" aria-label="Tải lên">↥</button>
      <button header-login-button class="rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Đăng
        nhập</button>
    </nav>
  </header>

  <aside id="sidebar"
    class="fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r border-zinc-800 bg-zinc-950 p-6 text-white transition-transform"
    aria-hidden="true">
    <div class="mb-8 flex items-center justify-between">
      <h2 class="text-lg font-semibold">Menu</h2>
      <button id="sidebar-close" class="rounded-md p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        aria-label="Đóng menu">✕</button>
    </div>
    <nav class="space-y-2" aria-label="Menu chính">
      <a href="#" class="block rounded-md px-3 py-2 hover:bg-zinc-800">Trang chủ</a>
      <a href="#" class="block rounded-md px-3 py-2 hover:bg-zinc-800">Thư viện</a>
      <a href="#" class="block rounded-md px-3 py-2 hover:bg-zinc-800">Bài hát yêu thích</a>
    </nav>
  </aside>`;
};

const initHeader = () => {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarClose = document.getElementById("sidebar-close");
    const loginBtn = document.querySelector("[header-login-button]");
    function toggleSidebar(open) {
        sidebar.classList.toggle("-translate-x-full", !open);
    }
    loginBtn.addEventListener("click", () => {
        console.log("login");
        window.location.href = "./login";
    });
    menuToggle.addEventListener("click", () => toggleSidebar(true));
    sidebarClose.addEventListener("click", () => toggleSidebar(false));
};

export { getHeaderHTML, initHeader };
