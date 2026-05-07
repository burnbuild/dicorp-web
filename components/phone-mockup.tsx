import Image from "next/image";

type Props = {
  scale?: number;
  className?: string;
};

// Real iPhone aspect ratio (1320 / 2868 ≈ 0.46)
const FRAME_W = 280;
const FRAME_H = 605;

export function PhoneMockup({ scale = 1, className = "" }: Props) {
  const w = FRAME_W * scale;
  const h = FRAME_H * scale;
  return (
    <div
      className={`relative ${className}`}
      style={{ width: w, height: h }}
      aria-hidden
    >
      {/* outer frame */}
      <div
        className="relative h-full w-full rounded-[44px] bg-neutral-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.04)_inset]"
        style={{ padding: 8 * scale }}
      >
        {/* screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-black">
          <Image
            src="/burnbuild-screen.png"
            alt="BurnBuild app — workout plan with muscles targeted, exercise list, and Start coach's pick"
            fill
            sizes={`${Math.round(w)}px`}
            priority
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
