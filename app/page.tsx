"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  SiNextdotjs,
  SiLaravel,
  SiVuedotjs,
  SiPython,
  SiRaspberrypi,
  SiGithub,
} from "react-icons/si";
import { NAV_LINKS } from "@/components/shared";

const FLOATING_ICONS = [
  { Icon: SiNextdotjs, top: "10%", left: "6%", size: 40, delay: 0, depth: 30 },
  { Icon: SiGithub, top: "8%", left: "82%", size: 42, delay: 0.4, depth: -20 },
  { Icon: SiLaravel, top: "38%", left: "88%", size: 46, delay: 0.8, depth: 40 },
  { Icon: SiVuedotjs, top: "62%", left: "4%", size: 38, delay: 1.2, depth: -30 },
  { Icon: SiPython, top: "78%", left: "85%", size: 40, delay: 1.6, depth: 25 },
  { Icon: SiRaspberrypi, top: "48%", left: "3%", size: 34, delay: 2, depth: -15 },
];

export default function Home() {
  // posisi mouse relatif ke tengah layar, dipakai untuk parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  // foto & glow bergerak halus berlawanan arah cursor (efek depth)
  const photoX = useTransform(sx, [-1, 1], [-14, 14]);
  const photoY = useTransform(sy, [-1, 1], [-10, 10]);
  const textX = useTransform(sx, [-1, 1], [10, -10]);
  const textY = useTransform(sy, [-1, 1], [6, -6]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth) * 2 - 1);
    my.set((e.clientY / innerHeight) * 2 - 1);
  }

  return (
    <main
      onPointerMove={handlePointerMove}
      className="relative h-screen w-screen overflow-hidden bg-[#0F1A14] text-[#EDE6D8]"
    >
      {/* ── NAMA — melayang DI BELAKANG foto (z paling rendah) ── */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="absolute inset-0 z-0 flex flex-col justify-center pl-6 md:pl-14"
      >
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="max-w-xl"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#C08552] mb-3">
            Full-Stack Developer
          </p>
          <h1 className="text-6xl md:text-9xl font-semibold leading-[0.9] tracking-tight text-[#EDE6D8]/90">
            Azri
          </h1>
          <h2 className="text-4xl md:text-7xl italic font-light text-[#EDE6D8]/70 mt-1">
            Fakhrezi
          </h2>
          <p className="mt-6 max-w-md text-[#8B9C93] text-sm md:text-base leading-relaxed">
            Mahasiswa Informatika, Universitas Ahmad Dahlan. Membangun sistem
            yang menghubungkan hardware, software, dan data.
          </p>
        </motion.div>
      </motion.div>

      {/* ── FOTO — di depan teks (z lebih tinggi), sedikit parallax ── */}
      <motion.div
        style={{ x: photoX, y: photoY }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <img
          src="/hero-photo.png"
          alt="Azri Fakhrezi Damanik"
          className="w-full h-full object-cover object-[65%_15%] opacity-55"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 30%, black 55%, black 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 30%, black 55%, black 100%)",
          }}
        />
        {/* tint gelap tipis biar warna nyatu dengan palet */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A14] via-transparent to-[#0F1A14]/60" />
      </motion.div>

      {/* ── glow blobs, ikut parallax dikit ── */}
      <motion.div
        style={{ x: useTransform(sx, [-1, 1], [-8, 8]), y: useTransform(sy, [-1, 1], [-8, 8]) }}
        className="absolute right-10 top-1/3 w-[420px] h-[420px] rounded-full bg-[#C08552]/20 blur-[120px] z-[5] pointer-events-none"
      />
      <div className="absolute left-1/3 bottom-0 w-[300px] h-[300px] rounded-full bg-[#3E6259]/25 blur-[100px] z-[5] pointer-events-none" />

      {/* ── floating tech icons — parallax dengan "depth" beda-beda ── */}
      {FLOATING_ICONS.map(({ Icon, top, left, size, delay, depth }, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top,
            left,
            x: useTransform(sx, [-1, 1], [-depth, depth]),
            y: useTransform(sy, [-1, 1], [-depth, depth]),
          }}
          className="z-20 hidden md:flex items-center justify-center rounded-2xl bg-[#0F1A14]/60 border border-[#3E6259]/40 backdrop-blur-sm p-3"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon style={{ width: size * 0.5, height: size * 0.5 }} className="text-[#C08552]" />
        </motion.div>
      ))}

      {/* ── top nav ── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 py-6">
        <span className="font-mono text-sm tracking-wide">
          AZRI<span className="text-[#C08552]">.</span>DEV
        </span>
        <nav className="flex items-center gap-5 font-mono text-xs">
          {NAV_LINKS.filter((l) => l.href !== "/").map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#8B9C93] hover:text-[#C08552] transition-colors"
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── status badge kanan bawah ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 right-8 z-30 flex items-center gap-2 font-mono text-[10px] text-[#8B9C93]"
      >
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-[#C08552]"
        />
        OPEN TO OPPORTUNITIES
      </motion.div>
    </main>
  );
}