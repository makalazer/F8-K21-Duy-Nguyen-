import { renderHeader } from "../../components/header";
import { patchChangePassword } from "../../services/auth";

const init = async () => {
    const app = document.querySelector("#app");
    app.innerHTML = "";
    const body = document.querySelector("body");
    body.className = "min-h-screen bg-[#0f0f0f] text-white";
    renderHeader();
    const renderChangePassword = () => {
        const div = document.createElement("div");
        div.className =
            "flex min-h-screen items-center justify-center px-6 py-10";
        div.innerHTML = `         
            <section id="register-form" class=" w-full max-w-md rounded-2xl border border-zinc-800 bg-[#181818] p-8 shadow-2xl">
                  <div class="mb-8 text-center">
                        <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-3xl ">♪</div>
                        <h1 class="text-3xl font-bold">Đổi mật khẩu</h1>
                  </div>

                  <form class="space-y-5" id="changePasswordForm">
                        
                        <div id="field-changePassword-currentPassword">
                              <label for="changePassword-currentPassword" class="mb-2 block text-sm font-medium text-zinc-300">Mật khẩu hiện tại</label>
                              <input id="changePassword-currentPassword" type="password" placeholder="Mật khẩu hiện tại" required class="w-full mb-2 rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                              <p class="text-red-500 capitalize error-msg hidden"></p>

                        </div>
                        <div id="field-changePassword-password">
                              <label for="changePassword-password" class="mb-2 block text-sm font-medium text-zinc-300">Mật khẩu mới</label>
                              <input id="changePassword-password" type="password" placeholder="Mật khẩu mới" required minlength="6" class="w-full mb-2 rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                              <p class="text-red-500 capitalize error-msg hidden"></p>
                        </div>
                        <div id="field-changePassword-confirm-password">
                              <label for="changePassword-confirm-password" class="mb-2 block text-sm font-medium text-zinc-300">Xác nhận mật khẩu</label>
                              <input id="changePassword-confirm-password" type="password" placeholder="Nhập lại mật khẩu" required minlength="6" class="w-full mb-2 rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                              <p class="text-red-500 capitalize error-msg hidden"></p>
                        </div>
                        <button type="submit" class="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">Đổi mật khẩu</button>
                  </form>
            </section>
             <div id="changePassword-toast" role="status" aria-live="polite"
            class="pointer-events-none fixed right-6 top-6 z-50 flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-600 px-5 py-4 text-sm font-medium text-white shadow-xl
            opacity-0 translate-x-8 transition-all duration-300 ease-out hidden">
                  <span class="text-lg">✓</span>
                  <span>Đổi mật khẩu thành công!</span>
            </div>
      `;
        app.append(div);
    };
    renderChangePassword();
    const changePasswordSuccessToast = document.querySelector(
        "#changePassword-toast",
    );

    const showToast = () => {
        changePasswordSuccessToast.classList.remove("hidden");
        changePasswordSuccessToast.offsetHeight;
        changePasswordSuccessToast.classList.remove(
            "opacity-0",
            "translate-x-8",
        );
        changePasswordSuccessToast.classList.add(
            "opacity-100",
            "translate-x-0",
        );

        setTimeout(() => {
            changePasswordSuccessToast.classList.remove(
                "opacity-100",
                "translate-x-0",
            );
            changePasswordSuccessToast.classList.add(
                "opacity-0",
                "translate-x-8",
            );

            setTimeout(() => {
                changePasswordSuccessToast.classList.add("hidden");
            }, 300);
        }, 1500);
    };

    function showError(fieldName, message) {
        const errorField = document.querySelector(`#field-${fieldName}`);
        const errorMessageField = document.querySelector(
            `#field-${fieldName} .error-msg`,
        );
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

    function validatePassword() {
        const value = document.querySelector("#changePassword-password").value;
        const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

        if (value === "") {
            showError("changePassword-password", "Không được để trống");
            return false;
        }
        if (value.length < 6) {
            showError("changePassword-password", "Mật khẩu tối thiểu 6 ký tự ");
            return false;
        }
        if (!REGEX_PASSWORD.test(value)) {
            showError(
                "changePassword-password",
                "Mật khẩu phải có ít nhất 1 chữ cái, 1 số ",
            );
            return false;
        }
        showSuccess("changePassword-password");
        return true;
    }

    function validateConfirm() {
        const valueConfirm = document.querySelector(
            "#changePassword-confirm-password",
        ).value;
        const valuePassword = document.querySelector(
            "#changePassword-password",
        ).value;
        if (valueConfirm === "") {
            showError("changePassword-confirm-password", "Không được để trống");
            return false;
        }
        if (valueConfirm !== valuePassword) {
            showError("changePassword-confirm-password", "Mật khẩu không khớp");
            return false;
        }
        showSuccess("changePassword-confirm-password");
        return true;
    }

    document
        .querySelector("#changePassword-password")
        .addEventListener("blur", validatePassword);
    document
        .querySelector("#changePassword-confirm-password")
        .addEventListener("blur", validateConfirm);

    const changePasswordForm = document.querySelector("#changePasswordForm");
    changePasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const checkValidForm = validatePassword() && validateConfirm();
        if (checkValidForm) {
            const oldPassword = document.querySelector(
                "#changePassword-currentPassword",
            ).value;
            const password = document.querySelector(
                "#changePassword-password",
            ).value;
            const confirmPassword = document.querySelector(
                "#changePassword-confirm-password",
            ).value;
            const changePasswordData = {
                oldPassword: oldPassword,
                password: password,
                confirmPassword: confirmPassword,
            };
            const changePasswordRespone =
                await patchChangePassword(changePasswordData);
            if (changePasswordRespone) {
                showToast();
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2500);
            }
        }
    });
};
export { init };
