import getSession  from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard(){

  const session = await getSession();
  if(!session){
    redirect("/")
  }

return(
  <div>
    <h1>teste</h1>

    <div className="w-full h-[600] bg-gray-200 mb-10"></div>
    <div className="w-full h-[600] bg-gray-300 mb-10"></div>
    <div className="w-full h-[600] bg-gray-400 mb-10"></div>
  </div>
);
}

