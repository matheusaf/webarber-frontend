import "./NavBar.css";
import logo from "../../../images/logo.png";
import { Link, useHistory } from "react-router-dom";
import React, { useState,  useContext } from "react";
import { UserContext } from "../../User/UserContext";
import Button from "../../UI/Button/Button";

export default function NavBar({pagina}){
    const history = useHistory();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const { webarberUser } = useContext(UserContext);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const handleLogout = () => {
        localStorage.removeItem("webarberUser");
        window.location.reload(true);
        history.push("/login");
    };

    const handleNavItems = (navBarText, nextPageLink, currentPage) => {
        return(
            <li className={`nav-item ${navBarText === currentPage ? "active" : ""}`}>
                <Link to={nextPageLink} className="nav-link">
                    {navBarText}
                </Link>
            </li>
        );
    };

    const buttonStyles = {
        margin: "auto",
        marginLeft: "2px",
        marginRight: "2px"
    };

    const handleRightSidePanel = () => {
        if (!webarberUser) {
            return (
                <>
                    <Link to="/login">
                        <Button buttonText="Entrar" style={buttonStyles}/>
                    </Link>
                    <Link to="/signup">
                        <Button buttonColors={2} buttonText="Cadastrar" style={buttonStyles}/>
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
                            <Button className="btn btn-nav login" handleOnClick={handleLogout} buttonText="Logout"/>
                        </div>
                    </div>
                </>
            );
        }
    };

    
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
                            {webarberUser && webarberUser.idTipo === 2 && handleNavItems("Minha Barbearia", "/barbearia", pagina)}
                            {webarberUser && webarberUser.idTipo === 2 && handleNavItems("Usuários", "/filterUsuario", pagina)}
                            {webarberUser && handleNavItems("Meus Agendamentos", "/agendamentos", pagina)}
                        </ul>
                    </div>
                </nav>
            </>
    );

}
