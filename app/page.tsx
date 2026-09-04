"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
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
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

// ── DATA ────────────────────────────────────────────────
const STACK = [
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

const PROJECTS = [
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

const EXPERIENCE = [
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

// ── ANIMATION VARIANTS ─────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ── COMPONENTS ──────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      className="font-mono text-xs tracking-[0.25em] uppercase text-[#C08552] mb-3"
    >
      {children}
    </motion.p>
  );
}

function Trace() {
  return (
    <div className="flex justify-center py-2">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-px bg-linear-to-b from-transparent via-[#3E6259] to-transparent"
      />
    </div>
  );
}

// Cursor spotlight yang ngikutin mouse di background
function CursorGlow() {
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

// Card project dengan tilt effect ngikutin posisi mouse
function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
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
      className="bg-[#0F1A14] p-6 md:p-8 hover:bg-[#13221A] transition-colors will-change-transform"
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

// Tombol magnetic — ngikutin cursor pas di-hover
function MagneticButton({
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
      className={
        primary
          ? "px-5 py-2.5 bg-[#C08552] text-[#0F1A14] font-medium text-sm hover:bg-[#EDE6D8] transition-colors inline-block"
          : "px-5 py-2.5 border border-[#3E6259] text-[#EDE6D8] font-medium text-sm hover:border-[#C08552] transition-colors inline-block"
      }
    >
      {children}
    </motion.a>
  );
}

// Marquee logo stack — looping otomatis dari kanan ke kiri
function StackMarquee() {
  const [hoveredStack, setHoveredStack] = useState<string | null>(null);
  // duplikasi array biar loop-nya mulus (seamless)
  const loopStack = [...STACK, ...STACK];

  return (
    <div className="mt-6 overflow-hidden relative">
      {/* fade edge kiri-kanan biar transisinya halus */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-[#0F1A14] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#0F1A14] to-transparent z-10" />

      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loopStack.map(({ name, icon: Icon }, i) => (
          <motion.div
            key={`${name}-${i}`}
            onMouseEnter={() => setHoveredStack(`${name}-${i}`)}
            onMouseLeave={() => setHoveredStack(null)}
            whileHover={{ y: -4, scale: 1.05 }}
            className="flex flex-col items-center justify-center gap-3 border border-[#3E6259]/30 py-6 w-36 shrink-0 transition-colors"
            style={{
              borderColor:
                hoveredStack === `${name}-${i}` ? "rgba(192,133,82,0.6)" : undefined,
            }}
          >
            <motion.div
              animate={{ scale: hoveredStack === `${name}-${i}` ? 1.15 : 1 }}
            >
              <Icon
                className="w-7 h-7 transition-colors"
                style={{
                  color: hoveredStack === `${name}-${i}` ? "#C08552" : "#8B9C93",
                }}
              />
            </motion.div>
            <span className="font-mono text-[10px] text-[#8B9C93] text-center">
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative bg-[#0F1A14] text-[#EDE6D8] min-h-screen selection:bg-[#C08552] selection:text-[#0F1A14]">
      <CursorGlow />

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0F1A14]/80 border-b border-[#3E6259]/30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-sm tracking-wide text-[#EDE6D8]">
            AZRI<span className="text-[#C08552]">.</span>DEV
          </span>
          <div className="flex items-center gap-2 font-mono text-xs text-[#8B9C93]">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#C08552]"
            />
            OPEN TO OPPORTUNITIES
          </div>
        </div>
      </header>

{/* HERO */}
<motion.section
  variants={stagger}
  initial="hidden"
  animate="show"
  className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16"
>
  {/* 3D layer — di belakang teks, di sisi kanan, nggak nutupin konten */}
  <div className="absolute right-0 top-0 w-full md:w-[420px] h-[420px] -z-10 opacity-70 pointer-events-none">
    <Scene />
  </div>

  <Eyebrow>SYS.PROFILE</Eyebrow>
  <motion.h1
    variants={fadeUp}
    className="font-(family-name:--font-display) text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight text-[#EDE6D8]"
  >
    Azri Fakhrezi
    <br />
    <span className="text-[#C08552]">Damanik</span>
  </motion.h1>
  <motion.p
    variants={fadeUp}
    className="mt-6 max-w-xl text-[#8B9C93] text-lg leading-relaxed"
  >
    Mahasiswa Informatika, Universitas Ahmad Dahlan. Membangun sistem
    yang menghubungkan hardware, software, dan data.
  </motion.p>

  <motion.div
    variants={fadeUp}
    className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#3E6259]/30 border border-[#3E6259]/30 font-mono text-xs"
  >
    {[
      ["FOCUS", "Full-Stack"],
      ["BASED", "Yogyakarta, ID"],
      ["EDU", "Informatika, UAD"],
      ["STATUS", "Sep 2022 — Sep 2026"],
    ].map(([label, val]) => (
      <motion.div
        key={label}
        whileHover={{ backgroundColor: "#13221A" }}
        className="bg-[#0F1A14] p-4"
      >
        <p className="text-[#8B9C93] mb-1">{label}</p>
        <p className="text-[#EDE6D8]">{val}</p>
      </motion.div>
    ))}
  </motion.div>

  <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
    <MagneticButton href="#projects" primary>
      Lihat Project
    </MagneticButton>
    <MagneticButton href="#contact">Hubungi Saya</MagneticButton>
  </motion.div>
</motion.section>

      <Trace />

      {/* ABOUT */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-16"
      >
        <Eyebrow>SYS.ABOUT</Eyebrow>
        <motion.p variants={fadeUp} className="max-w-2xl text-xl leading-relaxed text-[#EDE6D8]">
          Berpengalaman sebagai web developer dengan latar belakang problem
          solving dan kepemimpinan tim. Tertarik mempelajari hal baru dan
          terbiasa beradaptasi lintas domain — dari pengembangan web dan IoT,
          sampai manajemen risiko di lingkungan korporat.
        </motion.p>
      </motion.section>

      {/* STACK */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-16 border-t border-[#3E6259]/30"
      >
        <Eyebrow>SYS.STACK</Eyebrow>
        <StackMarquee />
      </motion.section>

      <Trace />

      {/* PROJECTS */}
      <motion.section
        id="projects"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-16"
      >
        <Eyebrow>SYS.PROJECTS</Eyebrow>
        <div className="space-y-px bg-[#3E6259]/30 border border-[#3E6259]/30 mt-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </motion.section>

      <Trace />

      {/* EXPERIENCE */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-16"
      >
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
      </motion.section>

      <Trace />

      {/* CONTACT */}
      <motion.section
        id="contact"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-20"
      >
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
      </motion.section>

      <footer className="relative z-10 border-t border-[#3E6259]/30 py-6">
        <p className="text-center font-mono text-[10px] text-[#8B9C93]">
          BUILT WITH NEXT.JS — {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}