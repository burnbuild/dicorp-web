import Image from "next/image";
import { COMPANY } from "@/lib/company";

type Props = {
  size?: number;
  withWordmark?: boolean;
  locale?: "en" | "ko";
};

export function Logo({ size = 32, withWordmark = true, locale = "en" }: Props) {
  return (
    <span className="inline-flex items-center gap-3">
      <Image
        src="/logo.png"
        alt={`${COMPANY.name.en} logo`}
        width={size}
        height={size}
        priority
        className="rounded-md"
      />
      {withWordmark ? (
        <span className="text-base font-semibold tracking-tight">
          {locale === "ko" ? "디아이코퍼레이션" : COMPANY.name.en}
        </span>
      ) : null}
    </span>
  );
}
