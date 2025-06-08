import styles from './Home.module.css';
import { useContext } from 'react';
import { AutenticacaoContext } from 'contexts/autenticacao';
import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';
import Toast from 'components/Toast';


export default function HomePage() {
    const navigate = useNavigate();
    let showToast = localStorage.getItem("sucesso");

    const { logout } = useContext(AutenticacaoContext);

    return (
        <div className={styles.body}>

            <Header handleLogout={() => logout()}/>
                <Toast
                    autoHideDuration={3000}
                    horizontalAnchor="center"
                    intensity="normal"
                    messageText=""
                    open={showToast !== null}
                    severity="success"
                    titleText="Proposta cadastrada com sucesso"
                    verticalAnchor="top"
                    handleCloseCallback={() => localStorage.removeItem("sucesso")}
                />
            <main className={styles.principal}>
                <article className={styles.opcoes}>
                    <button onClick={() => navigate('/cadastro')}>
                        <img src="assets/img/icon-plus.png" alt="Ícone de soma"/>
                        <h3>Cadastrar</h3>
                        <small>Cadastre sua proposta</small>
                    </button>
                    <button onClick={() => navigate('/consulta')}>
                        <i className="fa fa-search fa-3x"></i>
                        <h3>Consultar</h3>
                        <small>Faça uma consulta aqui</small>
                    </button>
                </article>
            </main>
        </div>
    )
}