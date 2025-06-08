import classNames from 'classnames';
import { aplicarMaskCpf, aplicarMaskMonetario, aplicarMaskCep } from 'utils/masks/masks';
import React, { InputHTMLAttributes, useCallback } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    erro?: boolean;
    shrink?: boolean; 
    mask?: "cep" | "monetario" | "cpf";
    prefix?: string;
}

const Input: React.FC<InputProps> = ({ erro, shrink, mask, prefix, children, ...props}) => {

    const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if(mask === "cpf") aplicarMaskCpf(e);
        if(mask === "monetario") aplicarMaskMonetario(e);
        if(mask === "cep") aplicarMaskCep(e);
    }, [mask]) ;

    return (
        <div className={classNames({
                [styles["input-container"]]: true,
                [styles["input-container-menor"]]: shrink || mask,
             })}>
            <input 
                className={classNames({
                    [styles.input]: true,
                    [styles["input-erro"]]: erro
                })
                }
                {...props}
                // onKeyUp={handleKeyUp}
                onInput={handleKeyUp}
            />
            <label 
                className={classNames({
                    [styles.label]: true,
                    [styles["label-input-preenchido"]]: props.value
                })}
                htmlFor={props.name}
            >
                {children}</label>
            
                <small 
                    className={classNames({
                        [styles.erro]: erro
                    })}
                >
                    Campo Inválido
                </small>
        </div>
    )
}

export default Input;