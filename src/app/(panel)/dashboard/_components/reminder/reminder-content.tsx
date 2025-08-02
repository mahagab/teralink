"use client"

import { useReminderForm, type ReminderFormData } from "./reminder-form"
import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createReminder } from "../../_actions/create-reminder"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ReminderContentProps{
  closeDialog: () => void;
}

export function ReminderContent({closeDialog}: ReminderContentProps){

  const form = useReminderForm();
  const router = useRouter();

  async function onSubmit(formData: ReminderFormData) {

    const res = await createReminder({description: formData.description})
      if (res.error) {
      toast.error(res.error);
    }

    toast.success(res.data);
    router.refresh();
    closeDialog();

  }

  return(
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
          control={form.control}
          name="description"
          render={({field}) => ( 
              <FormItem>
                <FormLabel className="text-txtprimary font-semibold">Digite o lembrete:</FormLabel>
                <FormControl>
                  <Textarea
                  {...field}
                  placeholder="Digite o lembrete"
                  className="max-h-52"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
          )}
          />
          <Button type="submit" disabled={!form.watch("description")} className="bg-principal-100 hover:bg-principal w-full">
            Criar Lembrete
          </Button>

        </form>
      </Form>
    </div>
  )
}