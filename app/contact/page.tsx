"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Eyebrow, PageShell, fadeUp } from "@/components/shared";

export default function ContactPage() {
  return (
    <PageShell>
      <Eyebrow>SYS.CONTACT</Eyebrow>
      <motion.h2
        variants={fadeUp}
        className="text-4xl md:text-5xl font-medium max-w-lg leading-tight"
      >
        Mari terhubung dan diskusikan project berikutnya.
      </motion.h2>
      <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 font-mono text-sm">
        {[
          { href: "mailto:azridamanik111@gmail.com", icon: Mail, label: "azridamanik111@gmail.com" },
          { href: "https://bit.ly/LINKEDINAZRI", icon: null, label: "bit.ly/LINKEDINAZRI" },
          { href: "tel:+6281267088981", icon: Phone, label: "+62 812-6708-8981" },
        ].map((c) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            whileHover={{ x: 6 }}
            className="flex items-center gap-3 text-[#EDE6D8] hover:text-[#C08552] transition-colors w-fit"
          >
            {c.icon ? (
              <c.icon className="w-4 h-4" />
            ) : (
              <span className="w-4 h-4 flex items-center justify-center font-mono text-xs">in</span>
            )}
            {c.label}
          </motion.a>
        ))}
      </motion.div>
    </PageShell>
  );
}