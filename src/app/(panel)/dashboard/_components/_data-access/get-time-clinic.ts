"use server"

import prisma from "@/lib/prisma"

export async function getTimesClinic({userId}: {userId: string}) {

   if(!userId){
    return {
      times: [],
      userId: userId
    };
  }

  try{

    const user = await prisma.user.findFirst({
      where:{
        id: userId
      },
      select:{
        id: true,
        times: true
      }
    })
    
    if(!userId){
    return {
      times: [],
      userId: ""
    };
  }

  return{
    times: user?.times,
    userId: userId
  }

  }catch(err){
    return {
      err,
      times: [],
      userId: ""
    };
  }

  
}