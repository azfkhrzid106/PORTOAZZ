"use client";

import { motion } from "framer-motion";
import { Eyebrow, PageShell, EXPERIENCE, fadeUp } from "@/components/shared";

export default function ExperiencePage() {
  return (
    <PageShell>
      <Eyebrow>SYS.LOG EXPERIENCE</Eyebrow>
      <div className="mt-6 space-y-8">
        {EXPERIENCE.map((e) => (
          <motion.div
            key={e.title}
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8 border-b border-[#3E6259]/20 pb-8"
          >
            <p className="font-mono text-xs text-[#8B9C93]">{e.period}</p>
            <div>
              <h4 className="text-lg text-[#EDE6D8] font-medium">{e.title}</h4>
              <p className="text-sm text-[#C08552] mb-2">{e.org}</p>
              <p className="text-[#8B9C93] leading-relaxed max-w-2xl">{e.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}