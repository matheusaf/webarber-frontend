import './NavBar.css'
import logo from '../images/logo.png';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function NavBar(props){
    // Hooks
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('userId')));
    const [type, setType] = useState(false);
    let tipoUsuario = localStorage.getItem('tipoUsuario');
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const handleActiveItem = () =>{
        return "nav-item";
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('userId');
        localStorage.removeItem('tipoUsuario');
        setIsLoggedIn(false);
        window.location.reload(true);
    }

    // useEffect(() => {
    //     debugger;
    //     localStorage.getItem('idTipo')
    // })


    const handleRightSidePanel = () =>{
        let rightSidePanel;
        if (!isLoggedIn) {
            rightSidePanel = (<>
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
                        </>);
        } else {
            rightSidePanel = (
                <> 
                    <div className="form-row">
                        <div className="col-m-8" style={{marginTop:"8%"}}>
                            <p className="p-user">Olá, <spam className="spam-user"> {localStorage.getItem("username")} </spam></p>
                        </div>
                        <div className="col">
                            <button className="btn btn-nav login" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            );
        }
        return rightSidePanel;
    }
    
    return (
            <>
            <nav className="navbar navbar-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded={!isNavCollapsed ? true: false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" className="logo"></img>
                </Link>
                {handleRightSidePanel()}

                <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="\">Home</a>
                        </li>
                        {
                            (tipoUsuario == "2")?
                            <li className="nav-item">
                                <a className="nav-link" href="\barbearias">Minhas Barbearias</a>
                            </li>
                            :
                            null
                        }
                        
                        {
                            // (isLoggedIn)?
                            // <li className="nav-item">
                            //     <a className="nav-link" href="\agendamentos">Meus Agendamentos</a>
                            // </li>
                            // :
                            null
                        }
                    </ul>
                </div>
            </nav>
            </>
    );

}
