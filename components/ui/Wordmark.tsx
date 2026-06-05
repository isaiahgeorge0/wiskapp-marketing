type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <span
      className={`bg-gradient-to-r from-wisk-purple to-wisk-teal bg-clip-text text-xl font-bold uppercase tracking-[0.2em] text-transparent ${className}`}
    >
      WISK
    </span>
  );
}
