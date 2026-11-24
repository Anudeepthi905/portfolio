import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { Writing } from "@/components/Writing";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[54rem] px-5 sm:px-8">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-bg focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Intro />
        <Work />
        <Experience />
        <Writing />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
