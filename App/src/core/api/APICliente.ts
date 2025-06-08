import { api } from 'core/api/APIAxios';
import { aplicarMaskCepApi } from 'utils/masks/masks';

export const buscarCliente = async(cpf: string | undefined)  =>  {
    const response = await api.get('/Cliente', {
        params: {cpf} 
    });
    console.log(response.data);
    if(response.data.retorno)
        return {
            nome: response.data.retorno.nome,
            dataNascimento: response.data.retorno.dtNascimento.substring(0, 10),
            bairro: response.data.retorno.bairro,
            cep: aplicarMaskCepApi(response.data.retorno.cep),
            cidade: response.data.retorno.cidade,
            genero: response.data.retorno.genero,
            rua: response.data.retorno.logradouro,
            numero: response.data.retorno.numeroResidencia.replace(/ /g,''),
        };
    
}