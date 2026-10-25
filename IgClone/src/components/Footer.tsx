const FooterLink = [
    {
        name: "Meta",
        link: "#",
    },
    {
        name: "Giói thiệu",
        link: "#",
    },
    {
        name: "Việc làm",
        link: "#",
    },
    {
        name: "Blog",
        link: "#",
    },
    {
        name: "Trợ Giúp",
        link: "#",
    },
    {
        name: "API",
        link: "#",
    },
    {
        name: "Quyên riêng tư",
        link: "#",
    },
    {
        name: "Điều khoản",
        link: "#",
    },
    {
        name: "Vị trí",
        link: "#",
    },
    {
        name: "Phổ biến",
        link: "#",
    },
    {
        name: "Instagram Lite",
        link: "#",
    },
    {
        name: "Meta AI",
        link: "#",
    },
    {
        name: "Muse",
        link: "#",
    },
    {
        name: "Threads",
        link: "#",
    },
    {
        name: "Tải thông tin người liên hệ lên & người không phải người dùng",
        link: "#",
    },
    {
        name: "Meta đã xác minh",
        link: "#",
    },
];
function Footer() {
    return (
        <div className="w-screen">
            <div className="flex flex-row px-4 flex-wrap gap-3 justify-center mt-6 mb-4">
                {FooterLink.map((item, index) => {
                    return (
                        <span className="font-thin hover:underline" key={index}>
                            <a href={item.link} target="_blank">
                                {item.name}
                            </a>
                        </span>
                    );
                })}
            </div>
            <p className="m-auto font-thin text-center">
                © 2026 Instagram from Meta
            </p>
        </div>
    );
}

export default Footer;
