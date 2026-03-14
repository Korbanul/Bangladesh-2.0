import FooterBD from "@/Components/layout/Footer";
import NavBar from "@/Components/layout/Navbar";
import DonateSection from "@/Components/sections/DonateSection";
import HeroSection from "@/Components/sections/herosection";
import OpinionSection from "@/Components/sections/opinionsection";
import PillersofBD from "@/Components/sections/pillarsofbangladesh";
import RecentNewSection from "@/Components/sections/recentNews";
import SubscribeSection from "@/Components/sections/SubscribeSection";
import VisionofBD from "@/Components/sections/visionsection";

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <PillersofBD />
      <VisionofBD />
      <OpinionSection />
      <RecentNewSection />
      <DonateSection />
      <SubscribeSection />
      <FooterBD />
    </>
  );
}
