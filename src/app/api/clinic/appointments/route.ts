import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

/**
 * 
 * Rota para buscar todos os agendamentos de uma clínica
 * 
 * Preciso de data
 * Preciso do id da clínica 
 */

 
export const GET = auth(async function GET(req) {
  if (!req.auth){
    return NextResponse.json({error: "Acesso Negado"},{status: 401})
  }

  const searchParams = req.nextUrl.searchParams;
  const dateString = searchParams.get("date") as string;
  const clinicId = req.auth?.user?.id

    if (!dateString){
    return NextResponse.json({error: "Data incorreta ou não informada"},{status: 400})
  }

    if (!clinicId){
    return NextResponse.json({error: "Usuário não encontrado"},{status: 400})
  }

  try{

    const [year, month, day] = dateString.split("-").map(Number)
    const startDate = new Date(Date.UTC(year, month -1, day, 0, 0,0, 0))
    const endDate =  new Date(Date.UTC(year, month -1, day, 23, 59,59, 999))

    const appointments = await prisma.appointment.findMany({
      where:{
        userId: clinicId,
        appointmentDate:{
          gte: startDate,
          lte: endDate
        }
      },
      include:{
        service: true
      }
    })

    return NextResponse.json(appointments)
  }catch(err){
    return NextResponse.json({err, error: "Usuário não encontrado"},{status: 400})
  }

})