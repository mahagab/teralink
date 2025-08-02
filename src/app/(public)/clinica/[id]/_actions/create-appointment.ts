"use server"

import prisma from "@/lib/prisma"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  date: z.date(),
  time: z.string().min(1, "Time is required"),
  serviceId: z.string().min(1, "Service is required"),
  clinicId: z.string().min(1, "Clinic is required"),
})

type FormSchema = z.infer<typeof formSchema>

export async function createNewAppointment(formData:FormSchema) {

  const schema = formSchema.safeParse(formData)

  if(!schema.success){
    return{
      error: schema.error.issues[0].message
    }
  }

  try{

    const selectedDate = new Date(formData.date)
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day =  selectedDate.getDate();

    const appointmentDate = new Date(Date.UTC(year, month, day, 0,0,0,0))
    const newAppointment = await prisma.appointment.create({
      data:{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        time: formData.time,
        appointmentDate: appointmentDate,
        serviceId: formData.serviceId,
        userId: formData.clinicId  
      }
    })

    return{
      data: newAppointment
    }


  }catch(err){
    console.log(err)
  }
  
}