export type Tproposta = {
    proposta: number;
    cpf: string;
    nome: string;
    dataNascimento: string;
    genero: string;
    salario: string;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    conveniada: string;
    prazo: number;
    valorFinanciado: string;
    valorSolicitado: string;
  }

export type TclienteDto = {
        cpf: string,
        nome: string,
        dtNascimento: string,
        genero: string,
        vlrSalario: number
        logradouro: string,
        numeroResidencia: string,
        bairro: string,
        cidade: string,
        cep: string
}

export type TpropostaDto = {
    cliente: TclienteDto;
    proposta: number,
    conveniada: string,
    vlr_Solicitado: number,
    prazo: number,
    vlr_Financiado: number
};

export type TselectOpcao = {
    value: string // conveniada
    label: string // descricao
    disable?: boolean
    hidden?: boolean
    selected?: boolean
}

export type Tconveniada = {
    conveniada: string // conveniada
    descricao: string // descricao
}

export type TretornoPostProposta = {
    erros: []
    retorno: any
    temErros: boolean
}