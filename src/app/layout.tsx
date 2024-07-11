import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/NavBar";
import Provider from "./Provider";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-scren bg-background font-sans antialiased", fontSans.variable)}
      >
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>          
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader/>            
            {children}
          </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
