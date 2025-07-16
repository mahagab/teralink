import { getAllServices } from "../data-acess/get-all-services";
import { ServicesList } from "./services-list";

interface ServicesContentProps{
  userId: string;
}


export async function ServicesContent({userId}: ServicesContentProps) {

  const services = await getAllServices({userId: userId})

    console.log("Serviços do content aqui: ",services)
  return(
    <ServicesList/>
  )
}