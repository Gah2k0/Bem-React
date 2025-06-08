import React, { FormEvent, useState, useContext, useEffect } from 'react';
import styles from './Login.module.css';
import classNames from 'classnames';
import { AutenticacaoContext } from 'contexts/autenticacao';


export default function LoginPage() {
    const { login, erros } = useContext(AutenticacaoContext);
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [ lembrar, setLembrar ] = useState("");

    const handleChange = () => {
        if(lembrar)
            setLembrar("");
        else
            setLembrar("Sim");
    }

    useEffect(() => {
        const usuario = localStorage.getItem("lembrar");
        if(usuario)
            setUsuario(usuario);
    },[]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        lembrar ? localStorage.setItem("lembrar", usuario) : localStorage.removeItem("lembrar");
        login(usuario, senha)
    }
    
    return (
        <div className={styles.body}>
            <form className={styles.fundo} onSubmit={handleSubmit}>
                <img src="./assets/img/logo-bem.jpg" alt="" className={styles.logo} />
                <h1 className={styles["texto-login"]}><strong>Para acessar</strong>, faça seu login:</h1>
                <input 
                    type="text" 
                    name="username" 
                    className={classNames({[styles.username]: true, [styles["input-login"]]: true, [styles["input-erro"]]: erros})}
                    id="username" 
                    placeholder="Seu Email" 
                    value={usuario}
                    onChange={(usuario) => setUsuario(usuario.target.value)}
                    required
                />
                <input 
                    type="password" 
                    name="password"
                    className={classNames({[styles.password]: true, [styles["input-login"]]: true, [styles["input-erro"]]: erros})}
                    id="password" 
                    placeholder="Sua Senha" 
                    value={senha}
                    onChange={(senha) => setSenha(senha.target.value)}
                    required
                />

                <small 
                    className={classNames({
                        [styles.erro]: erros
                    })}
                >
                    {erros[0]}
                </small>
                <div className={styles["wrap-lembrar"]}>
                    <input 
                        type="checkbox" 
                        name="lembrar" 
                        id="toggle" 
                        value={lembrar}
                        onChange={handleChange}
                        className={classNames({
                            [styles.juntos]: true,
                             [styles.toggle]: true
                             })}
                     />
                    <label htmlFor="toggle" className={styles.juntos}></label>
                    <label htmlFor="toggle" className={styles.lembrar}> Lembrar-me</label>
                </div>
                <a href="www.google.com" className={classNames({[styles.juntos]: true, [styles["esqueci-senha"]]: true})}>Esqueceu a senha?</a>
                <button type="submit" className={styles.login} id="login"> Entrar <img src='assets/img/icon-arrow-outline-right-white.png' alt="" className={styles.seta}/></button>
            </form>
        </div>
    )
}