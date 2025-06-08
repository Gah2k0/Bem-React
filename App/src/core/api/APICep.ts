import { api } from 'core/api/APIAxios';

export const buscarCep = async(cep: string) => {
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`)
    return response.data;
};