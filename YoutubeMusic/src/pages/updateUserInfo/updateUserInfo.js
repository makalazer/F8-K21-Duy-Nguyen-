import { renderHeader } from "../../components/header";

const init = () => {
    const app = document.querySelector("#app");
    app.innerHTML = "";
    const body = document.querySelector("body");
    body.className = "min-h-screen bg-[#0f0f0f] text-white";
    renderHeader();
    const renderUpdateUserForm = () => {
        const div = document.createElement("div");
        div.className =
            "flex min-h-screen items-center justify-center px-6 py-10";
        div.innerHTML = `         
            <section id="register-form" class=" w-full max-w-md rounded-2xl border border-zinc-800 bg-[#181818] p-8 shadow-2xl">
                  <div class="mb-8 text-center">
                        <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-2xl">♪</div>
                        <h1 class="text-3xl font-bold">Cập Nhật thông tin</h1>
                  </div>

                  <form class="space-y-5">
                        <div>
                              <label for="register-name" class="mb-2 block text-sm font-medium text-zinc-300">Họ và tên</label>
                              <input id="register-name" type="text" placeholder="Nguyễn Văn A" required class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                        </div>
                        <div>
                              <label for="register-email" class="mb-2 block text-sm font-medium text-zinc-300">Email</label>
                              <input id="register-email" type="email" placeholder="you@example.com" required class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                        </div>
                        <div>
                              <label for="register-password" class="mb-2 block text-sm font-medium text-zinc-300">Mật khẩu</label>
                              <input id="register-password" type="password" placeholder="Tạo mật khẩu" required minlength="6" class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                        </div>
                        <div>
                              <label for="confirm-password" class="mb-2 block text-sm font-medium text-zinc-300">Xác nhận mật khẩu</label>
                              <input id="confirm-password" type="password" placeholder="Nhập lại mật khẩu" required minlength="6" class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                        </div>
                        <button type="submit" class="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">Đăng ký</button>
                  </form>
            </section>
      `;
        app.append(div);
    };
    renderUpdateUserForm();
};
export { init };
