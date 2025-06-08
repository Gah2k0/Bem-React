import { TclienteDto } from "types/Types";

export type TPropostaBuscada = {
    Nome: string,
    Cpf: string
    NumeroProposta: string,
}

export type TPropostaRetorno = {
    proposta: number,
    cpf: string,
    nome: string,
    vlrFinanciado: number,
    prazo: number,
    situacao: string
}

export type TPropostaDto = {
    cliente: TclienteDto;
    proposta: number,
    conveniada: string,
    vlr_Solicitado: number,
    prazo: number,
    vlr_Financiado: number
};

export type TRetornoAPI = {
    erros: []
    retorno: any
    temErros: boolean
}