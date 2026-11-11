import Sidebar from "@/components/ui/Sidebar/Sidebar";

type MainLayoutProps = {
    children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="w-screen h-screen bg-blend-color-burn">
            <Sidebar />
            <div className="bg-transparent w-screen ">{children}</div>
        </div>
    );
}

export default MainLayout;
