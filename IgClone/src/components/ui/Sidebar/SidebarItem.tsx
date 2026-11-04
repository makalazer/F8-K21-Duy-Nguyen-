import { Link } from "react-router-dom";

interface SidebarItemProps {
    label: string;
    link: string;
    icon: React.ReactNode;
}
function SidebarItem(props: SidebarItemProps) {
    const { label, icon, link } = props;
    return (
        <Link to={link} className="flex justify-start gap-3 ">
            <div className="w-9/10  p-2 rounded-xl hover:opacity-90 hover:bg-gray-800 flex justify-start gap-3 items-center">
                {icon}
                <span
                    className=" text-xl leading-none  whitespace-nowrap
          w-0 group-hover:w-full overflow-hidden
          transition-all duration-200"
                >
                    {label}
                </span>
            </div>
        </Link>
    );
}

export default SidebarItem;
