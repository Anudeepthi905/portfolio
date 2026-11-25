import { skills } from "@/data/site";
import { Mono, Section, tintBg } from "./Section";

export function Skills() {
  return (
    <Section id="skills" num={5} title="Skills">
      <div className="space-y-8">
        {skills.map((group) => (
          <div key={group.name}>
            <h3>
              <Mono>{group.name}</Mono>
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className={`chip rounded-full px-3 py-1 text-[14px] text-text hover:brightness-95 dark:hover:brightness-125 ${tintBg[group.tint]}`}
                >
                  {item}
                </li>
              ))}
            </ul>
            {group.note && <p className="mt-3 text-[14px] text-muted">({group.note})</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}
