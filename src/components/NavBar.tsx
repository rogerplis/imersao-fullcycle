"use client";
import LoginForm from "@/app/api/page";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


export function Navbar() {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className="flex max-w-full items-center justify-center justify-items-stretch rounded-2xl bg-[#10232a] px-6 py-2 shadow-nav">
      <div className="flex grow items-center justify-center">
        <Link href="/">
          <Image
            src="/next.svg"
            alt="Icone DevTicket"
            width={136}
            height={48}
            className="max-h-[48px]"
          />
        </Link>
      </div>
      <div className="ml-auto flex gap-2">
        {session?.user ?(
          <>
            <p className="text-sky-600">{session.user?.email}</p>
            <button className="text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
            <button className="text-red-500" onClick={() => signIn()}>
              Sign In
            </button>
        )}
      </div>
      <Link
        href={"/checkout"}
        className="min-h-6 min-w-6 grow-0 items-center"
      />
      <Image
        src="/cart-outline.svg"
        alt="Icone de Carrinho"
        width={24}
        height={24}
      />
    </div>
  );
}
