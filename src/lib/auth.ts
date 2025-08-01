import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import  prisma  from "./prisma"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [GitHub],
})