export type EventModel = {
    id: string;
    name: string;
    organization: string;
    date: string;
    price: number;
    rating: string;
    image_url: string;
    location: string;
};

export type SpotModel = {
    id: string;
    name: string;
    status: string;
}


export type PessoaModel = {
    id: number;
    nome: string;
    idade: number;
    cpf: string;
    rg: string;
    sexo: string;
    email: string;
    cep: string;
    endereco: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    celular: string;
    cor: string;
}

export type Produto = {
    id: number;
    descricao: string;
    price: number;
    sku: string;
}