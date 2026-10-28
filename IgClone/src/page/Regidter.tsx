import { FloatingInput } from "@/components/floating-input";
import Footer from "@/components/Footer";
import { PasswordFloatingInput } from "@/components/PasswordFloatingInput";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
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
import { Link } from "react-router-dom";

const months = [
    { label: "MM", value: null },
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
];
const days = () => {
    const result: { label: string; value: string | null }[] = [
        { label: "DD", value: null },
    ];
    for (let i = 1; i <= 31; i++) {
        result.push({ label: String(i), value: String(i) });
    }
    return result;
};
const years = () => {
    let result: { label: string; value: string }[] = [];
    for (let i = 1900; i < new Date().getFullYear(); i++) {
        result = [{ label: String(i), value: String(i) }, ...result];
    }
    return [{ label: "YYYY", value: null }, ...result];
};

function Regidter() {
    console.log(years);
    return (
        <div className="w-full">
            <div className="max-w-2xl m-auto my-16 ">
                <form>
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
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                        Số di động hoặc email
                                    </FieldLabel>
                                    <FloatingInput
                                        label="Số di động, tên người dùng hoặc Email"
                                        type="text"
                                        labelClassName="bg-background"
                                        inputWrapperClassName="w-full"
                                        className="min-w-full"
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                        Mật khẩu
                                    </FieldLabel>
                                    <PasswordFloatingInput
                                        label="Mật khẩu "
                                        inputWrapperClassName="w-full"
                                        labelClassName="bg-background"
                                    />
                                </Field>
                                <FieldLabel>Ngày Sinh</FieldLabel>
                                <div className="grid grid-cols-3 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="checkout-7j9-cvv">
                                            Day
                                        </FieldLabel>
                                        <Select items={days()}>
                                            <SelectTrigger id="checkout-exp-month-ts6">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {days().map((item) => (
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-exp-month-ts6">
                                            Month
                                        </FieldLabel>
                                        <Select items={months}>
                                            <SelectTrigger id="checkout-exp-month-ts6">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {months.map((item) => (
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                                            Year
                                        </FieldLabel>
                                        <Select items={years()}>
                                            <SelectTrigger id="checkout-7j9-exp-year-f59">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {years().map((item) => (
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
                            />
                        </Field>{" "}
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
                            />
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
                        <FieldSet></FieldSet>
                        <Field orientation="vertical">
                            <Button
                                variant="secondary"
                                className={
                                    "rounded-full w-full py-6 bg-blue-600 text-md mb-8"
                                }
                            >
                                Gửi
                            </Button>
                            <Button
                                variant="secondary"
                                className={
                                    "rounded-full w-full py-6 bg-[#28292b] text-md"
                                }
                            >
                                <Link to="/">Tôi có tài khoản rồi</Link>
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Regidter;
