import { TpropostaDto, Tproposta } from "types/Types";

export default function formatarProposta(proposta: Tproposta): TpropostaDto {
    let numeroProposta = proposta.proposta.toString().replaceAll(".", "");
    let cpf = proposta.cpf.replaceAll(".", "").replaceAll("-", "");
    let cep = proposta.cep.replaceAll("-", "");
    let salario = proposta.salario.replaceAll(".", "").replace(",", ".").replaceAll("R$", "");
    let valorSolicitado = proposta.valorSolicitado.replaceAll(".", "").replace(",", ".").replaceAll("R$", "");
    let dataFormatada = new Date(proposta.dataNascimento).toISOString();
    return {
            cliente: {
                cpf: cpf,
                nome: proposta.nome,
                dtNascimento: dataFormatada,
                genero: proposta.genero,
                vlrSalario: parseFloat(salario),
                logradouro: proposta.rua,
                numeroResidencia: proposta.numero,
                bairro: proposta.bairro,
                cidade: proposta.cidade,
                cep: cep
            },
            proposta: Number(numeroProposta),
            conveniada: proposta.conveniada,
            vlr_Solicitado: parseFloat(valorSolicitado),
            prazo: Number(proposta.prazo),
            vlr_Financiado: parseFloat(valorSolicitado)
        };
}