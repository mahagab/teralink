import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServicesContent } from "./_components/service-content";
import { Suspense } from "react";
import { LoadingService } from "./_components/loading-service";

export default async function Service(){
    const session = await getSession();
  
    if(!session){
      redirect("/")
    }
  return(
    <div>
      <Suspense fallback={<LoadingService/>}>
      <ServicesContent userId={session.user?.id}/>
      </Suspense>
    </div>
  );

}