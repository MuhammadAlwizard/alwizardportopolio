import Hero from "@/components/Hero";
import ClientWork from "@/components/ClientWork";
import Projects from "@/components/Projects";
import Background from "@/components/Background";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();
  const clientWork = projects.filter((p) => p.category === "FREELANCE");
  const otherWork = projects.filter((p) => p.category !== "FREELANCE");

  return (
    <main>
      <Hero />
      <ClientWork projects={clientWork} />
      <Projects projects={otherWork} />
      <Background />
      <Certificates />
      <Contact />
    </main>
  );
}
