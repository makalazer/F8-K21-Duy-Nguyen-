import { FloatingInput } from "@/components/floating-input";
import Footer from "@/components/Footer";
import { PasswordFloatingInput } from "@/components/PasswordFloatingInput";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { useMemo } from "react";
import { days, months, years } from "@/utils/Constant";
import { registerFormSchema } from "@/schema/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { postRegister } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
    day: string;
    month: string;
    year: string;
    name: string;
    username: string;
};

function Register() {
    const {
        register,
        handleSubmit,
        control,
        trigger,
        formState: { errors },
    } = useForm<RegisterFormData>({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(registerFormSchema),
    });

    const mutation = useMutation({
        mutationFn: postRegister,
        onSuccess: () => {
            window.location.href = "/verify-email";
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

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
        mutation.mutate(data);
    };
    const dayOptions = useMemo(() => days(), []);
    const yearOptions = useMemo(() => years(), []);

    return (
        <div className="w-full">
            <div className="max-w-2xl m-auto my-16 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <img
                            src="src/assets/meta-logo.svg"
                            alt="meta-logo"
                            className="w-18"
                        />
                        <FieldSet>
                            <h2 className="text-3xl font-bold">
                                Bắt đầu trên Instagram bằng Tài khoản Meta
                            </h2>
                            <FieldDescription>
                                Tài khoản Meta giúp bạn truy cập một cách dễ
                                dàng và an toàn vào nhiều công nghệ của Meta,
                                chẳng hạn như Instagram.
                            </FieldDescription>
                            <FieldGroup className="font-semibold">
                                <Field data-invalid={errors.email}>
                                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                        Email
                                    </FieldLabel>
                                    <FloatingInput
                                        label="Email"
                                        type="text"
                                        labelClassName="bg-background"
                                        inputWrapperClassName="w-full"
                                        className="min-w-full"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <span className="text-red-600 text-xs">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </Field>
                                <Field data-invalid={errors.password}>
                                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                        Mật khẩu
                                    </FieldLabel>
                                    <PasswordFloatingInput
                                        label="Mật khẩu "
                                        inputWrapperClassName="w-full"
                                        labelClassName="bg-background"
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <span className="text-red-600 text-xs">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </Field>
                                <Field data-invalid={errors.confirmPassword}>
                                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                        Xác nhận mật khẩu
                                    </FieldLabel>
                                    <PasswordFloatingInput
                                        label="Xác nhận mật khẩu "
                                        inputWrapperClassName="w-full"
                                        labelClassName="bg-background"
                                        {...register("confirmPassword", {
                                            onBlur: () => {
                                                trigger("confirmPassword");
                                            },
                                        })}
                                    />
                                    {errors.confirmPassword && (
                                        <span className="text-red-600 text-xs">
                                            {errors.confirmPassword.message}
                                        </span>
                                    )}
                                </Field>
                                <FieldLabel>Ngày Sinh</FieldLabel>
                                <div className="grid grid-cols-3 gap-4">
                                    <Field data-invalid={errors.day}>
                                        <FieldLabel htmlFor="checkout-7j9-cvv">
                                            Day
                                        </FieldLabel>
                                        <Controller
                                            name="day"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        items={dayOptions}
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                    >
                                                        <SelectTrigger id="checkout-exp-month-ts6">
                                                            <SelectValue placeholder="DD" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {dayOptions.map(
                                                                    (item) => (
                                                                        <SelectItem
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            value={
                                                                                item.value
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                        {errors.day && (
                                            <span className="text-red-600 text-xs">
                                                {errors.day.message}
                                            </span>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-exp-month-ts6">
                                            Month
                                        </FieldLabel>
                                        <Controller
                                            name="month"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        items={months}
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                    >
                                                        <SelectTrigger id="checkout-exp-month-ts6">
                                                            <SelectValue placeholder="MM" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {months.map(
                                                                    (item) => (
                                                                        <SelectItem
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            value={
                                                                                item.value
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                        {errors.month && (
                                            <span className="text-red-600 text-xs">
                                                {errors.month.message}
                                            </span>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                                            Year
                                        </FieldLabel>
                                        <Controller
                                            name="year"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        items={yearOptions}
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                    >
                                                        <SelectTrigger id="checkout-7j9-exp-year-f59">
                                                            <SelectValue placeholder="YYYY" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {yearOptions.map(
                                                                    (item) => (
                                                                        <SelectItem
                                                                            key={
                                                                                item.value
                                                                            }
                                                                            value={
                                                                                item.value
                                                                            }
                                                                        >
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                );
                                            }}
                                        />
                                        {errors.year && (
                                            <span className="text-red-600 text-xs">
                                                {errors.year.message}
                                            </span>
                                        )}
                                    </Field>
                                </div>
                            </FieldGroup>
                        </FieldSet>
                        <FieldSeparator />
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                Tên
                            </FieldLabel>
                            <FloatingInput
                                label="Tên"
                                type="text"
                                labelClassName="bg-background"
                                inputWrapperClassName="w-full"
                                className="min-w-full"
                                {...register("name")}
                            />
                            {errors.name && (
                                <span className="text-red-600 text-xs">
                                    {errors.name.message}
                                </span>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                Tên người dùng
                            </FieldLabel>
                            <FloatingInput
                                label="Tên người dùng"
                                type="text"
                                labelClassName="bg-background"
                                inputWrapperClassName="w-full"
                                className="min-w-full"
                                {...register("username")}
                            />
                            {errors.username && (
                                <span className="text-red-600 text-xs">
                                    {errors.username.message}
                                </span>
                            )}
                        </Field>
                        <FieldSet>
                            <FieldDescription>
                                Những người dùng dịch vụ của chúng tôi có thể đã
                                tải thông tin liên hệ của bạn lên Instagram. .
                                Bằng việc nhấn vào Gửi, bạn đồng ý tạo tài khoản
                                cũng như chấp thuận , và của Instagram. mô tả
                                các cách chúng tôi có thể dùng thông tin thu
                                thập được khi bạn tạo tài khoản. Chẳng hạn,
                                chúng tôi sử dụng thông tin này để cung cấp, cá
                                nhân hóa và cải thiện các sản phẩm của mình, bao
                                gồm quảng cáo.
                            </FieldDescription>
                        </FieldSet>
                        {errorMessage && (
                            <span className="italic text-red-600 text-s m-auto">
                                {errorMessage}
                            </span>
                        )}
                        <Field orientation="vertical">
                            <Button
                                type="submit"
                                variant="secondary"
                                className={
                                    "rounded-full w-full py-6 bg-blue-600 text-md mb-8"
                                }
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? "Đang gửi" : "Gửi"}
                            </Button>
                            <Button
                                variant="secondary"
                                className={
                                    "rounded-full w-full py-6 bg-[#28292b] text-md"
                                }
                                onClick={() => {
                                    window.location.href = "/login";
                                }}
                            >
                                Tôi có tài khoản rồi
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
