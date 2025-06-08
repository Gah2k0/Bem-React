import { Tproposta } from "types/Types";
import { testaCPFValido } from "utils/Validacoes/ValidacaoCpf";
import { isNullOrEmpty } from "utils/Validacoes/ValidacaoNullOrEmpty";

export function validarCliente(proposta: Tproposta): Array<string> {
    let erros = [];
    if(!testaCPFValido(proposta.cpf))erros.push("cpf");
    if(isNullOrEmpty(proposta.nome))erros.push("nome");
    if(isNullOrEmpty(proposta.dataNascimento))erros.push("dataNascimento");
    let dataNascimentoFormatada = new Date(proposta.dataNascimento).getFullYear();
    if(dataNascimentoFormatada > new Date().getFullYear())erros.push("dataNascimento");
    if(!validarIdade(dataNascimentoFormatada))erros.push("dataNascimento")
    if(isNullOrEmpty(proposta.genero) || proposta.genero === "Selecionar")erros.push("genero");
    if(isNullOrEmpty(proposta.salario) || proposta.salario === "R$")erros.push("salario");
    if(isNullOrEmpty(proposta.cep))erros.push("cep");
    if(isNullOrEmpty(proposta.rua))erros.push("rua");
    if(isNullOrEmpty(proposta.bairro))erros.push("bairro");
    if(isNullOrEmpty(proposta.cidade))erros.push("cidade");
    if(isNullOrEmpty(proposta.numero))erros.push("numero");
    if(isNullOrEmpty(proposta.uf))erros.push("uf");
    return erros;
}

export function validarNome(nome:string) {
    return isNullOrEmpty(nome) && nome.length > 0;
}

function validarIdade(dataNascimento: number): boolean {
    let dataAtual = new Date().getFullYear();
    let idadeCliente = dataAtual - dataNascimento;
    console.log(idadeCliente);
    return idadeCliente >= 18;
}

