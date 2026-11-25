import { howIWork, type Tint } from "@/data/site";
import { Section, tintBg } from "./Section";

const stepTints: Tint[] = ["sky", "rose", "peach", "mint"];

export function HowIWork() {
  const steps = howIWork.steps;
  return (
    <Section id="how-i-work" num={3} title="How I work">
      <p className="max-w-[680px] text-lg text-text">{howIWork.intro}</p>

      <ol className="relative mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
        {steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-4 md:block">
            {/* Line to the next badge: down on mobile, across on desktop. */}
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-8 left-[18px] top-9 w-px bg-border md:bottom-auto md:left-9 md:-right-6 md:top-[18px] md:h-px md:w-auto"
              />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-[13px] text-text ring-4 ring-bg ${
                tintBg[stepTints[i % stepTints.length]!]
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="md:mt-5">
              <h3 className="pt-1.5 font-heading text-lg font-semibold tracking-tight text-text md:pt-0">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
