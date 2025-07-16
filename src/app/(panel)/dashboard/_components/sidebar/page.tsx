"use client";
import logoPsi from "../../../../../../public/logo-psi.png";
import logo from "../../../../../../public/face-psi.png";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck2,
  Captions,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-4">

          <div className="flex self-end">
            {!isCollapsed && (

              <Link href="/dashboard">
                <Image src={logoPsi}
                  alt="Logo SaaS"
                  priority
                  quality={100}
                />
              </Link>
            )}
            <Button className="bg-gray-100 hover:bg-gray-400 text-txtprimary self-end mb-2"
              onClick={() => setIsCollapsed(!isCollapsed)}>
              {!isCollapsed ? <ChevronLeft className="w-12 h-12" /> : <ChevronRight className="w-12 h-12" />}
            </Button>
          </div>
          {isCollapsed && (
            <nav className="flex flex-col gap-1 overflow-hidden mt-2">
              <SidebarLink
                href="/dashboard"
                label="Agendamentos"
                pathname={pathname}
                isCollapsed={isCollapsed}
                icon={<CalendarCheck2 className="w-6 h-6" />}
              />
              <SidebarLink
                href="/dashboard/service"
                label="Serviços"
                pathname={pathname}
                isCollapsed={isCollapsed}
                icon={<Folder className="w-6 h-6" />}
              />
               <SidebarLink
                  href="/dashboard/profile"
                  label="Perfil"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<User className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Captions className="w-6 h-6" />}
                />
            </nav>
          )}
          <Collapsible open={!isCollapsed}>
            <CollapsibleContent>
              <nav className="flex flex-col gap-1 overflow-hidden">
                <span className="text-sm text-gray-300 
                font-medium mt-1 uppercase p-4 ">
                  Painel
                </span>
                <SidebarLink
                  href="/dashboard"
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<CalendarCheck2 className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/service"
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Folder className="w-6 h-6" />}
                />
                <span className="text-sm text-gray-300 
                font-medium mt-1 uppercase p-4 ">
                  Ajustes
                </span>
                <SidebarLink
                  href="/dashboard/profile"
                  label="Perfil"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<User className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Captions className="w-6 h-6" />}
                />
              </nav>
            </CollapsibleContent>
          </Collapsible>

        </div>
      </aside>

      {/* Header Mobile */}
      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header
          className="md:hidden flex items-center 
        justify-between border-b px-2 md:px-6 h-14 z-10 sticky
        top-0 bg-white"
        >
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button variant="outline" size="icon"
                className="md:hidden"
                onClick={() => setIsCollapsed(false)}
                >
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <h1 className="text-base md:text-lg font-semibold">
                Menu TeraLink
              </h1>
            </div>
            <SheetContent
              side="left"
              className="sm:max-w-xs p-5 text-txtprimary"
            >
              <Link href="/dashboard" className="text-3xl font-bold text-principal flex">
                <Image className="size-12" src={logo} alt="Logo TeraLink" />
                Tera<span className="text-secundaria">Link</span>
              </Link>

              <SheetTitle>TeraLink</SheetTitle>
              <SheetDescription>Menu Administrativo</SheetDescription>

              <nav className="">
                <SidebarLink
                  href="/dashboard"
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<CalendarCheck2 className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/service"
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Folder className="w-6 h-6" />}
                />
                <SheetDescription>Opções</SheetDescription>
                <SidebarLink
                  href="/dashboard/profile"
                  label="Perfil"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<User className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Captions className="w-6 h-6" />}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  isCollapsed,
  label,
  pathname,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 mb-2 rounded-md transition-colors",
          {
            "text-white bg-blue-500": pathname === href,
            "text-txtprimary hover:bg-gray-100": pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
