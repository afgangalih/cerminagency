import { MarketingNav } from "@/components/marketing/MarketingNav";
import { HeroSection } from "@/components/marketing/HeroSection";
import { BrandMarquee } from "@/components/marketing/BrandMarquee";
import { AppShowcaseSection } from "@/components/marketing/AppShowcaseSection";
import { PillarsSection } from "@/components/marketing/PillarsSection";
import { FeatureDeepDivesSection } from "@/components/marketing/FeatureDeepDivesSection";
import { ShowreelGrid } from "@/components/marketing/ShowreelGrid";
import { UseCasesSection } from "@/components/marketing/UseCasesSection";
import { IntegrationsSection } from "@/components/marketing/IntegrationsSection";
import { PricingSection } from "@/components/marketing/PricingSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";
import { BriefFormSection } from "@/components/marketing/BriefFormSection";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col bg-white min-h-screen">
      {/* 1. Top Navigation */}
      <MarketingNav />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Trusted By Logo Marquee */}
      <BrandMarquee />

      {/* 4. Interactive Browser Mockup / App Showcase */}
      <AppShowcaseSection />

      {/* 5. 6 Core Feature Pillars & Scaled Quote */}
      <PillarsSection />

      {/* 6. Feature Deep Dives & Client Testimonials */}
      <FeatureDeepDivesSection />

      {/* 7. Actual Video Production Showreels (Studio Malang) */}
      <ShowreelGrid />

      {/* 8. Use Cases by Agency & Brand Type */}
      <UseCasesSection />

      {/* 9. 1,000s of Cloud Integrations */}
      <IntegrationsSection />

      {/* 10. Clear Fair Pricing with Monthly/Annual Toggle */}
      <PricingSection />

      {/* 11. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 12. Switch in Days CTA Banner */}
      <FinalCtaSection />

      {/* 13. Onboarding Brief & Proforma Invoice Generator */}
      <BriefFormSection />

      {/* 14. Full Platform Footer */}
      <MarketingFooter />
    </main>
  );
}
