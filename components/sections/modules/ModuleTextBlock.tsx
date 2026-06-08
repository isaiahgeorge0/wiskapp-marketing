type ModuleTextBlockProps = {
  eyebrow: string;
  headline: string;
  body: string;
};

export function ModuleTextBlock({ eyebrow, headline, body }: ModuleTextBlockProps) {
  return (
    <div className="max-w-md">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-purple-300/70">
        {eyebrow}
      </p>
      <h3 className="mb-5 text-2xl font-bold leading-[1.2] tracking-tight text-white md:text-3xl lg:text-4xl">
        {headline}
      </h3>
      <p className="text-base leading-relaxed text-white/60 md:text-lg">
        {body}
      </p>
    </div>
  );
}
