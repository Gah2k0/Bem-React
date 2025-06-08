import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';

import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import ConsultaPage from './pages/consultaPage';
import CadastroPage from './pages/cadastroPage';
import { AutenticacaoContext, AutenticacaoProvider } from 'contexts/autenticacao';
import { useContext } from 'react';

const AppRoutes = () => {
    const Private = ({ children }) => {
        const { autenticado, loading } = useContext(AutenticacaoContext);
        
        if(loading){
            return <div className="loading">Carregando...</div>
        }

        if(!autenticado){
            console.log(autenticado);
            return <Navigate to="/login"/>
        }

        return children;
    };

    return (
        <Router>
            <AutenticacaoProvider>
                <Routes>
                    <Route exact path='/login' element={<LoginPage/>}/>
                    <Route exact path='/' element={<Private><HomePage /></Private>}/>
                    <Route exact path='/consulta' element={<Private><ConsultaPage /></Private>}></Route>
                    <Route exact path='/cadastro' element={<Private><CadastroPage /></Private>}></Route>
                </Routes>
            </AutenticacaoProvider>
        </Router>
    );
};

export default AppRoutes;