import classNames from "classnames";
import Header from "components/Header";
import { AutenticacaoContext } from "contexts/autenticacao";
import { TPropostaRetorno } from "core/models/Proposta";
import React, { FormEvent, useCallback, useContext, useState } from "react";
import { buscaProp, buscarPropostas } from '../../core/api/APIProposta';
import styles from './Consulta.module.css';
import Propostas from "./Propostas";
import { useNavigate } from 'react-router-dom';
import Input from "components/Input";
import { validaNumeros } from "utils/Validacoes/ValidacaoNumeros";
import { validarCpf } from "utils/Validacoes/ValidacaoCpf";
import { TBuscaProposta } from "./types";
import Toast from "components/Toast";

export default function ConsultaPage() {
    const navigate = useNavigate();
    const [ pesquisa, setPesquisa ] = useState(false);
    const [ buscaProposta, setBuscaProposta ] = useState<TBuscaProposta>({cpf: "", numeroProposta: "", nome:""} as TBuscaProposta)
    const [ lista, setLista ] = useState<TPropostaRetorno[]>([]);
    const { logout } = useContext(AutenticacaoContext);
    const [ showToast, setShowToast ] = useState(false);

    const listarPropostas = async ()  => {
        let regex = /\d/g;
        console.log(buscaProposta)
        let cpfBuscado = buscaProposta.cpf.match(regex)?.join("");
        if(!validaNumeros(buscaProposta.numeroProposta)) return setShowToast(true);
        const dados: buscaProp = {
            NumeroProposta: Number(buscaProposta.numeroProposta),
            Cpf: cpfBuscado,
            Nome: buscaProposta.nome
        } 
        const response = await buscarPropostas(dados)
        if(response.message !== "Network Error")
            return response.data.retorno ;
    }

    const handleSubmit = async (event: FormEvent) => {
        setShowToast(false);
        event.preventDefault();
        const propostas = await listarPropostas();
        setPesquisa(true);
        if(propostas){
            setLista(propostas);
        }
        else {
            setShowToast(true);
            setLista([]);
        }
    }

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
            setBuscaProposta({
                ...buscaProposta,
                [e.currentTarget.name]: e.currentTarget.value,
            }); 
        },
        [buscaProposta]
      );

    return (
        <div>
            <Header handleLogout={() => logout()}/>
                <Toast
                    autoHideDuration={3000}
                    horizontalAnchor="center"
                    intensity="normal"
                    messageText="Tente novamente com outras informações."
                    open={showToast}
                    severity="info"
                    titleText="Nenhuma Proposta Encontrada"
                    verticalAnchor="top"
                />
            <main className={classNames({
                [styles.consulta]: true,
                })}
            >
                <form className={styles.forms} onSubmit={handleSubmit}>
                    <div className={styles.breadCrumb} onClick={() => navigate("/")}>
                        <h4 className={styles["bread-texto"]}> Serviços</h4>
                        <img src='assets/img/icon-arrow-outline-right.png' alt="" className={styles["bread-seta"]}/>
                    </div>                    
                    <h1 className={styles.titulo}>Consultar Proposta</h1>
                    <article className={styles.article}>
                        <Input  
                            id="numeroProposta"
                            name="numeroProposta"
                            erro={!validaNumeros(buscaProposta.numeroProposta) && buscaProposta.numeroProposta !== ""}
                            onChange={handleChange}
                        > 
                            Número da Proposta
                        </Input>
                        <Input 
                            value={buscaProposta.cpf}
                            name="cpf"
                            id="cpf"
                            mask="cpf"
                            erro={validarCpf(buscaProposta.cpf)}
                            onChange={handleChange}
                        > 
                            CPF
                        </Input>
                        <Input 
                            value={buscaProposta.nome}
                            id="nome"
                            name="nome"
                            onChange={handleChange}
                        > 
                            Nome do Cliente
                        </Input>
                        <button type="submit" className={styles["submit-consulta"]} id="submit-consulta">
                            <i className="fa fa-search fa-1x"></i> 
                            <p>Consultar</p>
                        </button>
                    </article>
                </form>
            </main>

            { pesquisa && (
                <>
                    <h3 className={styles.subtitulo}>Resultado</h3>
                    <Propostas propostas={lista}></Propostas>
                </>
            )}
            
        </div>
    )
}