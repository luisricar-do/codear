import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { MentorSection } from "../components/MentorSection";
import { MissionSection } from "../components/MissionSection";
import { CoursesSection } from "../components/CoursesSection";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MentorSection />
        <MissionSection />
        <CoursesSection />
        <Footer />
      </main>
    </>
  );
}
