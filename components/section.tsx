import type { ReactNode, HTMLAttributes } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div" | "main";
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function Section({
  children,
  className = "",
  innerClassName = "",
  as: Tag = "section",
  ...rest
}: Props) {
  return (
    <Tag className={`relative overflow-hidden ${className}`} {...rest}>
      <div
        className={`mx-auto max-w-[1080px] px-6 py-20 md:px-8 md:py-28 ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
