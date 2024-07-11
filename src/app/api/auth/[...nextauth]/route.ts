import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: "/api",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        try {
          const response = await fetch("http://127.0.0.1/auth/login", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          if (response.status !== 200) return null;
          const authData = await response.json();
          console.log(authData);
          if (!authData.access_token || !authData.user) return "Sem usuario";
          cookies().set("access_token", authData.access_token);
          return {
            id: `${authData.user.id}`,
            email: `${authData.user.email}`,
            name: `${authData.user.nome}`,
            image: ''
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
