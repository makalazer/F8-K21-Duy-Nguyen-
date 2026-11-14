import Profile from "@/components/ui/Profile/Profile";
import MainLayout from "@/layouts/MainLayout";

function ProfilePage() {
    return (
        <MainLayout>
            <div className="m-auto w-180">
                <Profile />
            </div>
        </MainLayout>
    );
}

export default ProfilePage;
