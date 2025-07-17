import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Statistics from "@/components/statistics";
import Testimonials from "@/components/testimonials";
import Resources from "@/components/resources";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Statistics />
      <Testimonials />
      <Resources />
      <Footer />
    </div>
  );
}
