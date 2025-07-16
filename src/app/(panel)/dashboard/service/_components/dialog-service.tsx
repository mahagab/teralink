"use client"

import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useDialogServiceForm } from "./service-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export function DialogService() {

  const form = useDialogServiceForm()

  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>
          Adicione um novo serviço
        </DialogDescription>
        <Form {...form}>
          <form className="space-y-2">
            <div className=" flex flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="font-semibold">
                      Nome do serviço:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o nome do serviço" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="font-semibold">
                      Valor do serviço:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o preço do serviço" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <p>Tempo de Duração do Serviço</p>
            <div className="grid grid-cols-2 gap-3">
               <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="font-semibold">
                      Horas:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="1"
                      min='0'
                      type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                             <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="font-semibold">
                      Minutos:
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="0"
                      min='0'
                      type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <Button type="submit" className="w-full font-semibold text-white bg-secundaria hover:bg-secundaria-100">
                Adicionar Serviço
            </Button>
          </form>
        </Form>
      </DialogHeader>
    </>
  )
}