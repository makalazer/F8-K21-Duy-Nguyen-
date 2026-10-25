import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FloatingInput, type FloatingInputProps } from "./floating-input";
import { cn } from "cn";

export function PasswordFloatingInput({
    label,
    className,
    labelClassName,
    inputWrapperClassName,
    ...props
}: FloatingInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className={cn("relative", inputWrapperClassName)}>
            <FloatingInput
                label={label}
                type={show ? "text" : "password"}
                className={className}
                labelClassName={labelClassName}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
}
