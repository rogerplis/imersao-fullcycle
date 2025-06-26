import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { User } from "next-auth";
import { baseUrl } from "@/lib/utils";

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
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          return null;
        }
        try {
          const response = await fetch(`${baseUrl}/auth/authenticate`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          if (response.status !== 200) {
            console.log(response, "error");
            return null;
          }
          const authData = await response.json();
          console.log(authData);
          if (!authData.token || !authData.user) {
            return null;
          }
          cookies().set("access_token", authData.token);
          return {
            id: `${authData.user.id}`,
            email: `${authData.user.email}`,
            name: `${authData.user.firstName} ${authData.user.lastName}`,
            image: "",
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
