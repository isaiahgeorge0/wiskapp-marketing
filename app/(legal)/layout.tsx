import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
