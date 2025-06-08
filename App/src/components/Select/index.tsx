import classNames from "classnames"
import { SelectHTMLAttributes } from "react";
import { TselectOpcao } from "types/Types";
import styles from "./Select.module.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    erro?: boolean;
    shrink?: boolean; 
    mask?: "cep" | "monetario" | "cpf";
    prefix?: string;
    children: string;
    opcoeSelect: TselectOpcao[];
}

export const Select: React.FC<SelectProps> = ({ opcoeSelect, erro, shrink, mask, prefix, children, ...props}) => {
    return (
        <div 
            className={classNames({
                [styles["input-container"]]: true,
            })}
        >
            <select 
                {...props}
                className={classNames({
                    [styles.select]: true,
                    [styles["select-erro"]]: erro
                })}  
            >
                {opcoeSelect.map((opcao) => (
                    <option 
                        key={opcao.value} 
                        value={opcao.value} 
                        disabled={opcao.disable}
                        hidden={opcao.hidden}
                        selected={opcao.selected}
                    >
                            {opcao.label}
                    </option>
                ))}
            </select>
            <label 
                className={classNames({
                    [styles.label]: true,
                })}
                htmlFor="numeroProposta"
            >
                {children}
            </label>
            <small 
                    className={classNames({
                        [styles.erro]: erro
                    })}
                >
                    {children} Inválido
            </small>
        </div>
    )
}