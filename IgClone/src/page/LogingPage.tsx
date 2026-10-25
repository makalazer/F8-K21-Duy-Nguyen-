import { FloatingInput } from "@/components/floating-input";
import Footer from "@/components/Footer";
import { PasswordFloatingInput } from "@/components/PasswordFloatingInput";
import { Button } from "@/components/ui/button";

function LogingPage() {
    return (
        <div className="w-screen bg-black text-white min-h-screen">
            <div className=" m-auto w-screen">
                <div className="min-h-36 m-auto flex fa-align-center justify-center ">
                    <img
                        src="src/assets/logo-line.svg"
                        alt="Instagram logo displayed on a black background"
                        className="bg-transparent text-transparent w-18"
                    />
                </div>
                <div className=" bg-[#1f1f20] align-middle justify-center flex flex-col border-t border-b border-t-[#4b4d4f] border-b-[#4b4d4f] min-h-255 ">
                    <form
                        action=""
                        className="flex flex-col justify-center items-center px-24 gap-8 "
                    >
                        <h2 className="w-full text-left font-bold text-xl mb-6">
                            Đăng nhập vào Instagram
                        </h2>
                        <FloatingInput
                            label="Số di động, tên người dùng hoặc Email"
                            type="text"
                            labelClassName="bg-[#1f1f20]"
                            inputWrapperClassName="w-full"
                            className="min-w-full"
                        />
                        <PasswordFloatingInput
                            label="Mật khẩu "
                            inputWrapperClassName="w-full"
                            labelClassName="bg-[#1f1f20]"
                        />
                        <Button
                            variant="secondary"
                            className={
                                "rounded-full w-full py-6 bg-blue-600 text-md mb-8"
                            }
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            variant="secondary"
                            className={
                                "rounded-full w-full py-6 bg-blue-600 text-md"
                            }
                        >
                            Đăng nhập bằng FaceBook
                        </Button>
                        <Button
                            variant="secondary"
                            className={
                                "rounded-full w-full py-6 text-md border-blue-400 text-blue-400"
                            }
                        >
                            Tạo tài khoản mới
                        </Button>
                        <img src="src/assets/meta-logo.svg" alt="meta-logo" className="w-18" />
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default LogingPage;
