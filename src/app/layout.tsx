import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gym Tracker | Diário de Treino",
  description: "Acompanhe sua evolução de carga na academia.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${barlow.variable} ${barlowCondensed.variable} antialiased selection:bg-primary/20`}>
        <WorkoutProvider>
          {children}
        </WorkoutProvider>
      </body>
    </html>
  );
}
