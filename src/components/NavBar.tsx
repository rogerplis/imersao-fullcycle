"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


export function Navbar() {
  const { data: session } = useSession();  
  const fullname = session?.user?.name;
  const firstName = fullname ? fullname.split(' ')[0] : '';

 


  return (
    <div className="flex max-w-full items-center justify-center justify-items-stretch rounded-2xl bg-[#10232a] px-6 py-2 shadow-nav">
      <div className="flex grow items-center justify-center">
        
        {session?.user?(<><Link href="/events">
          <Image
            src="/next.svg"
            alt="Icone DevTicket"
            width={136}
            height={48}
            className="max-h-[48px]" />
        </Link>
        <Link href="/pessoas">
        <Image
            src="/persons.svg"
            alt="Grupo de pessoas"
            width={24}
            height={24} />

        </Link>
        </>
      ):(<Link href="/">
          <Image
            src="/next.svg"
            alt="Icone DevTicket"
            width={136}
            height={48}
            className="max-h-[48px]"
          />
        </Link>)}       
        
      </div>
      <div className="ml-auto flex gap-2">
      
        {session?.user?(
          <>
            <p className="text-sky-600">Bem vindo  {firstName}</p>
            <button className="text-red-500" onClick={() => signOut()}>
            <Image
            src="/logout.svg"
            alt="Icone DevTicket"
            width={136}
            height={48}
            className="max-h-[48px]"
          />
           Sign Out
            </button>
          </>
        ) : (
            <button className="text-red-500" onClick={() => signIn()}>
             <Image
            src="/login.svg"
            alt="Icone DevTicket"
            width={136}
            height={48}
            className="max-h-[48px]"
          />
           Sign In
            </button>
        )}
      </div>
      <Link
        href={"/checkout"}
        className="min-h-6 min-w-6 grow-0 items-center"
      />
      <Image
        src="/menu.svg"
        alt="Icone de Carrinho"
        width={24}
        height={24}
      />
    </div>
  );
}
