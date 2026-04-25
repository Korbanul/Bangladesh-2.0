"use client"
import FooterBD from "@/Components/layout/Footer";
import NavBar from "@/Components/layout/Navbar";
import DonateSection from "@/Components/sections/DonateSection";
import HeroSection from "@/Components/sections/herosection";
import OpinionSection from "@/Components/sections/opinionsection";
import PillersofBD from "@/Components/sections/pillarsofbangladesh";
import RecentNewsSection from "@/Components/sections/recentNews";
import SubscribeSection from "@/Components/sections/SubscribeSection";
import VisionofBD from "@/Components/sections/visionsection";
import { useListContext } from "./context/donationListContextProvider";
import { useEffect } from "react";

export default function Home() {
  const { fetchRecentThreeNews, recentThreeNews } = useListContext();
  useEffect(() => {
    fetchRecentThreeNews();
  }, [])
  return (
    <>
      <NavBar />
      <HeroSection />
      <PillersofBD />
      <VisionofBD />
      <OpinionSection />
      <RecentNewsSection newsList={recentThreeNews} />
      <DonateSection />
      <SubscribeSection />
      <FooterBD />
    </>
  );
}
