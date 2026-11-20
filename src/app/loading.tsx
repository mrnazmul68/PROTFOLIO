export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6" role="status" aria-live="polite">
        <span className="text-2xl font-semibold tracking-[-0.05em] text-white">
          Nazmul<span className="text-accent">.</span>
        </span>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <span className="block h-full w-1/2 animate-[loading-bar_1.4s_ease-in-out_infinite] bg-accent" />
        </div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
