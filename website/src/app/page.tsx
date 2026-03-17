import { Hero } from "@/components/home/Hero";
import { TemplateShowcase } from "@/components/home/TemplateShowcase";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { CTABanner } from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TemplateShowcase />
      <FeatureGrid />
      <CTABanner />
    </>
  );
}
