import z from "zod";

export const registerFormSchema = z
    .object({
        username: z
            .string()
            .min(1, { message: "Tên người dùng không được để trống" }),
        password: z
            .string()
            .min(8, { message: "Mật khẩu tối thiểu 8 ký tự" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])/, {
                message:
                    "Mật khẩu phải có ít nhất 1 ký tự in hoa và 1 ký tự in thường",
            }),

        email: z
            .string()
            .min(1, { message: "Email không được để trống" })
            .pipe(z.email({ message: "Email không hợp lệ" })),
        confirmPassword: z
            .string()
            .min(8, { message: "Vui lòng xác nhận mật khẩu" }),
        name: z.string().min(1, { message: "Tên không được để trống" }),
        day: z.string().min(1, { message: "Ngày sinh không được để trống" }),
        month: z.string().min(1, { message: "Tháng sinh không được để trống" }),
        year: z.string().min(1, { message: "Năm sinh không được để trống" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
        // Zod 4: cho phép refine chạy dù các field khác có lỗi
        when(payload) {
            const value = payload.value as {
                password?: unknown;
                confirmPassword?: unknown;
            };
            return (
                typeof value.password === "string" &&
                typeof value.confirmPassword === "string"
            );
        },
    });
