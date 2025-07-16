"use client";

import { useState } from "react";
import logo from "../../../../../public/face-psi.png";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChartColumnBig, LogIn, Menu } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { handleRegister } from '@/app/(public)/_actions/login'


export function Header() {

  const { data: session, status } = useSession();

  async function handleLogin() {
    await handleRegister("github")
  }


  const navItens = [{ href: "/profissionais", label: "Profissionais" }];


  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      {navItens.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className="bg-transparent hover:bg-transparent text-black shadow-none text-base"
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
      {status === 'loading' ? (
        <></>
      ) : session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center text-base
          bg-secundaria text-white p-2
          rounded-md hover:bg-secundaria-100"
        >
          Painel da Clínica
          <ChartColumnBig className="w-6 h-6 ml-3 " />
        </Link>
      ) : (
        <Button onClick={handleLogin}>
          <LogIn />
          Login
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-header">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-principal flex">
          <Image className="size-12" src={logo} alt="Logo TeraLink" />
          Tera<span className="text-secundaria">Link</span>
        </Link>

        <nav className="hidden md:flex items-center">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="text-black hover: bg-transparent"
              variant="ghost"
              size="icon"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px] p-4 z-[9999]"
          >
            <SheetTitle className="p-0">Menu</SheetTitle>
            <SheetDescription>O que você procura está aqui</SheetDescription>

            <nav className="flex flex-col space-y-4 mt-6">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
