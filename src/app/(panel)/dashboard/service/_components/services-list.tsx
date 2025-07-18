"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Pencil, Plus, X } from "lucide-react";
import { DialogService } from "./dialog-service";
import type { Service } from "@prisma/client";
import { formatCurrency } from "@/utils/formtCurrency";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServicesListProps {
  services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<null | Service>(null)

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId: serviceId })

    if (response.error) {
      toast(response.error)
      return;
    } else {
      toast.success(response.data)
    }
  }

  function handleEditService(service: Service){
    setEditingService(service);
    setDialogOpen(true);
  }

  function handleOpenNewServiceModal() {
    setEditingService(null); 
    setDialogOpen(true);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl md:text-2xl font-bold">Serviços</CardTitle>
            <DialogTrigger asChild>
              <Button
                className=" bg-secundaria-100 hover:bg-secundaria"
                onClick={handleOpenNewServiceModal} 
              >
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault();
                setDialogOpen(false);
                setEditingService(null); 
              }}>
              <DialogService
                closeModal={() => {
                  setDialogOpen(false);
                  setEditingService(null);
                }}
                serviceId={editingService ? editingService.id: undefined}
                initialValues={editingService ? {
                  name: editingService.name,
                  price: (editingService.price / 100).toFixed(2).replace(".", ","),
                  hours: Math.floor(editingService.duration / 60).toString(),
                  minutes: (editingService.duration % 60).toString()
                }: undefined}
              />
            </DialogContent>
          </CardHeader>
          <CardContent>
            <section className="space-y-4 mt-5">
              {services.map(service => {
                return (
                  <article key={service.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-txtprimary">{service.name}</span>
                      <span className="text-txtsecundary">-</span>
                      <span className="text-txtsecundary">{formatCurrency((service.price / 100))}</span>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditService(service)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </article>
                )
              })}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  )
}