import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HowIWork } from "@/components/HowIWork";
import { Intro } from "@/components/Intro";
import { OffTheClock } from "@/components/OffTheClock";
import { RevealObserver } from "@/components/RevealObserver";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { Writing } from "@/components/Writing";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2.5 focus:text-on-primary"
      >
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <div className="mx-auto w-full max-w-[1040px] px-4 sm:px-6 lg:px-8">
        <main id="main">
          <Intro />
          <Work />
          <Experience />
          <HowIWork />
          <Writing />
          <Skills />
          <OffTheClock />
          <Contact />
        </main>
        <Footer />
      </div>
      <RevealObserver />
    </>
  );
}
