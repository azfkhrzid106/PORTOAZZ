"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import {
  SiNextdotjs,
  SiLaravel,
  SiVuedotjs,
  SiPython,
  SiMysql,
  SiRaspberrypi,
  SiSqlite,
  SiGoogleads,
  SiGoogleanalytics,
} from "react-icons/si";
import { ArrowUpRight } from "lucide-react";

// ── DATA ────────────────────────────────────────────────
export const STACK = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Laravel", icon: SiLaravel },
  { name: "Vue.js", icon: SiVuedotjs },
  { name: "Python", icon: SiPython },
  { name: "MySQL", icon: SiMysql },
  { name: "Raspberry Pi", icon: SiRaspberrypi },
  { name: "SQLite", icon: SiSqlite },
  { name: "Google Ads", icon: SiGoogleads },
  { name: "Google Analytics", icon: SiGoogleanalytics },
];

export const PROJECTS = [
  {
    id: "01",
    title: "Smart Drawer System (STORVA)",
    role: "IoT & Full-Stack Developer",
    period: "Jun 2025 — Now",
    desc: "Sistem manajemen laci lab yang menghubungkan dashboard admin Laravel 12 (role-based access, Google OAuth domain-restricted) dengan aplikasi HMI berbasis Python Flet di Raspberry Pi — autentikasi RFID via MQTT, local caching SQLite, sinkron real-time lewat REST API ke MySQL.",
    tags: ["Laravel", "Python/Flet", "Raspberry Pi", "MQTT", "REST API"],
  },
  {
    id: "02",
    title: "Risk Management System — INALUM",
    role: "Fullstack Developer (Internal Project)",
    period: "Jul 2025 — Nov 2025",
    desc: "Membangun sistem berbasis web untuk Divisi Manajemen Risiko PT INALUM menggunakan Laravel dan Vue.js, meningkatkan efisiensi pengelolaan data risiko dan digitalisasi dokumentasi internal lintas divisi.",
    tags: ["Laravel", "Vue.js", "Risk Management"],
  },
  {
    id: "03",
    title: "Website & Media Sosial Prodi",
    role: "Student Employee — MH Department",
    period: "Sep 2024 — Jul 2025",
    desc: "Mengelola website prodi (uptime, aksesibilitas, SEO) sekaligus strategi konten dan kampanye media sosial — memantau engagement rate, reach, dan impressions untuk evaluasi performa.",
    tags: ["Web Management", "SEO", "Content Strategy"],
  },
];

export const EXPERIENCE = [
  {
    period: "Jul 2025 — Nov 2025",
    title: "Risk Management Intern",
    org: "PT Indonesia Asahan Aluminium (INALUM)",
    desc: "Identifikasi, analisis, dan evaluasi risiko operasional lintas departemen; mendukung penyusunan risk register dan risk assessment di lingkungan BUMN.",
  },
  {
    period: "Jun 2023 — Des 2023",
    title: "Paid Ads Manager",
    org: "Freelance — Yogyakarta",
    desc: "Mengelola kampanye Google Ads, optimasi CPC/CTR/konversi, A/B testing, dan pelaporan performa untuk rekomendasi strategi digital marketing.",
  },
  {
    period: "Sep 2024 — Jul 2025",
    title: "Student Employee, MH Department",
    org: "Universitas Ahmad Dahlan",
    desc: "Pengelolaan website dan media sosial program studi, dari pembuatan konten hingga analisis kinerja kampanye.",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/stack", label: "Stack" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

// ── ANIMATION ───────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Wrapper transisi antar halaman — fade + slide + scale tiap kali pathname berubah
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.985 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ── SHARED COMPONENTS ───────────────────────────────────
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      className="font-mono text-xs tracking-[0.25em] uppercase text-[#C08552] mb-3"
    >
      {children}
    </motion.p>
  );
}

export function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 30, stiffness: 200 });
  const springY = useSpring(y, { damping: 30, stiffness: 200 });

  return (
    <motion.div
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: useTransform(
          [springX, springY],
          ([px, py]) =>
            `radial-gradient(600px circle at ${px}px ${py}px, rgba(192,133,82,0.06), transparent 40%)`
        ) as any,
      }}
    />
  );
}

