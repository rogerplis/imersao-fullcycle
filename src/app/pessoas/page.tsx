/* eslint-disable @next/next/no-async-client-component */
"use client";
import { PessoaModel } from "@/types/Model";
import PessoaCard from "@/components/PessoaCard";
import Title from "@/components/Title";
import { getCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Produtos() {
  
  let [pessoas, setPessoas] = useState<PessoaModel[]>([]);

  // Recupera o JWT dos cookies
  const jwt = getCookie("access_token");

  // Função para buscar as pessoas da API
  async function getPessoas() {
    try {
      let response = await fetch("http://127.0.1/api/v1/pessoas", {
        headers: {
          Authorization: `Bearer ${jwt}`, // Inclui o token JWT no cabeçalho da requisição
        },
      });
      if (response.status === 401) {
        await signOut();
      }

      if (!response.ok) {
        // Trata erros de resposta da API
        console.error(`HTTP error! status: ${response.status}`);
        return [];
      }

      let data = await response.json();
      return data;
    } catch (error) {
      // Trata erros de rede ou outros erros de fetch
      console.error("Fetch error:", error);
      return [];
    }
  }

  // Hook para buscar as pessoas quando o componente é montado
  useEffect(() => {
    getPessoas().then((data) => {
      setPessoas(data);
    });
  }, []);
  
  return (
<main className="mt-10 flex flex-col">
      <Title>Pessoas Cadastradas</Title>
      <div className="mt-8 sm:grid flex flex-wrap justify-center gap-x-2 gap-y-4">
        {
          pessoas.map((pessoa) => (            
            <PessoaCard key={pessoa.id} pessoa={pessoa}/>
          ))
        }
      </div>
    </main>
    
  );
}
