import { api } from 'core/api/APIAxios';
import { TpropostaDto, TretornoPostProposta } from 'types/Types';

export type buscaProp = {
    NumeroProposta: Number,
    Cpf: string | undefined,
    Nome: string
};

export const buscarPropostas = async({NumeroProposta, Cpf, Nome}: buscaProp) => {
    return api.get('/TreinaProposta', {
        params: { NumeroProposta, Cpf, Nome}
    })
    .catch(
        function(error){
            console.log(error);
            return error;
        }
    )
}

export const postProposta = (proposta: TpropostaDto): Promise<TretornoPostProposta> => {
    const response = api.post('/TreinaProposta', 
        proposta
    )
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error.response.data)
        return error.response.data;
    })
    return response;
};