import { LadingNavbar } from "@/components/landing-navbar";
import LandingHero from "@/components/landing-hero";
import LandingContent from "@/components/landing-content";
const LandingPage = () => {
  return (
    <div className="h-full">
      <LadingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
   );
}

export default LandingPage;