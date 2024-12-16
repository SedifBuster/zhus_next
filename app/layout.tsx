import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Журнал учета нежелательных событий при осуществлении медицинской деятельности",
  description: "КГБУЗ «ВЛАДИВОСТОКСКАЯ КЛИНИЧЕСКАЯ БОЛЬНИЦА № 4»",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

  //оптимизировать страницу таблицы придумать что то с кол-вом получаемых случаев
  //графики? https://ui.shadcn.com/docs/components/chart
  //прогресс бар при загрузке страницы https://ui.shadcn.com/docs/components/progress

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} overflow-y-scroll h-[100vh]`}>
        <main className="flex min-h-screen flex-col">
          <Header/>
          {children}
        </main>
        <Toaster theme="light"/>
      </body>
    </html>
  );
}