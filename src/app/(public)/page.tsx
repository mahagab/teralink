import { Footer } from "./_components/footer/page";
import { Header } from "./_components/header/page";
import { Hero } from "./_components/hero/page";
import { Professionals } from "./_components/professionals/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Hero />
        <Professionals />
        <Footer/>
      </div>
    </div>
  );
}
