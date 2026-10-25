import { FloatingInput } from "@/components/floating-input";
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
                <div className=" bg-[#1f1f20] border-t border-b border-t-[#4b4d4f] border-b-[#4b4d4f]">
                    <form
                        action=""
                        className="flex flex-col justify-center items-center my-16 px-24  gap-6"
                    >
                        <h2 className="w-full text-left font-bold text-xl mb-6">
                            Đăng nhập vào Instagram
                        </h2>
                        <FloatingInput
                            label="Email"
                            type="text"
                            labelClassName="bg-[#1f1f20]"
                            inputWrapperClassName="w-full"
                            className="min-w-full"
                        />

                        <PasswordFloatingInput
                            label="Password"
                            inputWrapperClassName="w-full"
                            labelClassName="bg-[#1f1f20]"
                        />
                        
                        <Button variant="secondary" className={"rounded-full"}>
                            Đăng nhập{" "}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogingPage;
