"use client" 
import { NavItem } from "@/types/nav";
import Link from "next/link"
import { Icons } from "./Icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { signIn,signOut,useSession } from "next-auth/react";
import { buttonVariants } from "./ui/button";



export function MainNav() {
  const { data: session } = useSession();  
  const fullname = session?.user?.name;
    const firstName = fullname ? fullname.split(' ')[0] : '';   
  const items:NavItem[] = [
    {
      title: "dashboard",
      disabled: false,
      href: "/",
      external: false
    },
    {
      title: "produtos",
      disabled: false,
      href: "/products",
      external: false
    },
    {      
      title: "pessoas",
      disabled: false,
      href: "/pessoas",
      external: false
    },
    {
      title: "eventos",
      disabled: false,
      href: "/events",
      external: false
    },
    {
      title: "tarefas",
      disabled: false,
      href: "#",
      external: false
    },
    {
      title: "vendas",
      disabled: false,
      href: "#",
      external: false
    },
  ];
  
  return (
    <div className="flex gap-6 md:gap-18">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6"/>  
        <span className="inline-block font-bold">{siteConfig.name}</span>      
      </Link>
      
      {session?.user? (
        <div className="flex items-start text-lg font-medium">
        <nav className="flex gap-6 ">
          {items.map(
            (item, index) =>  (
                <Link
                  key={index}
                  href={item.href || ""}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                ><div>
                  <span>{item.title}</span>
                  </div>                  
                </Link>
              )
          )          
          }
          <div className="flex items-center justify-end"><p className="text-sky-600">Bem vindo  {firstName}</p></div>   
        </nav>
        <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.sigin className="h-4 w-4 fill-current " onClick={() => signOut()}/>
                <span className="sr-only">SignOut</span>
              </div>
        </div>
      ) : (
        
        <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.sigin className="h-4 w-4 fill-current " onClick={() => signIn()}/>
                <span className="sr-only">Sign</span>
              </div>

      )}
      
    </div>
    
  );
}
