"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export default function LoginForm() {
        const searchParams = useSearchParams()
        const error = searchParams.get('error')

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    signIn("credentials",{
        ...data,
        callbackUrl: '/events'
    })
  }
  return (
    <form
      onSubmit={login}
      className="bg-white p-12 rounded-lg w-96 max-w-full flex flex-col justify-center items-center gap-2"
    >
      <h2 className="text-xl font-bold mb-3">Faça seu Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input input-primary w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input input-primary w-full"
      />
      <button className="btn btn-primary w-full">Login</button>
      {error == "CredentialsSignin" && <div className="text-red-900">Erro no login</div> }
    </form>
  );
}
