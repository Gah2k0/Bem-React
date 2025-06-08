import styles from './Proposta.module.css';
import { TPropostaRetorno } from 'core/models/Proposta';
import classNames from 'classnames';

export default function Proposta(props: TPropostaRetorno) {
    let { proposta, cpf, nome, vlrFinanciado, prazo, situacao} = props;
    let valorFinanciado = vlrFinanciado.toString().replaceAll(".", ",");
    if(situacao === "AG") situacao = "Aguardando Análise"
    if(situacao === "AP") situacao = "Aprovado"
    if(situacao === "RE") situacao = "Reprovado"
    if(situacao === "AN") situacao = "Em Análise Manual"
    if(situacao === "PE") situacao = "Pendente de Avaliação"
    return (
            <tr className={styles.linha}> 
                <td className={styles.proposta}>{proposta}</td>
                <td className={styles.proposta}>{cpf}</td>
                <td className={styles.proposta}>{nome}</td>
                <td className={styles.proposta}>R${valorFinanciado}</td>
                <td className={styles.proposta}>{prazo} meses</td>
                <td>
                    <div 
                        className= {classNames(
                        {
                        [styles.aprovado]: situacao === "Aprovado",
                        [styles.analise]: situacao === "Aguardando Análise",
                        [styles.manual]: situacao === "Em Análise Manual",
                        [styles.pendente]: situacao === "Pendente de Avaliação",
                        [styles.reprovado]: situacao === "Reprovado"
                        })}
                    >
                        {situacao}
                    </div>
                </td>
            </tr>
    )
}