// Blob gradasi yang melayang pelan di background tiap halaman
export function AmbientBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full bg-[#C08552]/10 blur-[110px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", left: "5%" }}
      />
      <motion.div
        className="absolute w-[360px] h-[360px] rounded-full bg-[#3E6259]/15 blur-[100px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "5%", right: "8%" }}
      />
    </div>
  );
}

export function MagneticButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  const isInternal = href.startsWith("/") || href.startsWith("#");

  const className = primary
    ? "px-5 py-2.5 bg-[#C08552] text-[#0F1A14] font-medium text-sm hover:bg-[#EDE6D8] transition-colors inline-block"
    : "px-5 py-2.5 border border-[#3E6259] text-[#EDE6D8] font-medium text-sm hover:border-[#C08552] transition-colors inline-block";

  if (isInternal && !href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 6);
    rx.set(-py * 6);
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      whileHover={{ scale: 1.015, boxShadow: "0 20px 60px -20px rgba(192,133,82,0.25)" }}
      className="bg-[#0F1A14] p-6 md:p-8 hover:bg-[#13221A] transition-colors will-change-transform rounded-lg"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono text-xs text-[#C08552] mb-2">
            {p.id} — {p.period}
          </p>
          <h3 className="text-2xl font-medium text-[#EDE6D8]">{p.title}</h3>
          <p className="text-sm text-[#8B9C93] mt-1">{p.role}</p>
        </div>
        <motion.div whileHover={{ x: 4, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
          <ArrowUpRight className="w-5 h-5 text-[#3E6259] shrink-0 mt-1" />
        </motion.div>
      </div>
      <p className="mt-4 max-w-2xl text-[#EDE6D8]/80 leading-relaxed">{p.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] px-2 py-1 border border-[#3E6259]/50 text-[#8B9C93]"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function StackMarquee() {
  const [hoveredStack, setHoveredStack] = useState<string | null>(null);
  const loopStack = [...STACK, ...STACK];

  return (
    <div className="mt-6 overflow-hidden relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-[#0F1A14] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#0F1A14] to-transparent z-10" />

      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {loopStack.map(({ name, icon: Icon }, i) => (
          <motion.div
            key={`${name}-${i}`}
            onMouseEnter={() => setHoveredStack(`${name}-${i}`)}
            onMouseLeave={() => setHoveredStack(null)}
            whileHover={{ y: -4, scale: 1.05 }}
            className="flex flex-col items-center justify-center gap-3 border border-[#3E6259]/30 py-6 w-36 shrink-0 transition-colors"
            style={{
              borderColor: hoveredStack === `${name}-${i}` ? "rgba(192,133,82,0.6)" : undefined,
            }}
          >
            <motion.div animate={{ scale: hoveredStack === `${name}-${i}` ? 1.15 : 1 }}>
              <Icon
                className="w-7 h-7 transition-colors"
                style={{ color: hoveredStack === `${name}-${i}` ? "#C08552" : "#8B9C93" }}
              />
            </motion.div>
            <span className="font-mono text-[10px] text-[#8B9C93] text-center">{name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Nav bar dipakai di semua halaman (home + subpage)
export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0F1A14]/80 border-b border-[#3E6259]/30">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm tracking-wide text-[#EDE6D8]">
          AZRI<span className="text-[#C08552]">.</span>DEV
        </Link>
        <nav className="flex items-center gap-5 font-mono text-xs">
          {NAV_LINKS.filter((l) => l.href !== "/").map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition-colors ${
                pathname === l.href
                  ? "text-[#C08552]"
                  : "text-[#8B9C93] hover:text-[#EDE6D8]"
              }`}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative bg-[#0F1A14] text-[#EDE6D8] min-h-screen selection:bg-[#C08552] selection:text-[#0F1A14] overflow-hidden">
      <AmbientBlobs />
      <CursorGlow />
      <SiteNav />
      <PageTransition>
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-5xl mx-auto px-6 py-20"
        >
          {children}
        </motion.section>
      </PageTransition>
      <footer className="relative z-10 border-t border-[#3E6259]/30 py-6 mt-12">
        <p className="text-center font-mono text-[10px] text-[#8B9C93]">
          ---------------------------- — {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}