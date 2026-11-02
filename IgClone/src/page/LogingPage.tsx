import { FloatingInput } from "@/components/floating-input";
import Footer from "@/components/Footer";
import { PasswordFloatingInput } from "@/components/PasswordFloatingInput";
import { Button } from "@/components/ui/button";
import { postLogin } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
type LoginFormData = {
    email: string;
    password: string;
};
function LogingPage() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormData>();
    const mutation = useMutation({
        mutationFn: postLogin,
    });
    const onSubmit = (data: LoginFormData) => {
        console.log(data);
        mutation.mutate(data);
    };
    const errorMessage =
        mutation.isError &&
        typeof mutation.error === "object" &&
        mutation.error !== null &&
        "response" in mutation.error
            ? (mutation.error as { response?: { data?: { message?: string } } })
                  .response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
            : "";
    return (
        <div className="w-screen bg-black text-white min-h-screen">
            <div className=" m-auto w-screen lg:flex md:flex ">
                <div className="min-h-36 m-auto flex  max-md:justify-center lg:flex-3 md:flex-2 md:flex-col px-8 lg:px-[10%]">
                    <img
                        src="src/assets/logo-line.svg"
                        alt="Instagram logo displayed on a black background"
                        className="bg-transparent text-transparent w-18"
                    />
                    <div className="max-md:hidden mt-6">
                        <div className="w-full text-5xl text-center font-medium px-8 font-['Instagram_Sans_Regular','Instagram_Sans',sans-serif]">
                            <span>
                                Hãy xem các khoảnh khắc thường ngày của
                                <span className="bg-linear-to-r from-[#f76205] to-[rgba(211,0,197,1)] bg-clip-text text-transparent">
                                    {" "}
                                    bạn thân{" "}
                                </span>
                                nhé.
                            </span>
                        </div>
                        <img
                            src="src/assets/login-img.svg"
                            className="w-full"
                        />
                    </div>
                </div>
                <div className=" bg-[#1f1f20] align-middle justify-center flex flex-col max-md:border-t max-md:border-b border-t-[#4b4d4f] border-b-[#4b4d4f] min-h-255 md:flex-3 lg:border-l-[#4b4d4f] lg:border-l-2 ">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col justify-center items-center max-lg:px-8 px-10 gap-8 "
                    >
                        <h2 className="w-full text-left font-bold text-xl mb-6">
                            Đăng nhập vào Instagram
                        </h2>
                        <FloatingInput
                            label="Số di động, tên người dùng hoặc Email"
                            type="text"
                            labelClassName="bg-[#1f1f20]"
                            inputWrapperClassName="w-full"
                            className="min-w-full "
                            {...register("email")}
                        />
                        <PasswordFloatingInput
                            label="Mật khẩu "
                            inputWrapperClassName="w-full"
                            labelClassName="bg-[#1f1f20]"
                            {...register("password")}
                        />
                        {errorMessage && (
                            <span className="italic text-red-600 text-s">
                                {errorMessage}
                            </span>
                        )}
                        <Button
                            type="submit"
                            variant="secondary"
                            className={
                                "rounded-full w-full py-6 bg-blue-600 text-md mb-8"
                            }
                        >
                            Đăng nhập
                        </Button>
                        <p className="hover:opacity-80 hover:underline">
                            <Link to="/forgot-password">Quên mật khẩu?</Link>
                        </p>
                        <Button
                            variant="secondary"
                            className={
                                "rounded-full w-full py-6 bg-[#28292b] text-md"
                            }
                        >
                            Đăng nhập bằng FaceBook
                        </Button>
                        <Button
                            variant="secondary"
                            className={
                                "rounded-full w-full py-6 text-md border-blue-400 text-blue-400"
                            }
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            Tạo tài khoản mới
                        </Button>
                        <img
                            src="src/assets/meta-logo.svg"
                            alt="meta-logo"
                            className="w-18"
                        />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LogingPage;
