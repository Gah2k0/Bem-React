import { Tproposta } from "types/Types";
import { gerarNumeroProposta } from "utils/geradorNumeroProposta";

export const initialStateProposta: Tproposta = {
    proposta: gerarNumeroProposta(),
    cpf: "",
    cep: "",
    nome: "",
    dataNascimento: "",
    genero: "",
    salario: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    conveniada: "",
    prazo: 0,
    valorFinanciado: "",
    valorSolicitado: ""
}