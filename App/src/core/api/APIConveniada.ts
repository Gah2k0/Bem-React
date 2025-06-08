import { api } from 'core/api/APIAxios';

export const buscarConveniadas = async() => {
    return api.get('/Conveniada')
}