"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  SiNextdotjs,
  SiLaravel,
  SiVuedotjs,
  SiPython,
  SiRaspberrypi,
  SiGithub,
} from "react-icons/si";
import { NAV_LINKS } from "@/components/shared";

type FloatingIconData = {
  Icon: IconType;
  top: string;
  left: string;
  size: number;
  delay: number;
  depth: number;
};

const FLOATING_ICONS: FloatingIconData[] = [
  { Icon: SiNextdotjs, top: "16%", left: "46%", size: 40, delay: 0, depth: 30 },
  { Icon: SiGithub, top: "14%", left: "88%", size: 42, delay: 0.4, depth: -20 },
  { Icon: SiLaravel, top: "42%", left: "92%", size: 46, delay: 0.8, depth: 40 },
  { Icon: SiVuedotjs, top: "70%", left: "50%", size: 38, delay: 1.2, depth: -30 },
  { Icon: SiPython, top: "76%", left: "88%", size: 40, delay: 1.6, depth: 25 },
  { Icon: SiRaspberrypi, top: "52%", left: "56%", size: 34, delay: 2, depth: -15 },
];

/**
 * Hook (useTransform) tidak boleh dipanggil di dalam .map() atau inline di JSX,
 * jadi tiap ikon dibuat sebagai komponen sendiri.
 * Parallax (wrapper luar) dan animasi melayang (wrapper dalam) dipisah
 * supaya tidak saling menimpa properti `y`.
 */
function FloatingIcon({
  Icon,
  top,
  left,
  size,
  delay,
  depth,
  index,
  sx,
  sy,
  reduce,
}: FloatingIconData & {
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduce: boolean;
}) {
  const x = useTransform(sx, [-1, 1], [-depth, depth]);
  const y = useTransform(sy, [-1, 1], [-depth, depth]);

  return (
    <motion.div
      style={{ top, left, x, y }}
      className="absolute z-20 hidden md:block"
      aria-hidden
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{
          duration: 4 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="flex items-center justify-center rounded-2xl border border-[#3E6259]/40 bg-[#0F1A14]/60 p-3 backdrop-blur-sm"
      >
        <Icon
          style={{ width: size * 0.5, height: size * 0.5 }}
          className="text-[#C08552]"
        />
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const reduce = useReducedMotion() ?? false;

  // posisi mouse relatif ke tengah layar (-1 sampai 1), dipakai untuk parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const photoX = useTransform(sx, [-1, 1], [-14, 14]);
  const photoY = useTransform(sy, [-1, 1], [-10, 10]);
  const textX = useTransform(sx, [-1, 1], [10, -10]);
  const textY = useTransform(sy, [-1, 1], [6, -6]);
  const glowX = useTransform(sx, [-1, 1], [-8, 8]);
  const glowY = useTransform(sy, [-1, 1], [-8, 8]);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce) return;
    mx.set((e.clientX / window.innerWidth) * 2 - 1);
    my.set((e.clientY / window.innerHeight) * 2 - 1);
  }

  return (
    <main
      onPointerMove={handlePointerMove}
      className="relative h-dvh w-full overflow-hidden bg-[#0F1A14] text-[#EDE6D8]"
    >
      {/* ── NAMA: di belakang foto ── */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="absolute inset-0 z-0"
      >
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="max-w-xl"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[#C08552]">
              Full-Stack Developer
            </p>
            <h1 className="text-7xl font-semibold leading-[0.9] tracking-tight text-[#EDE6D8]/90 md:text-9xl">
              Azri
            </h1>
            <p className="mt-2 text-4xl font-light italic text-[#EDE6D8]/70 md:text-7xl">
              Fakhrezi
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#8B9C93] md:text-base">
              Mahasiswa Informatika, Universitas Ahmad Dahlan. Membangun sistem
              yang menghubungkan hardware, software, dan data.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── FOTO: di depan teks, sedikit parallax ── */}
      <motion.div
        style={{ x: photoX, y: photoY }}
        className="pointer-events-none absolute inset-0 z-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-photo.png"
          alt="Azri Fakhrezi Damanik"
          className="h-full w-full object-cover object-[65%_15%] opacity-40 md:opacity-55"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 30%, black 55%, black 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 30%, black 55%, black 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A14] via-transparent to-[#0F1A14]/60" />
      </motion.div>

      {/* ── glow ── */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute right-10 top-1/3 z-[5] h-[420px] w-[420px] rounded-full bg-[#C08552]/20 blur-[120px]"
      />
      <div className="pointer-events-none absolute bottom-0 left-1/3 z-[5] h-[300px] w-[300px] rounded-full bg-[#3E6259]/25 blur-[100px]" />

      {/* ── ikon teknologi (hanya desktop) ── */}
      {FLOATING_ICONS.map((item, i) => (
        <FloatingIcon
          key={i}
          {...item}
          index={i}
          sx={sx}
          sy={sy}
          reduce={reduce}
        />
      ))}

      {/* ── navigasi atas ── */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <span className="font-mono text-sm tracking-wide">
            AZRI<span className="text-[#C08552]">.</span>DEV
          </span>
          <nav className="flex items-center gap-4 font-mono text-[11px] sm:gap-6 sm:text-xs">
            {NAV_LINKS.filter((l) => l.href !== "/").map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[#8B9C93] transition-colors hover:text-[#C08552] focus-visible:text-[#C08552] focus-visible:outline-none"
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── bawah: tombol aksi (kiri) + status (kanan) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute inset-x-0 bottom-0 z-30"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-[#C08552] px-5 py-2.5 text-sm font-medium text-[#0F1A14] transition-colors hover:bg-[#d39a68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EDE6D8]"
            >
              Lihat proyek
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[#3E6259] px-5 py-2.5 text-sm text-[#EDE6D8] transition-colors hover:border-[#C08552] hover:text-[#C08552] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EDE6D8]"
            >
              Hubungi saya
            </Link>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-[#8B9C93]">
            <motion.span
              animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-[#C08552]"
            />
            OPEN TO OPPORTUNITIES
          </div>
        </div>
      </motion.div>
    </main>
  );
}