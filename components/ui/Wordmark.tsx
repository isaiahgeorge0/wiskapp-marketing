export function Wordmark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/wisk-logo-white.png"
      alt="WISK"
      className={className}
      style={{
        height: "28px",
        width: "auto",
        filter:
          "brightness(0) saturate(100%) invert(93%) sepia(55%) " +
          "saturate(900%) hue-rotate(33deg) brightness(105%)",
      }}
    />
  );
}
