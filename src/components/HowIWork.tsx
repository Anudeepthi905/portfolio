import { howIWork } from "@/data/site";
import { ArrowDown, NumberCircle } from "./Doodles";
import { Row, Section } from "./Layout";

export function HowIWork() {
  const last = howIWork.steps.length - 1;
  return (
    <Section id="how-i-work" title="How I work" className="pb-16 pt-2">
      <Row>
        <p className="text-lg">{howIWork.intro}</p>
        <ol className="mt-8">
          {howIWork.steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4">
              <div className="flex flex-col items-center">
                <NumberCircle n={i + 1} />
                {i < last && <ArrowDown className="my-1 h-9 w-4" />}
              </div>
              <div className={i < last ? "pb-5" : ""}>
                <h3 className="pt-1 font-serif text-lg font-medium">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-0.5 text-[0.95rem]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Row>
    </Section>
  );
}
