import Hero from "@/components/Hero";
import About from "@/components/About";
import EducationSkills from "@/components/EducationSkills";
import Competencies from "@/components/Competencies";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <EducationSkills />
      <Competencies />
      <Experience />
      <Projects />
      <Certificates />
      <Contact />
    </main>
  );
}
