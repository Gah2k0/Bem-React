import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'core/api/APIAxios';
import { AutenticarUsuario } from 'core/api/APIUsuario';

export const AutenticacaoContext = createContext();

export const AutenticacaoProvider = ({children}) => {
    const navigate = useNavigate();
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ erros, setErros ] = useState("");

    useEffect(() => {
        const usuarioRecuperado = sessionStorage.getItem('usuario');
        const token = sessionStorage.getItem('token');

        if(usuarioRecuperado) {
            setUser(JSON.parse(usuarioRecuperado));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);

    const login = async (usuario, senha) => {
        // console.log(usuario, senha);

        const response = await AutenticarUsuario(usuario, senha)
            .catch(error => {
                 setErros(error.response.data.erros);
                });

        const usuarioLogado = response.data.retorno;
        const token = usuarioLogado.token;

        sessionStorage.setItem('usuario', JSON.stringify(usuarioLogado));
        sessionStorage.setItem('token', token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        setUser({usuarioLogado});
        navigate("/");
        
    };

    const logout = () => {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('token');
        api.defaults.headers.Authorization = null;
        setErros("");
        setUser(null);
        navigate("/login");
    }

    return (
            <AutenticacaoContext.Provider 
                value=
                {
                    { 
                        autenticado: !!user,
                        user,
                        loading,
                        erros,
                        login,
                        logout
                     }
                }
            >
                {children}
            </AutenticacaoContext.Provider>
    )
}