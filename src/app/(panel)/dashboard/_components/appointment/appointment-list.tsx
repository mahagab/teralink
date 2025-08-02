"use client"

import { useSearchParams } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import type { Prisma } from "@prisma/client"
import { Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cancelAppointment } from "../../_actions/cancel-appointment"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DialogAppointment } from "./dialog-appointment"
import { ButtonDate } from "./button-date"

interface AppointmentListProps {
  times: string[]
}

export type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true,
  }
}>

export function AppointmentList({ times }: AppointmentListProps) {

  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [detailAppointment, setDetailAppointment] = useState<AppointmentWithService | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-appointments", date],
    queryFn: async () => {

      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), "yyyy-MM-dd")
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`
      const response = await fetch(url)

      const json = await response.json() as AppointmentWithService[];

      console.log(json)

      if (!response.ok) {
        return []
      }

      return json
    },
    staleTime: 20000,
    refetchInterval: 300000
  })

  const occupantMap: Record<string, AppointmentWithService> = {}

  // array de objetos com slot e appointment
  if (data && data.length > 0) {
    for (const appointment of data) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30);

      const startIndex = times.indexOf(appointment.time);


      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const slotIndex = startIndex + i

          if (slotIndex < times.length) {
            occupantMap[times[slotIndex]] = appointment;
          }
        }
      }
    }

  }

  async function handleCancelAppointment(appointmentId:string) {

    const response = await cancelAppointment({appointmentId: appointmentId})

    if(response.error){
      toast.error(response.error)
    }

    queryClient.invalidateQueries({queryKey: ["get-appointments"]})
    await refetch() 
    toast.success(response.data)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl md:text-2xl text-txtprimary font-bold">Agendamentos</CardTitle>
        <ButtonDate/>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-25rem)] lg:h-[calc(100vh-20rem)]">
          {isLoading ? (
            <p>Carrgando agenda...</p>
          ) : (
            times?.map((slot) => {

              const occupant = occupantMap[slot]

              if (occupant) {
                return (
                  <div
                    key={slot}
                    className="flex items-center py-2 border-t last:border-b"
                  >
                    <div className="w-16 font-semibold text-sm text-txtprimary">{slot}</div>
                    <div className=" flex-1 text-sm">
                      <div className="text-txtprimary font-semibold">
                        {occupant.name}
                      </div>
                      <div className="text-txtsecundary">
                        {occupant.phone}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="flex">
                        <DialogTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => setDetailAppointment(occupant)}>
                          <Eye className="w-5 h-5" />
                        </Button>
                        </DialogTrigger>
                        <Button onClick={() => handleCancelAppointment(occupant.id)} size="icon" variant="ghost">
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={slot}
                  className="flex items-center py-2 border-t last:border-b"
                >
                  <div className="w-16 font-medium text-sm text-txtprimary">{slot}</div>
                  <div className="text-txtsecundary flex-1 text-sm">Disponível</div>
                </div>
              )
            })
          )}
        </ScrollArea>
      </CardContent>
    </Card>

    <DialogAppointment appointment={detailAppointment}/>
    
    </Dialog>
  )
}