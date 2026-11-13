import Sidebar from "@/components/ui/Sidebar/Sidebar";

type MainLayoutProps = {
    children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="w-full h-screen bg-blend-color-burn ">
            <Sidebar />
            <div className="bg-transparent w-full min-w-0 ">{children}</div>
        </div>
    );
}

export default MainLayout;
