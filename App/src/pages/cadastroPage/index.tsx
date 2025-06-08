import classNames from "classnames";
import Header from "components/Header";
import Input from "components/Input";
import { AutenticacaoContext } from "contexts/autenticacao";
import { initialStateProposta } from "types/InitialStates";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { buscarCliente } from "core/api/APICliente";
import { buscarCep } from "core/api/APICep";
import { buscarConveniadas } from "core/api/APIConveniada";
import criarProposta from "core/services/PropostaService";
import { opcoesConvenio, opcoesGenero, opcoesPrazo } from "types/Opcoes";
import { Tconveniada, Tproposta, TselectOpcao } from "types/Types";
import styles from './Cadastro.module.css';
import { validaNumeros } from "utils/Validacoes/ValidacaoNumeros";
import { validarCpf } from "utils/Validacoes/ValidacaoCpf";
import { validarDadosProposta } from "utils/Validacoes/Validacao";
import { validarNome } from "utils/Validacoes/ValidacaoCliente";
import { Select } from "components/Select";
import { calcularJuros } from "utils/calculoJuros";
import { gerarNumeroProposta } from "utils/geradorNumeroProposta";

export default function CadastroPage() {
    const { logout, user } = useContext(AutenticacaoContext);
    const navigate = useNavigate();
    const [ proposta, setProposta ] = useState<Tproposta>(initialStateProposta);
    const [ opcaoConveniadas, setOpcaoConveniadas] = useState<TselectOpcao[]>(opcoesConvenio); 
    const [ opcaoPrazo, setOpcaoPrazo] = useState<TselectOpcao[]>(opcoesPrazo); 
    const [ blockInputCpf, setblockInputCpf ] = useState(false);
    const [ blockInputCep, setblockInputCep ] = useState(false);
    const [ errosCliente, setErrosCliente ] = useState<string[]>([]);
    const [ errosProposta, setErrosProposta ] = useState<string[]>([]);
    const [ SemRuaEBairro, setSemRuaEBairro ] = useState(false);

    const formatarOptionConveniada = (conveniada: Tconveniada): TselectOpcao => {
        return {
            value: conveniada.conveniada,
            label: conveniada.descricao,
        };
    };

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) => {
            setProposta({
                ...proposta,
                [e.currentTarget.name]: e.currentTarget.value,
            }); 
            setErrosCliente(errosCliente.filter(valor => valor !== e.currentTarget.name))
            setErrosProposta(errosProposta.filter(valor => valor !== e.currentTarget.name))
        },
        [proposta, errosCliente, errosProposta]
      );

      const handleReset = () => {
            setProposta({...initialStateProposta, proposta: gerarNumeroProposta()});
            setErrosCliente([]);
            setErrosProposta([]);
        };
        
      useEffect(() => {
            (async function() {
                console.log("setando conveniadas")
                const conveniadas = await buscarConveniadas()
                    setOpcaoConveniadas([...[...conveniadas.data.retorno].map(
                        conveniada => formatarOptionConveniada(conveniada)
                    )]);
                })();     
                setOpcaoConveniadas([...opcaoConveniadas, ...opcoesConvenio])
    }, []);


    useEffect(() => {
        setblockInputCpf(false);

        const preencherCamposCliente = async () => {
            let regex = /\d/g;
            let cpfBuscado = proposta.cpf.match(regex)?.join("");
            const response = await buscarCliente(cpfBuscado);
            if(response){
                setblockInputCpf(true);
                setProposta(
                    {
                        ...proposta, 
                        ...response
                    }
                );
            };
            setErrosCliente([]);
            setErrosProposta([]);
        };

        if(proposta.cpf.length === 13  || proposta.cpf.length === 14){
            preencherCamposCliente();
        };

    }, [proposta.cpf]);
        
    useEffect(() => {

        setblockInputCep(false);

        const PreencherCamposCep = async () => {
            setSemRuaEBairro(false);
            const response = await buscarCep(proposta.cep);
            if(!response.erro){
                setblockInputCep(true);
                if(!response.logradouro || !response.bairro) setSemRuaEBairro(true);
                setProposta({
                    ...proposta, 
                    bairro: response.bairro,
                    rua: response.logradouro,
                    cidade: response.localidade,
                    uf: response.uf
                });
            } else {
                setProposta({
                    ...proposta, 
                    bairro: "",
                    rua: "",
                    cidade: "",
                    uf: ""
                });
            }
        };

        if(proposta.cep.length === 9){
            console.log("buscando cep e preenchendo dados")
            PreencherCamposCep();
        };
    }, [proposta.cep]);
    
    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();

        const validacao = validarDadosProposta(proposta);
        console.log(proposta);
        if(validacao.temErros) {
            setErrosCliente(validacao.cliente);
            setErrosProposta(validacao.proposta);
            console.log(errosCliente);
            console.log(errosProposta);
            console.log(proposta.genero)
            return false
        };

        let response = await criarProposta(proposta);
        if(response){
            localStorage.setItem("sucesso", "sucesso")
            navigate("/");
        }
    }

    useEffect(() => {
        setProposta({...proposta, proposta: gerarNumeroProposta()})
    }, []);

    return (
        <div className={styles.body}>
            <Header handleLogout={() => logout()}/>
            <form className={styles.principal}>
                <div className={styles.breadCrumb} onClick={() => navigate("/")}>
                    <h4 className={styles["bread-texto"]}> Serviços</h4>
                    <img src='assets/img/icon-arrow-outline-right.png' alt="" className={styles["bread-seta"]}/>
                </div>
                <h1 className={styles.titulo}>Cadastro de Proposta</h1>
                <section className={styles.cadastro}>
                    <h2 className={styles["sub-titulo"]}>Dados do Cliente</h2>
                    <article className={styles.cliente}>
                        <div className={styles.container}>
                            <Input 
                                value={proposta.cpf}
                                name="cpf"
                                id="cpf"
                                mask="cpf"
                                erro={validarCpf(proposta.cpf) || errosCliente.includes("cpf")}
                                onChange={handleChange}
                            > 
                                CPF
                            </Input>
                            <Input 
                                value={proposta.nome}
                                name="nome"
                                id="nome"
                                disabled={blockInputCpf}
                                erro={validarNome(proposta.nome) || errosCliente.includes("nome")}
                                onChange={handleChange}
                            > 
                                Nome do Cliente
                            </Input>
                            <Input 
                                value={proposta.dataNascimento}
                                name="dataNascimento" 
                                id="dataNascimento"
                                type={"date"}
                                max={'2022-01-01'}
                                disabled={blockInputCpf}
                                erro={errosCliente.includes("dataNascimento")}
                                onChange={handleChange}
                            > 
                                Data de Nascimento
                            </Input>
                            <Select
                                value={proposta.genero}
                                name="genero"
                                disabled={blockInputCpf}
                                opcoeSelect={opcoesGenero}
                                erro={errosCliente.includes("genero")}
                                onChange={handleChange}
                            >
                                Gênero
                            </Select>
                            <Input 
                                value={proposta.salario}
                                name="salario"
                                id="salario"
                                placeholder="R$ 0,00"
                                mask="monetario"
                                required={true}
                                erro={errosCliente.includes("salario")}
                                onChange={handleChange}
                            > 
                                Salário
                            </Input>
                        </div>

                        <div className={styles.container}>
                            <Input 
                                value={proposta.cep} 
                                name="cep"
                                id="cep"
                                mask="cep"
                                erro={!blockInputCep && proposta.cep !== "" || errosCliente.includes("cep")}
                                onChange={handleChange}
                            > 
                                CEP
                            </Input>
                            <Input 
                                value={proposta.rua}
                                name="rua"
                                id="rua"
                                disabled={blockInputCep && !SemRuaEBairro}
                                erro={errosCliente.includes("rua")}
                                onChange={handleChange}
                            > 
                                Rua
                            </Input>
                            <Input 
                                value={proposta.numero}
                                name="numero"
                                id="numero"
                                shrink={true}
                                erro={!validaNumeros(proposta.numero) || errosCliente.includes("numero")}
                                onChange={handleChange}
                            > 
                                Número
                            </Input>
                            <Input 
                                value={proposta.bairro}
                                name="bairro"
                                id="bairro"
                                disabled={blockInputCep && !SemRuaEBairro}
                                erro={errosCliente.includes("bairro")}
                                onChange={handleChange}
                            > 
                                Bairro
                            </Input>
                            <Input 
                                value={proposta.cidade}
                                name="cidade" 
                                id="cidade"
                                disabled={blockInputCep}
                                erro={errosCliente.includes("cidade")}
                                onChange={handleChange}
                            > 
                                Cidade
                            </Input>
                            <Input 
                                value={proposta.uf}
                                name="uf" 
                                id="uf"
                                shrink= {true}
                                disabled={blockInputCep}
                                erro={errosCliente.includes("uf")}
                                onChange={handleChange}
                            > 
                                UF
                            </Input>
                        </div>
                    </article>
                </section>

                <section className={styles.cadastro}>
                    <h2 className={styles["sub-titulo"]}>Dados da Proposta</h2>
                    <article className={styles.cliente}>
                        <div className={styles.container}>
                            <Input  
                                name="numeroProposta"
                                id="numeroProposta"
                                placeholder={String(proposta.proposta)}
                                disabled={true}
                                onChange={handleChange}
                            > 
                                Número da Proposta
                            </Input>
                            <Select
                                value={proposta.conveniada}
                                name="conveniada"
                                onChange={handleChange}
                                erro={errosProposta.includes("conveniada")}
                                opcoeSelect={opcaoConveniadas}
                            >
                                Convênio
                            </Select>
                            <Input 
                                name="valorSolicitado"
                                id="valorSolicitado"
                                placeholder="R$ 0,00"
                                mask="monetario"
                                erro={errosProposta.includes("Valor solicitado Inválido")}
                                onChange={handleChange}
                            > 
                                Valor Solicitado
                            </Input>
                            <Select
                                name="prazo"
                                opcoeSelect={opcaoPrazo}
                                erro={errosProposta.includes("prazo")}
                                onChange={handleChange}
                            >
                                Prazo
                            </Select>
                            <Input 
                                value={calcularJuros(proposta.valorSolicitado, proposta.prazo)}
                                name="valorFinanciado"
                                id="valorFinanciado"
                                placeholder="R$ 0,00"
                                mask="monetario"
                                disabled={true}
                                onChange={handleChange}
                            > 
                                Valor Financiado
                            </Input>
                        </div>
                        <div className={classNames({
                            [styles.container]: true,
                            [styles.menor]: true
                            })}
                        >
                            <Input  
                                value={user.nome}
                                id="agente"
                                name="agente"
                                shrink= {true}
                            > 
                                Agente
                            </Input>
                            <Input  
                                id="observacoes"
                                name="observacoes"
                                disabled={true}
                            > 
                                Observações
                            </Input>
                        </div>
                    </article>
                    <div className={styles.botoes}>
                        <button 
                            className={styles.botao} 
                            type="submit" 
                            onClick={(e) => handleSubmit(e)}
                        > 
                            <img src="./assets/img/diskette.png" alt="Salvar" className={styles.salvar}/>
                            Gravar Proposta
                        </button>
                        <button className={classNames({[styles.botao]: true, [styles["botao-reset"]]: true})} type="reset" onClick={() => handleReset()}>
                            <img src="./assets/img/eraser.png" alt="Apagar" className={styles.apagar}/>
                            Limpar
                        </button>
                    </div>
                </section>
            </form>
        </div>
    )
}