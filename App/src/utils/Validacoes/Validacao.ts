import { Tproposta } from "types/Types";
import { validarCliente } from "./ValidacaoCliente";
import { validarProposta } from "./ValidacaoProposta";

type TErros = {
    cliente: string[],
    proposta: string[],
    temErros: boolean
};

export function validarDadosProposta(proposta: Tproposta): TErros {
    let erros = { 
        cliente: validarCliente(proposta), 
        proposta: validarProposta(proposta),
        temErros: false
    };
    if(erros.cliente.length + erros.proposta.length > 0) erros.temErros = true;
    return erros;
}