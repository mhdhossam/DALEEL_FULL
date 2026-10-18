import { Section } from "@/components/sections/Section";
import HeroSection from "@/components/sections/HeroSection";
import OurStory from "@/components/sections/OurStory";
import Testimonials from "@/components/sections/Testimonials";
import SEO from "@/components/common/SEO";
import { VisionMission, AboutGoals, AboutTeam } from "@/features/about";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="من نحن - رؤية دليل ومهمتنا"
        description="تعرف على رؤية دليل ومهمتها في تمكين الجميع من الوصول إلى تعليم عالي الجودة وبيئة داعمة وشاملة."
      />
      {/* Hero */}
      <section>
        <HeroSection badge="من نحن 🌟" />
      </section>

      {/* Vision & Mission */}
      <VisionMission />

      {/* Goals */}
      <AboutGoals />

      {/* Our Story */}
      <Section variant="muted">
        <OurStory />
      </Section>

      {/* Team */}
      <AboutTeam />

      {/* Why Daleel */}
      <Section>
        <Testimonials />
      </Section>
    </>
  );
}
