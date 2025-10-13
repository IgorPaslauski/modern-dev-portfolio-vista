import { useEffect, useState } from "react";
import { SkillDto } from "../../lib/entities/SkillDto";
import SkillCard from "./SkillCard";
import SkillCardSkeleton from "./SkillCardSkeleton";

export default function SkillsSection() {
  const [skills, setSkills] = useState<SkillDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/skills.json`);
      const data: SkillDto[] = await res.json();
      setSkills(data);
      setLoading(false);
    })();
  }, []);

  return (
    <section id="skills" className="bg-secondary/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Minhas <span className="gradient-text">Habilidades</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tecnologias e ferramentas com as quais tenho experiência e competência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading
            ? Array.from({ length: 4 }, (_, i) => <SkillCardSkeleton key={i} />)
            : skills.map((s) => <SkillCard key={s.id} {...s} />)}
        </div>
      </div>
    </section>
  );
}
