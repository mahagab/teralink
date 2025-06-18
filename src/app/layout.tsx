import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "TeraLink",
  icons: {
    icon: "/favicon.svg", // ou .png ou .svg se for o caso
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
