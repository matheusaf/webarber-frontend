import './NavBar.css'
import { logo } from './logo.png'
import React, { useState } from 'react';
import User from './User/User';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function NavBar() {
    // Hooks
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const handleActiveItem = () =>{
        const nav_item = "nav-item";
        return nav_item;
    }
    
    return (
            <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <nav className="navbar navbar-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded={!isNavCollapsed ? true: false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link className="navbar-brand" to="/">
                    Webarber
                </Link>
                <Link to='/login'>
                    <button className="btn login">
                        Entrar
                    </button>
                </Link>
                <Link to='/register'>
                    <button className='btn signin'>
                        Cadastrar
                    </button>
                </Link>

                <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="\">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="\agendamentos">Meus Agendamentos</a>
                        </li>
                    </ul>
                </div>
            </nav>
            </>
    );

}
