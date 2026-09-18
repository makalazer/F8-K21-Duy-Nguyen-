const getSidebarHTML = () => {
    return `
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
      </aside>
      <aside id="sidebar"
            class="fixed inset-y-0 left-0 z-10 w-16 border-zinc-800 bg-zinc-950 p-2 text-white "
            aria-hidden="true">
                  <button id="menu-toggle" class=" cursor-pointer rounded-md p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  aria-label="Mở menu" aria-controls="sidebar" aria-expanded="false">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  </button>
            <nav class="mt-8 space-y-2" aria-label="Menu chính">
                  <a href="/" class="block rounded-md px-3 py-2 hover:bg-zinc-800"><i class="fa-regular fa-house"></i></a>
                  <a href="/" class="block rounded-md px-3 py-2 hover:bg-zinc-800"><i class="fa-regular fa-compass"></i></a>
                  <a href="/" class="block rounded-md px-3 py-2 hover:bg-zinc-800"><i class="fa-solid fa-heart"></i></a>
            </nav>
      </aside>
      `;
};

export { getSidebarHTML };
