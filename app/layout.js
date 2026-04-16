import { Fira_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
;
import AuthContextProvider from "./context/authContext";
import DonationListContextProvider from "./context/donationListContextProvider";


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
          <DonationListContextProvider>
            {children}
          </DonationListContextProvider>
        </AuthContextProvider>

      </body>
    </html>
  );
}
