import { Fira_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import NavBar from "@/Components/layout/Navbar";
import FooterBD from "@/Components/layout/Footer";
import AuthContextProvider from "./context/authContext";


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
    <html lang="en">

      <body className={`${firaSans.className}`}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>

      </body>
    </html>
  );
}
