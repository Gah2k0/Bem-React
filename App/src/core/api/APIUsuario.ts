import { api } from 'core/api/APIAxios';

export const AutenticarUsuario = async(usuario: string, senha:string) => {
    return api.post('/Autenticacao', { usuario, senha })
}