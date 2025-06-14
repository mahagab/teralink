import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Professional1 from "../../../../../public/professionals/prof1.png"
/*
import Professional2 from "../../../../../public/professionals/prof2.png"
import Professional3 from "../../../../../public/professionals/prof3.png"
import Professional4 from "../../../../../public/professionals/prof4.png"
import Professional5 from "../../../../../public/professionals/prof5.png"
import Professional6 from "../../../../../public/professionals/prof6.png"
*/
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
export function Professionals() {
  return (
    <section className="bg-container-100 py-16">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold text-txtprimary">
          Profissionais
        </h2>
        <p className="text-txtsecundary text-center">
          Aqui estão alguns profissionais
          capacitados para ajudar no momento que precisar
        </p>

        <section className="grid grid-cols-1 gap-6 
    sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-48 p-4">
                <Image
                  src={Professional1}
                  alt="Foto Profissional 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="">
                  <h3 className="font-semibold text-txtprimary">Renata Schmitz</h3>
                  <p className="text-txtsecundary">Consulta Online</p>
                  <p className="text-txtsecundary">Rua Ferraz de Vasconcelos, 1145 - SP</p>
                  </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500">
                </div>
                </div>
                <Link href="/profissional/123"
                className=" w-full py-2 p-4 bg-secundaria
                hover:bg-secundaria-100 text-sm font-medium
                md:text-base
                text-white flex items-center rounded-md">
                Agendar Horário
                <ArrowRight className="ml-2"/>
                </Link>
              </div>
            </CardContent>
          </Card>

        </section>

      </div>

    </section>
  )

}