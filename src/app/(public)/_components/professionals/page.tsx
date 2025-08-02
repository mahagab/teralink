import {
  Card,
  CardContent
} from "@/components/ui/card"
import Image from "next/image"
import Professional1 from "../../../../../public/professionals/prof1.png"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { User } from "@prisma/client"

interface ProfessionalsProps {
  professionals: User[]
}


export function Professionals({ professionals }: ProfessionalsProps) {

  return (
    <section className="bg-gray-50 py-16">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center mb-12 font-bold">
          Clinicas disponíveis
        </h2>

        <section
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >

          {professionals.map((clinic) => (
            <Card className="overflow-hidden hover:shadow-lg duration-300" key={clinic.id}>
              <CardContent className="p-0">
                <div>
                  {/* Changed from fixed h-48 to an aspect ratio container */}
                  {/* Using pt-[56.25%] for a 16:9 aspect ratio (height is 56.25% of width) */}
                  {/* You can adjust this percentage for other aspect ratios, e.g., pt-[75%] for 4:3, pt-[100%] for 1:1 */}
                  <div className="relative pt-[56.25%] w-full">
                    <Image
                      src={clinic.image ?? Professional1}
                      alt="Foto da clinica"
                      fill
                      className="object-cover absolute inset-0" // Add absolute inset-0 to fill the padded parent
                    />
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {clinic.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {clinic.address ?? "Endereço não informado."}
                      </p>
                    </div>

                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  </div>

                  <Link
                    href={`/clinica/${clinic.id}`}
                    className="w-full bg-principal-100 hover:bg-principal text-white flex items-center justify-center py-2 rounded-md text-sm md:text-base font-medium"
                  >
                    Agendar horário
                    <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}

        </section>


      </div>

    </section>
  )
}