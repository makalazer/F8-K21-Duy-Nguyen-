import { FloatingInput } from "@/components/floating-input";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { postForgotPassword } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
type ForgotPasswodFormData = {
    email: string;
};
function ForgotPassword() {
    const { register, handleSubmit } = useForm<ForgotPasswodFormData>();

    const mutation = useMutation({
        mutationFn: postForgotPassword,
    });

    const errorMessage =
        mutation.isError &&
        typeof mutation.error === "object" &&
        mutation.error !== null &&
        "response" in mutation.error
            ? (mutation.error as { response?: { data?: { message?: string } } })
                  .response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
            : "";

    const onSubmit = (data: ForgotPasswodFormData) => {
        console.log(data);
        mutation.mutate(data.email);
    };
    return (
        <div className="w-full bg-inherit min-h-vh flex justify-center flex-col h-screen items-center ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-lg bg-mist-900 rounded-2xl flex flex-col justify-center items-center gap-8 p-12 text-center">
                    <h3 className="text-2xl font-semibold ">Quên mật khẩu</h3>

                    <Field>
                        <FloatingInput
                            label="Email"
                            type="text"
                            labelClassName="bg-mist-900"
                            inputWrapperClassName="w-full"
                            className="min-w-full"
                            {...register("email")}
                        />
                    </Field>
                    {mutation.isSuccess && (
                        <span className="italic text-lime-500 text-s">
                            Email đặt lại mậu khẩu đã được gửi thành công
                        </span>
                    )}
                    {errorMessage && (
                        <span className="italic text-red-600 text-s">
                            {errorMessage}
                        </span>
                    )}
                    <Button
                        type="submit"
                        variant="secondary"
                        className={
                            "rounded-full w-full py-6 bg-blue-600 text-md "
                        }
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Đang gửi" : "Gửi email reset"}
                    </Button>
                    <p className="hover:opacity-80 hover:underline">
                        <Link to="/login">Quay lại đăng nhập</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
