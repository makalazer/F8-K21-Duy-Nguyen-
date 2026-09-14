const init = () => {
    console.log("test");
    const app = document.querySelector("#app");
    app.innerHTML = "";
    let toggleFormFlag = true;
    const body = document.querySelector("body");
    body.className = "min-h-screen bg-[#0f0f0f] text-white";
    const renderLogin = () => {
        const div = document.createElement("div");
        div.className =
            "flex min-h-screen items-center justify-center px-6 py-10";
        div.innerHTML = `
            <section id="login-form" class="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#181818] p-8 shadow-2xl">
                  <div class="mb-8 text-center">
                        <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-2xl">♪</div>
                        <h1 class="text-3xl font-bold">Chào mừng trở lại</h1>
                        <p class="mt-2 text-sm text-zinc-400">Đăng nhập để tiếp tục thưởng thức âm nhạc</p>
                  </div>

                  <form class="space-y-5">
                        <div>
                              <label for="email" class="mb-2 block text-sm font-medium text-zinc-300">Email hoặc số điện thoại</label>
                              <input id="email" type="email" placeholder="you@example.com" required class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                        </div>
                        <div>
                              <div class="mb-2 flex justify-between">
                                    <label for="password" class="text-sm font-medium text-zinc-300">Mật khẩu</label>
                                    <a href="#" class="text-xs text-red-400 hover:text-red-300">Quên mật khẩu?</a>
                              </div>
                              <input id="password" type="password" placeholder="Nhập mật khẩu" required class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                        </div>
                        <button type="submit" class="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">Đăng nhập</button>
                  </form>

                  <div class="my-7 flex items-center gap-3 text-xs text-zinc-500"><span class="h-px flex-1 bg-zinc-800"></span>HOẶC<span class="h-px flex-1 bg-zinc-800"></span></div>
                  <button type="button" class="w-full rounded-lg border border-zinc-700 px-4 py-3 text-sm font-medium transition hover:bg-zinc-800">Tiếp tục với Google</button>
                  <p class="mt-7 text-center text-sm text-zinc-400">Chưa có tài khoản? <button type="button" data-show-register class="font-semibold text-red-400 hover:text-red-300">Đăng ký ngay</button></p>
            </section>

            <section id="register-form" class="hidden w-full max-w-md rounded-2xl border border-zinc-800 bg-[#181818] p-8 shadow-2xl">
                  <div class="mb-8 text-center">
                        <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-2xl">♪</div>
                        <h1 class="text-3xl font-bold">Tạo tài khoản</h1>
                        <p class="mt-2 text-sm text-zinc-400">Đăng ký để bắt đầu thưởng thức âm nhạc</p>
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
                  <p class="mt-7 text-center text-sm text-zinc-400">Đã có tài khoản? <button type="button" data-show-login class="font-semibold text-red-400 hover:text-red-300">Đăng nhập</button></p>
            </section>
      `;
        app.append(div);
    };
    renderLogin();
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    function toggleForm() {
        toggleFormFlag = !toggleFormFlag;
        loginForm.classList.toggle("hidden", !toggleFormFlag);
        registerForm.classList.toggle("hidden", toggleFormFlag);
    }
    const registerBtn = document.querySelector("[data-show-register]");
    const loginBtn = document.querySelector("[data-show-login]");
    registerBtn.addEventListener("click", toggleForm);
    loginBtn.addEventListener("click", toggleForm);
};

export { init };
