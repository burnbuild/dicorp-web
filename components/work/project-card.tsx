type Props = {
  name: string;
  tagline: string;
  description: string;
  status: string;
  platforms: string;
};

export function ProjectCard({
  name,
  tagline,
  description,
  status,
  platforms,
}: Props) {
  return (
    <article className="group relative grid gap-8 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.07)] md:grid-cols-[2fr_3fr] md:gap-14 md:p-14">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(176,214,67,0.4), transparent 70%)",
        }}
      />
      <header className="relative">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {name}
        </h2>
        <p className="mt-3 text-base text-[var(--color-fg-muted)]">{tagline}</p>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-2)] px-3 py-1 text-xs text-[var(--color-accent-2)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
          {status}
        </span>
        <p className="mt-3 text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
          {platforms}
        </p>
      </header>
      <p className="relative text-lg leading-relaxed">{description}</p>
    </article>
  );
}
