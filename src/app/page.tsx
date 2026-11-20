import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

const marqueeItems = [
  "Full Stack Development",
  "Frontend Systems",
  "Backend APIs",
  "Interface Design",
  "TypeScript",
  "Always Learning",
  "Open to Opportunities",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} className="bg-surface" />
      <About />
      <Skills />
      <Journey />
      <Projects />
      <Services />
      <Blog />
      <Contact />
    </>
  );
}
