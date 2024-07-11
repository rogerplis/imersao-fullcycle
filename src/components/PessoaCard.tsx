import { PessoaModel } from '@/types/Model';
import Link from 'next/link';
import React from 'react';

export type PessoaCardProps = {
    pessoa: PessoaModel
}

function PessoaCard(props: PessoaCardProps){  
    return (
      
        <Link href={`pessoas/pessoa-layout/${props.pessoa.id}/`} >
        <div className="flex w-[277px] flex-col rounded-2xl bg-secondary">        
          <img src={"/person.svg"} alt={props.pessoa.nome}/>
          <div className="flex flex-col gap-y-2 px-4 py-6">            
            <p className="font-semibold">{props.pessoa.nome}</p>
            <p className="text-sm font-normal">{props.pessoa.email}</p>
            <p className="text-sm font-normal">{props.pessoa.cidade}/{props.pessoa.estado}</p>
          </div>
        </div>
        </Link>
    )
}

export default PessoaCard;