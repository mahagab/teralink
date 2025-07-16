import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServicesContent } from "./_components/service-content";


export default async function Service(){
    const session = await getSession();
  
    console.log(session)
  
    if(!session){
      redirect("/")
    }
  return(
    <div>
      <ServicesContent userId={session.user?.id}/>
    </div>
  );

}