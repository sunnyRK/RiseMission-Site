"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Play } from "lucide-react";

// The demos (≈6 KB) download only when someone taps "Try it".
const DemoSheet = dynamic(() => import("./demo-sheet").then((m) => m.DemoSheet), { ssr: false });

export function TryIt({ slug, name, color }: { slug: string; name: string; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={() => void import("./demo-sheet")}
        aria-haspopup="dialog"
        aria-label={`Try a ${name} demo`}
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-5 text-[0.95rem] font-extrabold shadow-[0_3px_8px_rgb(0_0_0/0.15)] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97] motion-reduce:transform-none"
        style={{ color }}
      >
        <Play aria-hidden className="h-3.5 w-3.5 fill-current" /> Try it
      </button>
      {open && <DemoSheet slug={slug} onClose={() => setOpen(false)} />}
    </>
  );
}
