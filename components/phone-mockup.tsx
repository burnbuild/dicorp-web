type Props = {
  scale?: number;
  className?: string;
};

export function PhoneMockup({ scale = 1, className = "" }: Props) {
  const w = 280 * scale;
  const h = 580 * scale;
  return (
    <div
      className={`relative ${className}`}
      style={{ width: w, height: h }}
      aria-hidden
    >
      {/* phone outer frame */}
      <div
        className="absolute inset-0 rounded-[44px] bg-gradient-to-b from-neutral-900 to-neutral-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.04)_inset]"
        style={{ padding: 8 * scale }}
      >
        {/* screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-white">
          {/* notch */}
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* screen content — abstract BurnBuild ui */}
          <div className="absolute inset-0 flex flex-col p-5 pt-10">
            {/* status row */}
            <div className="flex items-center justify-between text-[9px] font-semibold tracking-wide text-neutral-700">
              <span>9:41</span>
              <span className="flex gap-1">
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
              </span>
            </div>

            {/* greeting */}
            <div className="mt-6">
              <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                Today
              </p>
              <h3 className="mt-1 text-[18px] font-bold tracking-tight text-neutral-900">
                Day 14.
                <br />
                <span className="bg-gradient-to-br from-[#69a5a4] to-neutral-900 bg-clip-text text-transparent">
                  Easy on yourself.
                </span>
              </h3>
            </div>

            {/* big number ring */}
            <div className="mt-5 flex items-center gap-3">
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(from -90deg, #b0d643 0deg, #b0d643 240deg, rgba(176,214,67,0.2) 240deg)",
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <span className="text-[14px] font-bold text-neutral-900">
                    67%
                  </span>
                </div>
              </div>
              <div className="text-[10px] leading-tight text-neutral-500">
                <p className="font-semibold text-neutral-900">Weekly target</p>
                <p>4 of 6 sessions</p>
              </div>
            </div>

            {/* habit list */}
            <ul className="mt-5 space-y-2">
              {[
                { label: "Morning stretch", done: true, mins: "8m" },
                { label: "Strength training", done: true, mins: "32m" },
                { label: "Walk · 6,000 steps", done: false, mins: "—" },
              ].map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between rounded-xl bg-neutral-100/80 px-3 py-2"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold ${
                        row.done
                          ? "bg-[#b0d643] text-neutral-900"
                          : "border border-neutral-300 text-neutral-400"
                      }`}
                    >
                      {row.done ? "✓" : ""}
                    </span>
                    <span className="text-[10px] font-medium text-neutral-800">
                      {row.label}
                    </span>
                  </span>
                  <span className="text-[9px] tabular-nums text-neutral-400">
                    {row.mins}
                  </span>
                </li>
              ))}
            </ul>

            {/* sparkline */}
            <div className="mt-5 rounded-xl bg-neutral-50 p-3">
              <p className="text-[9px] uppercase tracking-wider text-neutral-400">
                Last 30 days
              </p>
              <svg
                viewBox="0 0 200 50"
                className="mt-2 h-9 w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="bb-spark" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#b0d643" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#b0d643" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 38 L20 32 L40 36 L60 28 L80 30 L100 22 L120 26 L140 18 L160 22 L180 12 L200 16 L200 50 L0 50 Z"
                  fill="url(#bb-spark)"
                />
                <path
                  d="M0 38 L20 32 L40 36 L60 28 L80 30 L100 22 L120 26 L140 18 L160 22 L180 12 L200 16"
                  fill="none"
                  stroke="#8fb52e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
