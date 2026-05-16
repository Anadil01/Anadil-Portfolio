type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-mono text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
