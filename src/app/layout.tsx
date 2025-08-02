import "./globals.css";
import { SessionAuthProvider } from '@/components/session-auth'
import { Toaster } from 'sonner'
export const metadata = {
  title: "TeraLink",
  icons: {
    icon: "/favicon.svg", // ou .png ou .svg se for o caso
  },
};

import { QueryClientContext } from "@/providers/queryclient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionAuthProvider>
          <QueryClientContext>
          <Toaster/>
          {children}
          </QueryClientContext>
        </SessionAuthProvider>

      </body>
    </html>
  );
}
