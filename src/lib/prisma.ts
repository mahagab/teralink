import {PrismaClient } from "../../node_modules/@prisma/client";

let prisma: PrismaClient;


if(process.env.NODE_ENV === 'production'){
  prisma = new PrismaClient();

}else{
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  }
  if(!globalWithPrisma.prisma){
    globalWithPrisma.prisma = new PrismaClient();
  }

  prisma = globalWithPrisma.prisma;
}

export default prisma;
