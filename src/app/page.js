import ExploreByCategory from "@/components/ExploreByCategory";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PlatformImpact from "@/components/PlatformImpact";
import TestimonialsSection from "@/components/TestimonialsSection";
import TopFundedCampaigns from "@/components/TopFundedCampaigns";


export default function HomePage() {

  return (
    <div>
      <HeroSection />
      <TopFundedCampaigns />
      <HowItWorks />
      <ExploreByCategory />
      <PlatformImpact />
      <TestimonialsSection />
    </div>
  )
};