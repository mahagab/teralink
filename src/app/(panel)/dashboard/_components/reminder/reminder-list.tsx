"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Reminder } from "@prisma/client"
import { Plus, Trash } from "lucide-react"
import { deleteReminder } from "../../_actions/delete-reminder"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { DialogContent, DialogHeader, Dialog, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { ReminderContent } from "./reminder-content"
import { useState } from "react"

interface ReminderListProps {
  reminder: Reminder[]
}


export function ReminderList({ reminder }: ReminderListProps) {

  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  async function handleDeleteReminder(id: string) {
    const res = await deleteReminder({ reminderId: id })
    if (res.error) {
      toast.error(res.error)
    }
    toast.success(res.data)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold text-txtprimary">
            Lembretes
          </CardTitle>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-9 h-9 p-0" size="sm">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Lembrete</DialogTitle>
                <DialogDescription>Criar um novo lembrete para sua lista</DialogDescription>
              </DialogHeader>
            <ReminderContent closeDialog={() => setOpenDialog(false)}/>
            </DialogContent>

          </Dialog>


        </CardHeader>
        <CardContent>
          {reminder.length === 0 && (
            <p className="text-sm text-txtsecundary">
              Nenhum lembrete registrado...
            </p>
          )}
          <ScrollArea className="h-[calc(100vh-25rem)] lg:h-[calc(100vh-20rem)] pr-0 w-full flex-1">
            {reminder.map((item) => {
              return (
                <article key={item.id}
                  className="flex flex-wrap flex-row items-center justify-between
              py-2 bg-yellow-50 mb-2 px-2 rounded-md">
                  <p className="text-sm lg:text-base">{item.description}</p>
                  <Button size="icon" className=" bg-red-500 hover:bg-red-400 rounded-full p-2"
                    onClick={() => handleDeleteReminder(item.id)}>
                    <Trash className="w-3 h-3" />
                  </Button>
                </article>
              )
            })}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )

}