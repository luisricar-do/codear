import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { MissionSection } from "../components/MissionSection";
import { CoursesSection } from "../components/CoursesSection";
import { ParticipateSection } from "../components/ParticipateSection";
import { CtaSection } from "../components/CtaSection";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MissionSection />
        <CoursesSection />
        <ParticipateSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
