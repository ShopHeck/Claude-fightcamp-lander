import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Pillars } from "@/components/sections/Pillars";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeatureCamp } from "@/components/sections/FeatureCamp";
import { FeatureTimer } from "@/components/sections/FeatureTimer";
import { FeatureWeight } from "@/components/sections/FeatureWeight";
import { FeatureLibraries } from "@/components/sections/FeatureLibraries";
import { FeatureIntelligence } from "@/components/sections/FeatureIntelligence";
import { Disciplines } from "@/components/sections/Disciplines";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaFooter } from "@/components/sections/CtaFooter";
import { Faq } from "@/components/sections/Faq";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Pillars />
        <HowItWorks />
        <FeatureCamp />
        <FeatureTimer />
        <FeatureWeight />
        <FeatureLibraries />
        <FeatureIntelligence />
        <Disciplines />
        <Testimonials />
        <Faq />
        <CtaFooter />
      </main>
      <Footer />
    </>
  );
}
