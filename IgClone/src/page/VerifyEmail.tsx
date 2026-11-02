import { Button } from "@/components/ui/button";
import { postResendVerificationEmail } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { Mails } from "lucide-react";

function VerifyEmail() {
    const mutation = useMutation({
        mutationFn: postResendVerificationEmail,
        onError: (err) => {
            console.dir(err);
        },
    });

    const errorMessage =
        mutation.isError &&
        typeof mutation.error === "object" &&
        mutation.error !== null &&
        "response" in mutation.error
            ? (mutation.error as { response?: { data?: { message?: string } } })
                  .response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
            : "";

    return (
        <div className="w-full bg-inherit min-h-vh flex justify-center flex-col h-screen items-center ">
            <div className="w-lg bg-mist-900 rounded-2xl flex flex-col justify-center items-center gap-6 p-8 text-center">
                <Mails size={80} />
                <h3 className="text-2xl font-semibold ">
                    Xác nhận lại địa chỉ email của bạn
                </h3>
                <p>
                    Email xác nhận đã được gửi đên bạn, vui lòng kiếm tra và xác
                    nhận để hoàn thành đăng ký và sử dụng tài khoản
                </p>
                <Button
                    type="submit"
                    variant="secondary"
                    className={
                        "rounded-full w-fit py-6 bg-blue-600 text-md mt-8"
                    }
                    onClick={() => {
                        mutation.mutate("phuongduy10tin@gmail.com");
                    }}
                    disabled={mutation.isSuccess}
                >
                    {"Gửi lại mã xác nhận"}
                </Button>
                {mutation.isSuccess && (
                    <span className="italic text-lime-500 text-s">
                        Email xác nhận đã được gửi lại thành công
                    </span>
                )}
                {errorMessage && (
                    <span className="italic text-red-600 text-s">
                        {errorMessage}
                    </span>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;
