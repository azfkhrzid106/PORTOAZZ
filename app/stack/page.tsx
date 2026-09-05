"use client";

import { Eyebrow, PageShell, StackMarquee } from "@/components/shared";

export default function StackPage() {
  return (
    <PageShell>
      <Eyebrow>SYS.STACK</Eyebrow>
      <StackMarquee />
    </PageShell>
  );
}