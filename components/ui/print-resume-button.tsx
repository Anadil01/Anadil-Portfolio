"use client";

export default function PrintResumeButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-accent hover:text-accent-strong"
    >
      Print / Save as PDF
    </button>
  );
}
