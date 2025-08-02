"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";

const formSchema = z.object({
  appointmentId: z.string().min(1, "É necessário fornecer um agendamento"),
});

type FormSchema = z.infer<typeof formSchema>;

export async function cancelAppointment(formData: FormSchema) {
  const schema = formSchema.safeParse(formData);
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Falha ao cancelar o agendamento",
    };
  }

  if (!schema.success) {
    return {
      error: schema.error.issues[0]?.message,
    };
  }

  try {

    await prisma.appointment.delete({
      where:{
        id: formData.appointmentId,
        userId: session.user.id
      }
    })
    revalidatePath("/dashboard")
    return{
      data: "Agendamento deletado com sucesso"
    }

  } catch (err) {
    return {
      error: "Não foi possível deletar a tarefa",
      err,
    };
  }
}
