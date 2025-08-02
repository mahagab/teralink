import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { AppointmentWithService } from "./appointment-list";
import { Banknote, Calendar, Clock, FolderOpen, Mail, Phone, User } from "lucide-react";

interface DialogAppointmentProps{
  appointment: AppointmentWithService | null
}

export function DialogAppointment({appointment} : DialogAppointmentProps){
  return(
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhes do agendamento</DialogTitle>
        <DialogDescription>Veja todos os detalhes deste agendamento</DialogDescription>
      </DialogHeader>
      {appointment && (
        <article className="p-2 ">
          <p className="flex"><Clock className="mr-2" /><span className="font-bold text-txtprimary mr-1">Horário Agendado:</span> {appointment.time}</p>
          <p className="flex"><Calendar className="mr-2 mb-5" /><span className="font-bold text-txtprimary mr-1">Data do Agendamento:</span> {new Intl.DateTimeFormat('pt-BR', {
            timeZone: "UTC",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          }).format(new Date(appointment.appointmentDate))}</p>

          <p className="flex"><User className="mr-2"/><span className="font-bold text-txtprimary mr-1">Nome do paciente:</span> {appointment.name}</p>
          <p className="flex"><Phone className="mr-2"/><span className="font-bold text-txtprimary mr-1">Telefone:</span> {appointment.phone}</p>
          <p className="flex"><Mail className="mr-2 mb-5"/><span className="font-bold text-txtprimary mr-1">Email:</span> {appointment.email}</p>

          <p className="flex"><FolderOpen className="mr-2" /><span className="font-bold text-txtprimary mr-1">Serviço:</span> {appointment.service.name}</p>
          <p className="flex"><Banknote className="mr-2" /><span className="font-bold text-txtprimary mr-1">Valor do Serviço:</span> R$ {(appointment.service.price / 100)}</p>
        </article>
      )}
    </DialogContent>
  )
}