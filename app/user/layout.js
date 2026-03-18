import { Fira_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";
import Sidebar from "@/Components/userDashboardComponents/sidebar";
import UserDashboardNavbar from "@/Components/userDashboardComponents/navbar";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata = {
  title: "Bangladesh 2.0",
  description: "Innovation and vision for New Bangladesh"
};

export default function RootLayout({ children }) {
  return (
    <div className={firaSans.className}> {/* Applying your font here too */}
      <div className="d-flex min-vh-100">
        <Sidebar />
        <div id="page-content-wrapper" className="flex-grow-1 overflow-hidden">
          {/*flex-grow-1 . For this the content will take the width that left after the sidebar. else it will force to take content full with . 
          and then the sidebar will pulled up  */}
          <UserDashboardNavbar />

   
          <main className="p-4">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}
