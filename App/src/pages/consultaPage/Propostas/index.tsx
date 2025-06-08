import { TPropostaRetorno } from "core/models/Proposta";
import Proposta from "./Proposta";
import styles from './Propostas.module.css';

interface Props {
    propostas: TPropostaRetorno[]
}

export default function Propostas(props: Props){
    const listaPropostas = props.propostas;
    console.log("Entrou na lista")
    console.log(listaPropostas);
    return (
        <table className={styles.tabela}>
            <thead>
                <tr>
                    <th className={styles.cabecalho}>Número da Proposta</th>
                    <th className={styles.cabecalho}>CPF</th>
                    <th className={styles.cabecalho}>Nome</th>
                    <th className={styles.cabecalho}>Valor Financiado</th>
                    <th className={styles.cabecalho}>Prazo</th>
                    <th className={styles.cabecalho}>Situação da Proposta</th>
                </tr>
            </thead>
            <tbody className={styles.corpo}>
                {listaPropostas.length > 0 && (
                     <>
                    {listaPropostas.map( proposta => (
                        <Proposta key={proposta.proposta} {...proposta}></Proposta>
                    ))}
                    </>
                )}
            </tbody>
        </table>
    )
}