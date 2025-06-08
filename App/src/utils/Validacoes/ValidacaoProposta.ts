import { Tproposta } from "types/Types";
import { isNullOrEmpty } from "utils/Validacoes/ValidacaoNullOrEmpty";

export function validarProposta(proposta: Tproposta): Array<string> {
    let erros = [];
    if(isNullOrEmpty(proposta.conveniada) || proposta.conveniada === "Selecionar")erros.push("conveniada");
    if(!proposta.prazo || proposta.prazo <= 0)erros.push("prazo");
    let valorSolicitado = proposta.valorSolicitado.replaceAll(".", "").replace(",", ".").replaceAll("R$", "");
    if(Number(valorSolicitado) <= 0)erros.push("Valor solicitado Inválido");
    if(isNullOrEmpty(proposta.valorSolicitado) || proposta.valorSolicitado === "R$")erros.push("Valor solicitado Inválido");
    return erros;
}