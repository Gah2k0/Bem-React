import React, { ReactEventHandler } from "react"
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';

type handler = {
    handleLogout: ReactEventHandler
}

export default function Header({ handleLogout }: handler){
    const navigate = useNavigate();

    return(
        <header className={styles.cabecalho}>
            <nav className={styles["nav-bar"]}>
                <img 
                    src="./assets/img/Horizontal wIcon.png" 
                    alt="" 
                    className={styles.logo}
                    onClick={() => navigate('/')}
                />
                <img 
                    src="./assets/img/logout.png" 
                    alt="" className={styles.logout}
                    id="logout" 
                    onClick={handleLogout}
                />
            </nav>
        </header>
)}