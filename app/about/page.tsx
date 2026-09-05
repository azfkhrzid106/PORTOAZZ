"use client";

import { motion } from "framer-motion";
import { Eyebrow, PageShell, fadeUp } from "@/components/shared";

export default function AboutPage() {
  return (
    <PageShell>
      <Eyebrow>SYS.ABOUT</Eyebrow>
      <motion.p variants={fadeUp} className="max-w-2xl text-xl leading-relaxed text-[#EDE6D8]">
        Berpengalaman sebagai web developer dengan latar belakang problem
        solving dan kepemimpinan tim. Tertarik mempelajari hal baru dan
        terbiasa beradaptasi lintas domain — dari pengembangan web dan IoT,
        sampai manajemen risiko di lingkungan korporat.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#3E6259]/30 border border-[#3E6259]/30 font-mono text-xs max-w-2xl"
      >
        {[
          ["FOCUS", "Full-Stack"],
          ["BASED", "Yogyakarta, ID"],
          ["EDU", "Informatika, UAD"],
          ["STATUS", "Sep 2022 — Sep 2026"],
        ].map(([label, val]) => (
          <div key={label} className="bg-[#0F1A14] p-4">
            <p className="text-[#8B9C93] mb-1">{label}</p>
            <p className="text-[#EDE6D8]">{val}</p>
          </div>
        ))}
      </motion.div>
    </PageShell>
  );
}