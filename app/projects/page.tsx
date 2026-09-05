"use client";

import { Eyebrow, PageShell, ProjectCard, PROJECTS } from "@/components/shared";

export default function ProjectsPage() {
  return (
    <PageShell>
      <Eyebrow>SYS.PROJECTS</Eyebrow>
      <div className="space-y-px bg-[#3E6259]/30 border border-[#3E6259]/30 mt-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </PageShell>
  );
}