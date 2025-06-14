import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImg from "../../../../../public/banner.png"

export function Hero() {
  return (
    <section className=" bg-banner">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">

        <main className="flex items-center justify-center">
          <article className="space-y-8 max-w-xl flex flex-col justify-center">
            <h1 className="font-bold text-4xl lg:text-5xl text-txtprimary
            max-w-2xl tracking-tight">Encontre o apoio que você busca</h1>
            <p className="text-txtsecundary text-base md:text-lg">
              Oferecemos um caminho simples para você cuidar da
              sua saúde mental. Com apenas alguns cliques,
              você pode agendar sua consulta e dar o primeiro
              passo rumo ao bem-estar.
            </p>
            <Button className="p-6 text-white m-8
             bg-secundaria hover:bg-secundaria-100 w-fit font-semibold">
              Agendar Consulta
            </Button>
          </article>
          <div className="hidden lg:block">
            <Image src={doctorImg}
              alt="Doctor Banner"
              className="object-contain"
              quality={100}
              priority

            />
          </div>
        </main>

      </div>
    </section>
  )

}