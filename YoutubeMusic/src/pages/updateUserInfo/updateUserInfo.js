import { renderHeader } from "../../components/header";
import { getUserInfo, patchUpdateUserInfo } from "../../services/auth";

const init = async () => {
    const app = document.querySelector("#app");
    app.innerHTML = "";
    const body = document.querySelector("body");
    body.className = "min-h-screen bg-[#0f0f0f] text-white";
    let userInfo = await getUserInfo();
    renderHeader();
    const renderUpdateUserForm = () => {
        const div = document.createElement("div");
        div.className =
            "flex min-h-screen items-center justify-center px-6 py-10";
        div.innerHTML = `         
            <section id="update-form" class=" w-full max-w-md rounded-2xl border border-zinc-800 bg-[#181818] p-8 shadow-2xl">
                  <div class="mb-8 text-center">
                        <div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-2xl">♪</div>
                        <h1 class="text-3xl font-bold">Cập nhật thông tin</h1>
                  </div>

                  <form class="space-y-5" id="update-user-info-form">
                        <div id="field-update-name">
                              <label for="update-name" class="mb-2 block text-sm font-medium text-zinc-300">Họ và tên</label>
                              <input id="update-name" type="text" placeholder="Nguyễn Văn A" required class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                              <p class="text-red-500 capitalize error-msg hidden"></p>
                        </div>
                        <div id="field-update-email">
                              <label for="update-email" class="mb-2 block text-sm font-medium text-zinc-300">Email</label>
                              <input id="update-email" type="email" placeholder="you@example.com" required class="w-full rounded-lg border border-zinc-700 bg-[#0f0f0f] px-4 py-3 text-sm outline-none placeholder:text-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20">
                              <p class="text-red-500 capitalize error-msg hidden"></p>

                        </div>
            
                        <button type="submit" class="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">Cập nhật</button>
                  </form>
            </section>
            <div id="update-toast" role="status" aria-live="polite"
            class="pointer-events-none fixed right-6 top-6 z-50 flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-600 px-5 py-4 text-sm font-medium text-white shadow-xl
            opacity-0 translate-x-8 transition-all duration-300 ease-out hidden">
                  <span class="text-lg">✓</span>
                  <span>Cập nhật thành công!</span>
            </div>  
      `;
        app.append(div);
    };
    renderUpdateUserForm();

    const toast = document.querySelector("#update-toast");

    const showToast = () => {
        toast.classList.remove("hidden");
        toast.offsetHeight;
        toast.classList.remove("opacity-0", "translate-x-8");
        toast.classList.add("opacity-100", "translate-x-0");

        setTimeout(() => {
            toast.classList.remove("opacity-100", "translate-x-0");
            toast.classList.add("opacity-0", "translate-x-8");

            setTimeout(() => {
                toast.classList.add("hidden");
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

    function validateUsername() {
        const value = document.querySelector("#update-name").value.trim();
        const REGEX_USERNAME = /^[a-zA-Z0-9_]{4,16}$/;

        if (value === "") {
            showError("update-name", "Không được để trống");
            return false;
        }
        if (value.length > 16 || value.length < 4) {
            showError("update-name", "Chứa từ 4 tới 16 ký tự");
            return false;
        }
        if (!REGEX_USERNAME.test(value)) {
            showError("update-name", "Chỉ gồm chữ, số, dấu gạch dưới");
            return false;
        }
        showSuccess("update-name");
        return true;
    }
    function validateEmail() {
        const value = document.querySelector("#update-email").value.trim();
        const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            showError("update-email", "Không được để trống");
            return false;
        }
        if (!REGEX_EMAIL.test(value)) {
            showError(
                "update-email",
                "Email phải có dạng : ai_do@dau_do.gi_do",
            );
            return false;
        }
        showSuccess("update-email");
        return true;
    }
    const inputNameEl = document.querySelector("#update-name");
    const inputEmailEl = document.querySelector("#update-email");
    inputNameEl.addEventListener("blur", validateUsername);
    inputEmailEl.addEventListener("blur", validateEmail);

    inputNameEl.value = userInfo?.name;
    inputEmailEl.value = userInfo?.email;

    const updateUserInfoForm = document.querySelector("#update-user-info-form");
    updateUserInfoForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const checkValidForm = validateUsername() && validateEmail();
        if (checkValidForm) {
            const name = inputNameEl.value;
            const email = inputEmailEl.value;
            const updateUserInfoRequest = patchUpdateUserInfo({ name, email });

            if (updateUserInfoRequest) {
                showToast();
                setTimeout(() => {
                    window.location.href = "/";
                }, 2500);
            }
        }
    });
};
export { init };
