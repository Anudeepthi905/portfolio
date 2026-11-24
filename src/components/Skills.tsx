import { skills } from "@/data/site";
import { Row, Section } from "./Layout";

export function Skills() {
  return (
    <Section id="skills" title="Skills" className="pb-14 pt-14">
      <div className="space-y-4">
        {skills.map((group) => (
          <Row key={group.name} margin={<h3>{group.name}</h3>}>
            <p className="text-[0.95rem]">
              {group.items.join(", ")}
              {group.note && <span className="text-muted"> ({group.note.replace(/\.$/, "")})</span>}
            </p>
          </Row>
        ))}
      </div>
    </Section>
  );
}
