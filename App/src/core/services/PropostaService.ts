import { Tproposta } from "types/Types";
import { postProposta } from "core/api/APIProposta";
import formatarProposta from "../../utils/formaterProposta";
import { TRetornoAPI, TPropostaDto } from "core/models/Proposta";


export default async function handlerProposta(proposta: Tproposta): Promise<TRetornoAPI> {
    const novaProposta = formatarProposta(proposta);
    const response = await criarProposta(novaProposta)
    return response
};


function criarProposta(propostaDto: TPropostaDto) {
    const response = postProposta(propostaDto);
    console.log(response);
    return response;
}


