import { Footer } from "../(dashboard)/_components/footer/page";
import { Header } from "../(dashboard)/_components/header/page";
import { Hero } from "../(dashboard)/_components/hero/page";
import { Professionals } from "../(dashboard)/_components/professionals/page";

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
