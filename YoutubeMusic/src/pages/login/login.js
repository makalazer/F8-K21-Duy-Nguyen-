import { renderHeader } from "../../components/header";
import { postLogin } from "../../services/service";

const init = () => {
    const app = document.querySelector("#app");
    app.innerHTML = "";
    let toggleFormFlag = true;
    const body = document.querySelector("body");
    body.className = "min-h-screen bg-[#0f0f0f] text-white";
    renderHeader();
    const renderLogin = () => {
        const div = document.createElement("div");
        div.className =
            "flex min-h-screen items-center justify-center px-6 py-10";
        div.innerHTML = `
            <section id="login-form" class="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#181818] p-8 shadow-2xl">
                  <div class="mb-8 text-center">
                        <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-3xl">♪</div>
                        <h1 class="text-3xl font-bold">Chào mừng trở lại</h1>
                        <p class="mt-2 text-sm text-zinc-400">Đăng nhập để tiếp tục thưởng thức âm nhạc</p>
                  </div>

                  <form class="space-y-5" id="login-form">
                        <div>
                              <label for="login-email" class="mb-2 block text-sm font-medium text-zinc-300">Email</label>
                              <input id="login-email" type="email"  autocomplete="on" placeholder="you@example.com" required class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                        </div>
                        <div>
                              <div class="mb-2 flex justify-between">
                                    <label for="login-password" class="text-sm font-medium text-zinc-300">Mật khẩu</label>
                                    <a href="#" class="hidden text-xs text-red-400 hover:text-red-300">Quên mật khẩu?</a>
                              </div>
                              <input id="login-password" type="password" placeholder="Nhập mật khẩu" required class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                        </div>
                        <button type="submit" class="w-full mt-5 rounded-lg bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">Đăng nhập</button>
                  </form>                  
                  <p class="mt-7 text-center text-sm text-zinc-400">Chưa có tài khoản? <a href="/register" class="font-semibold text-red-400 hover:text-red-300">Đăng ký ngay</a></p>
            </section>
             <div id="login-toast" role="status" aria-live="polite"
            class="pointer-events-none fixed right-6 top-6 z-50 flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-600 px-5 py-4 text-sm font-medium text-white shadow-xl
            opacity-0 translate-x-8 transition-all duration-300 ease-out hidden">
                  <span class="text-lg">✓</span>
                  <span>Đăng nhập thành công!</span>
            </div>           
      `;
        app.append(div);
    };
    renderLogin();
    const loginSuccessToast = document.querySelector("#login-toast");

    const showLoginToast = () => {
        loginSuccessToast.classList.remove("hidden");
        loginSuccessToast.offsetHeight;
        loginSuccessToast.classList.remove("opacity-0", "translate-x-8");
        loginSuccessToast.classList.add("opacity-100", "translate-x-0");

        setTimeout(() => {
            loginSuccessToast.classList.remove("opacity-100", "translate-x-0");
            loginSuccessToast.classList.add("opacity-0", "translate-x-8");

            setTimeout(() => {
                loginSuccessToast.classList.add("hidden");
            }, 300);
        }, 1500);
    };
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;
        const loginResponse = await postLogin({ email, password });
        if (loginResponse) {
            showLoginToast();
            setTimeout(() => {
                window.location.href = "/";
            }, 2500);
        }
    });
};

export { init };
