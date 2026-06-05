import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { RequestAccess } from "@/components/RequestAccess";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Features />
      <Testimonials />
      <RequestAccess />
      <Footer />
    </main>
  );
}
