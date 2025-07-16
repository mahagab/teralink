import getSession  from "@/lib/getSession";
import { redirect } from "next/navigation";
import { getUserData } from "./data-access/get-info-user";
import {ProfileContent} from "./_components/profile";

export default async function Profile(){
  const session = await getSession();

  console.log(session)

  if(!session){
    redirect("/")
  }

  const user = await getUserData({userId: session.user?.id})
  console.log(user)
  return(
    <ProfileContent user={user}/>
  )

}