import './NavBar.css'
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../User/UserContext';

export default function NavBar({pagina}){
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const { webarberUser } = useContext(UserContext);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('webarberUser');
        window.location.reload(true);
    }


    const handleNavItems = (navBarText, nextPageLink, currentPage) => {
        return(
            <li className={`nav-item ${navBarText === currentPage ? 'active' : ''}`}>
                <Link to={nextPageLink} className="nav-link">
                    {navBarText}
                </Link>
            </li>
        )
    }

    const handleRightSidePanel = () =>{
        if (!webarberUser) {
            return (
                <>
                    <Link to='/login'>
                        <button className="btn btn-nav login">
                            Entrar
                        </button>
                    </Link>
                    <Link to='/signup'>
                        <button className=' btn btn-nav signup'>
                            Cadastrar
                        </button>
                    </Link>
                </>
            );
        }
        else {
            return (
                <> 
                    <div className="row">
                        <div className="col nav">
                            <p className="p-nav user"> 
                                Olá,
                                <Link to={`/users/${webarberUser.id}`} className="a-nav user">
                                    {` ${webarberUser.nome}`}
                                </Link>
                            </p>
                        </div>
                        <div className="col nav">
                            <button className="btn btn-nav login" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            );
        }
    }
    
    return (
            <>
                <nav className="navbar navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded={!isNavCollapsed ? true: false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                        <div className="navbar-brand">
                            <Link to="/">
                                <img src={logo} alt="logo" className="logo"></img>
                            </Link>
                        </div>
                    {handleRightSidePanel()}
                    <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            {handleNavItems("Home", "/", pagina)}
                            {webarberUser && webarberUser.idTipo === 2 && handleNavItems("Minhas Barbearias", "/barbearias", pagina)}
                            {webarberUser && handleNavItems("Meus Agendamentos", "/agendamentos", pagina)}
                        </ul>
                    </div>
                </nav>
            </>
    );

}
