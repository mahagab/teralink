// /app/api/chart/weekly-appointments/route.ts
import  prisma from "@/lib/prisma";
import { startOfWeek, endOfWeek } from "date-fns";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }

  const today = new Date();

  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });     

  const appointments = await prisma.appointment.findMany({
    where: {
      userId,
      appointmentDate: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
  });
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const result = Array(7).fill(0).map((_, index) => {
    const count = appointments.filter(
      (a) => new Date(a.appointmentDate).getDay() === index
    ).length;

    return {
      day: weekDays[index],
      current: count,
      average: Math.floor(count * 0.6),
    };
  });

  return Response.json(result);
}
