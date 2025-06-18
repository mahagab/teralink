"use client"
import logoPsi from "../../../../../../public/logo-psi.png"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { CalendarCheck2, CalendarPlus, Folder, List } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


export function SidebarDashboard({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className='flex min-h-screen w-full'>
      
    <aside
      className={clsx("flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
        {"w-20": isCollapsed,
         "w-64": !isCollapsed,
         "hidden md:flex md:fixed":true
        })}>

          <div>
            <Image
            src={logoPsi}
            alt="Logo SaaS"
            />
          </div>

    </aside>

      {/* Header Mobile */}
      <div className={clsx("flex flex-1 flex-col transition-all duration-300", {
        "md:ml-20": isCollapsed,
        "md:ml-64": !isCollapsed
      })}>

        <header className='md:hidden flex items-center 
        justify-between border-b px-2 md:px-6 h-14 z-10 sticky
        top-0 bg-white'>
          <Sheet>
            <div className='flex items-center gap-4'>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='md:hidden'>
                  <List className='w-5 h-5' />
                </Button>
              </SheetTrigger>

              <h1 className='text-base md:text-lg font-semibold'>
                Menu OdontoPRO
              </h1>
            </div>
            <SheetContent side='left' className='sm:max-w-xs p-5 text-txtprimary'>
              <SheetTitle>TeraLink</SheetTitle>
              <SheetDescription>Menu Administrativo</SheetDescription>
              <nav
                className=''>
                <SidebarLink
                  href='/dashboard'
                  label='Agendamentos'
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<CalendarCheck2 className='w-6 h-6' />}
                />
                <SidebarLink
                  href='/dashboard/service'
                  label='Seriços'
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                  icon={<Folder className='w-6 h-6' />}
                />
              </nav>
            </SheetContent>

          </Sheet>
        </header>

        <main className='flex-1 py-4 px-2 md:p-6'>
          {children}
        </main>

      </div>

    </div>
  )
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}


function SidebarLink({ href, icon, isCollapsed, label, pathname }: SidebarLinkProps) {
  return (

    <Link href={href}>
      <div className={clsx('flex items-center gap-2 px-3 py-2 mb-2 rounded-md transition-colors',
        {
          "text-white bg-blue-500": pathname === href,
          "text-txtprimary hover:bg-gray-100": pathname !== href
        })}>
        <span className='w-6 h-6'>{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  )

}