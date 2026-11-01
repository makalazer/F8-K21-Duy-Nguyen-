export const months = [
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
export const days = () => {
    const result: { label: string; value: string }[] = [];
    for (let i = 1; i <= 31; i++) {
        result.push({ label: String(i), value: String(i) });
    }
    return result;
};
export const years = () => {
    let result: { label: string; value: string }[] = [];
    for (let i = 1900; i < new Date().getFullYear(); i++) {
        result = [{ label: String(i), value: String(i) }, ...result];
    }
    return result;
};
