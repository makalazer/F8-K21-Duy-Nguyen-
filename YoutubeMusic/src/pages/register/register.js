import { renderHeader } from "../../components/header";
import { postRegister } from "../../services/service";

const init = async () => {
    const app = document.querySelector("#app");
    app.innerHTML = "";
    const body = document.querySelector("body");
    body.className = "min-h-screen bg-[#0f0f0f] text-white";
    renderHeader();
    const renderRegister = () => {
        const div = document.createElement("div");
        div.className =
            "flex min-h-screen items-center justify-center px-6 py-10";
        div.innerHTML = `         
            <section id="register-form" class=" w-full max-w-md rounded-2xl border border-zinc-800 bg-[#181818] p-8 shadow-2xl">
                  <div class="mb-8 text-center">
                        <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-3xl ">♪</div>
                        <h1 class="text-3xl font-bold">Tạo tài khoản</h1>
                        <p class="mt-2 text-sm text-zinc-400">Đăng ký để bắt đầu thưởng thức âm nhạc</p>
                  </div>

                  <form class="space-y-5" id="registerForm">
                        <div id="field-register-name">
                              <label for="register-name" class="mb-2 block text-sm font-medium text-zinc-300">Họ và tên</label>
                              <input id="register-name" type="text" placeholder="Nguyễn Văn A" required class="w-full mb-2 rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                              <p class="text-red-500 capitalize error-msg hidden"></p>
                        </div>
                        <div id="field-register-email">
                              <label for="register-email" class="mb-2 block text-sm font-medium text-zinc-300">Email</label>
                              <input id="register-email" type="email" placeholder="you@example.com" required class="w-full mb-2 rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                              <p class="text-red-500 capitalize error-msg hidden"></p>

                        </div>
                        <div id="field-register-password">
                              <label for="register-password" class="mb-2 block text-sm font-medium text-zinc-300">Mật khẩu</label>
                              <input id="register-password" type="password" placeholder="Tạo mật khẩu" required minlength="6" class="w-full mb-2 rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                              <p class="text-red-500 capitalize error-msg hidden"></p>
                        </div>
                        <div id="field-register-confirm-password">
                              <label for="register-confirm-password" class="mb-2 block text-sm font-medium text-zinc-300">Xác nhận mật khẩu</label>
                              <input id="register-confirm-password" type="password" placeholder="Nhập lại mật khẩu" required minlength="6" class="w-full mb-2 rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                              <p class="text-red-500 capitalize error-msg hidden"></p>
                        </div>
                        <button type="submit" class="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">Đăng ký</button>
                  </form>
                  <p class="mt-7 text-center text-sm text-zinc-400">Đã có tài khoản? <a href="/login" class="font-semibold text-red-400 hover:text-red-300">Đăng nhập</a></p>
                  
            </section>
             <div id="register-toast" role="status" aria-live="polite"
            class="pointer-events-none fixed right-6 top-6 z-50 flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-600 px-5 py-4 text-sm font-medium text-white shadow-xl
            opacity-0 translate-x-8 transition-all duration-300 ease-out hidden">
                  <span class="text-lg">✓</span>
                  <span>Đăng ký thành công!</span>
            </div>
      `;
        app.append(div);
    };
    renderRegister();
    const registerSuccessToast = document.querySelector("#register-toast");

    const showRegisterToast = () => {
        registerSuccessToast.classList.remove("hidden");
        registerSuccessToast.offsetHeight;
        registerSuccessToast.classList.remove("opacity-0", "translate-x-8");
        registerSuccessToast.classList.add("opacity-100", "translate-x-0");

        setTimeout(() => {
            registerSuccessToast.classList.remove(
                "opacity-100",
                "translate-x-0",
            );
            registerSuccessToast.classList.add("opacity-0", "translate-x-8");

            setTimeout(() => {
                registerSuccessToast.classList.add("hidden");
            }, 300);
        }, 1500);
    };

    function showError(fieldName, message) {
        const errorField = document.querySelector(`#field-${fieldName}`);
        const errorMessageField = document.querySelector(
            `#field-${fieldName} .error-msg`,
        );
        console.log(errorMessageField);
        errorMessageField.innerHTML = message;
        errorMessageField.classList.remove("hidden");
    }

    function showSuccess(fieldName) {
        const successField = document.querySelector(`#field-${fieldName}`);
        const errorMessageField = document.querySelector(
            `#field-${fieldName} .error-msg`,
        );
        errorMessageField.innerHTML = null;
        errorMessageField.classList.add("hidden");
    }

    function validateUsername() {
        const value = document.querySelector("#register-name").value.trim();
        console.log(value);
        const REGEX_USERNAME = /^[a-zA-Z0-9_]{4,16}$/;

        if (value === "") {
            showError("register-name", "Không được để trống");
            return false;
        }
        if (value.length > 16 || value.length < 4) {
            showError("register-name", "Chứa từ 4 tới 16 ký tự");
            return false;
        }
        if (!REGEX_USERNAME.test(value)) {
            showError("register-name", "Chỉ gồm chữ, số, dấu gạch dưới");
            return false;
        }
        showSuccess("register-name");
        return true;
    }
    function validateEmail() {
        const value = document.querySelector("#register-email").value.trim();
        const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            showError("register-email", "Không được để trống");
            return false;
        }
        if (!REGEX_EMAIL.test(value)) {
            showError(
                "register-email",
                "Email phải có dạng : ai_do@dau_do.gi_do",
            );
            return false;
        }
        showSuccess("register-email");
        return true;
    }

    function validatePassword() {
        const value = document.querySelector("#register-password").value;
        const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

        if (value === "") {
            showError("register-password", "Không được để trống");
            return false;
        }
        if (value.length < 8) {
            showError("register-password", "Mật khẩu tối thiểu 6 ký tự ");
            return false;
        }
        if (!REGEX_PASSWORD.test(value)) {
            showError(
                "register-password",
                "Mật khẩu phải có ít nhất 1 chữ cái, 1 số ",
            );
            return false;
        }
        showSuccess("register-password");
        return true;
    }

    function validateConfirm() {
        const valueConfirm = document.querySelector(
            "#register-confirm-password",
        ).value;
        const valuePassword =
            document.querySelector("#register-password").value;
        if (valueConfirm === "") {
            showError("register-confirm-password", "Không được để trống");
            return false;
        }
        if (valueConfirm !== valuePassword) {
            showError("register-confirm-password", "Mật khẩu k khớp");
            return false;
        }
        showSuccess("register-confirm-password");
        return true;
    }

    document
        .querySelector("#register-name")
        .addEventListener("blur", validateUsername);
    document
        .querySelector("#register-email")
        .addEventListener("blur", validateEmail);
    document
        .querySelector("#register-password")
        .addEventListener("blur", validatePassword);
    document
        .querySelector("#register-confirm-password")
        .addEventListener("blur", validateConfirm);

    const registerForm = document.querySelector("#registerForm");
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const checkValidForm =
            validateUsername() &&
            validateEmail() &&
            validatePassword() &&
            validateConfirm();
        if (checkValidForm) {
            const username = document.querySelector("#register-name").value;
            const email = document.querySelector("#register-email").value;
            const password = document.querySelector("#register-password").value;
            const confirmPassword = document.querySelector(
                "#register-confirm-password",
            ).value;
            const registerData = {
                name: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            };
            // const registerRespone = await postRegister(registerData);
            const registerRespone = true;
            if (registerRespone) {
                showRegisterToast();
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2500);
            }
        }
    });
};
export { init };
