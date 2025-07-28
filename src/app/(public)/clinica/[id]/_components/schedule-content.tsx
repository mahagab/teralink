"use client"

import { MapPin } from "lucide-react"
import Image from "next/image"
import imgTest from "../../../../../../public/professionals/prof2.png"
import type { Prisma } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAppointmentForm, AppointmentFormData } from "./schedule-form"
import { formatPhone } from "@/utils/formatPhone"
import { DateTimePicker } from "./date-picker"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCallback, useEffect, useState } from "react"
import { ScheduleTimeList } from "./schedule-time-list"
import { createNewAppointment } from "../_actions/create-appointment"
import { toast } from "sonner"

export type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true,
    services: true,
  }
}>

interface ScheduleContentProps {
  clinic: UserWithServiceAndSubscription;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export function ScheduleContent({ clinic }: ScheduleContentProps) {
  const form = useAppointmentForm();
  const { watch } = form;

  const selectedDate = watch("date")
  const selectedServiceId = watch("serviceId")

  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [blockedTimes, setBlockedTimes] = useState<string[]>([])

  const fetchBlockedTimes = useCallback(async (date: Date): Promise<string[]> => {
    setLoadingSlots(true);
    try {

      const dateString = date.toISOString().split("T")[0]
      console.log(dateString)
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`)

      const json = await response.json()
      setLoadingSlots(false);
      return json;

    } catch (err) {
      console.log(err)
      setLoadingSlots(false);
      return [];
    }
  }, [clinic.id])

  useEffect(() => {

    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blocked) => {

        setBlockedTimes(blocked);

        const times = clinic.times || [];

        const finalSlots = times.map((time) => ({
          time: time,
          available: !blocked.includes(time)

        }))

      const stillAvailable = finalSlots.find(
        (slot) => slot.time === selectedTime && slot.available
      )

      if(!stillAvailable){
        setSelectedTime("")
      }


        setAvailableTimeSlots(finalSlots)
      })
    }


  }, [selectedDate, clinic.times, fetchBlockedTimes, selectedTime])


  async function handleRegisterAppointment(formData: AppointmentFormData) {
    if(!selectedTime){
      return;
    }

    const response =  await createNewAppointment({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      time: selectedTime,
      date: formData.date,
      serviceId: formData.serviceId,
      clinicId: clinic.id
    })

    if(response?.error){
      toast.error(response.error)
    }

    toast.success("Consulta agendada com sucesso")
    form.reset();
    setSelectedTime("");
  
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-secundaria-200" />

      <section className="container mx-auto px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="w-48 h-48 relative rounded-full overflow-hidden
              border-4 border-white mb-8">
              <Image
                src={clinic.image ? clinic.image : imgTest}
                alt="Imagem da Clínica"
                className="object-cover"
                fill
              />
            </div>
            <h1 className="text-2xl font-bold text-txtprimary mb-1">{clinic.name}</h1>
            <div className="mb-8 flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span>{clinic.address ? clinic.address : "Endereço não informado"}</span>
            </div>
          </article>
        </div>
      </section>

      {/** Form de Agendamento */}

      <section className="max-w-2xl mx-auto w-full mt-6">
        <Form {...form}>
          <form className="mx-2 max-w-2xl space-y-8 bg-white p-6 border rounded-md shadow-sm"
            onSubmit={form.handleSubmit(handleRegisterAppointment)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-semibold text-txtprimary mb-1">Nome Completo:</FormLabel>
                    <FormControl>
                      <Input id="name"
                        placeholder="Digite seu nome completo..."
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-semibold text-txtprimary mb-1">Email:</FormLabel>
                    <FormControl>
                      <Input id="email"
                        placeholder="Digite seu email"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-semibold text-txtprimary mb-1">Telefone:</FormLabel>
                    <FormControl>
                      <Input id="phone"
                        {...field}
                        placeholder="(99) 99999-9999"
                        onChange={(e) => {
                          const formattedPhone = formatPhone(e.target.value)
                          field.onChange(formattedPhone)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center gap-2 space-y-1">
                    <FormLabel className="font-semibold text-txtprimary mb-1">Data do Agendamento:</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        initialDate={new Date()}
                        className="w-full rounded border p-2"
                        onChange={(date) => {
                          if (date) {
                            field.onChange(date)
                            setSelectedTime("")
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="serviceId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-semibold text-txtprimary mb-1">Selecione o Serviço:</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedTime("")
                        }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent >
                          {clinic.services.map((service) => {
                            return (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name} - ({Math.floor(service.duration / 60)}h {service.duration % 60}min )
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {selectedServiceId && (
              <div className="space-y-2">
                <Label className="font-semibold text-txtprimary">Horários Disponíveis: </Label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {loadingSlots ? (
                    <p>Carregando horários</p>
                  ) : availableTimeSlots.length === 0 ? (
                    <p>Nenhum Horário disponível</p>
                  ): (
                    <ScheduleTimeList
                    onSelectTime={(time) => setSelectedTime(time)}
                    clinicTimes={clinic.times}
                    blockedTimes={blockedTimes}
                    availableTimeSlots={availableTimeSlots}
                    selectedTime={selectedTime}
                    selectedDate={selectedDate}
                    requiredSlots={
                      clinic.services.find(service => service.id === selectedServiceId) ? 
                      Math.ceil(clinic.services.find(service => service.id === selectedServiceId)!.duration / 30) : 1
                    }
                    />
                  )}
                </div>
              </div>
            )}

            {clinic.status ? (
              <Button
                type="submit"
                className="bg-secundaria-100 hover:bg-secundaria w-full"
                disabled={!form.watch("name") || !form.watch("email") || !form.watch("phone") ||
                  !form.watch("serviceId") || !form.watch("date")}>
                Relizar Agendamento
              </Button>
            ) : (
              <p className="bg-red-600 text-white rounded-md ttext-center px-4 py-2">Clinica Fechada no momento</p>
            )}

          </form>
        </Form>
      </section>


    </div>
  )
}