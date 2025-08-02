"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import {z} from "zod"
import { auth } from "@/lib/auth"

const formSchema = z.object({
  description: z.string()
  .min(1, "A descrição do lembrete é obrigatória")
})

type FormSchema = z.infer<typeof formSchema>


export async function createReminder(formData: FormSchema) {

const schema = formSchema.safeParse(formData)
  const session = await auth();
  if (!session?.user?.id) {
    return{
      error: "Falha ao cadastrar lembrete"
    }
  }

if(!schema.success){
  return{
    error: schema.error.issues[0].message
  }
}
  
  try{

    await prisma.reminder.create({
      data:{
        description: formData.description,
        userId: session?.user?.id
      }
    })

    revalidatePath("/dashboard")

    return{
      data: "Lembrete criado com sucesso"
    }

  }catch(err){
    return{
      error:"Não foi possível criar a tarefa", err
    }
  }


}