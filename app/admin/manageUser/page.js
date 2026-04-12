import UserManagementPage from "@/Components/AdminDashBoard/UserManagementPage";
import { Suspense } from "react";

export default function page(){
    return (
        <Suspense>
            <UserManagementPage/>
        </Suspense>
    );
}