import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import TopFundedCampaigns from "@/components/TopFundedCampaigns";


export default function HomePage() {

  return (
    <div>
      <HeroSection />
      <TopFundedCampaigns />
      <HowItWorks />
    </div>
  )
};