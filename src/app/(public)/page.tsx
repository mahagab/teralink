import { Footer } from "./_components/footer/page";
import { Header } from "./_components/header/page";
import { Hero } from "./_components/hero/page";
import { Professionals } from "./_components/professionals/page";
import { getProfessionals } from "./data-access/get-professionals";

export const revalidate = 120;

export default async function Home() {

  const professionals = await getProfessionals();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Hero />
        <Professionals professionals={professionals || []}/>
        <Footer/>
      </div>
    </div>
  );
}
