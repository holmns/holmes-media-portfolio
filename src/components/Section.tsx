type SectionProps = {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-border py-20 sm:py-28">
      <header className="mb-10 flex items-baseline gap-4 sm:mb-14">
        <span className="font-mono text-xs text-muted">{index}</span>
        <h2 className="text-sm uppercase tracking-[0.25em] text-muted">{title}</h2>
      </header>
      {children}
    </section>
  );
}
