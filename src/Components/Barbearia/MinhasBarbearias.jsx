import { Helmet } from "react-helmet";
import NavBar from "../UI/NavBar/NavBar";
import Loading from "../UI/Loading/Loading";
import Button from "../UI/Button/Button";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CardBarbearia from "./CardBarbearia/CardBarberia";
import { UserContext } from "../User/UserContext";

const url = process.env.REACT_APP_BASE_URL;

const MinhasBarbearias = () => {
    const { webarberUser } = useContext(UserContext);
    let [barbearia, setBarbearia] = useState();
    let [loading, setLoading] = useState(false);
    
    const fetchBarbearia = async () => {
        setLoading(true);
        try{
            let res = await fetch(`${url}/barbearia`, {method: "get", 
                                                       headers: new Headers({"Content-Type":"application/json",
                                                                             "Authorization": `Bearer ${webarberUser.sessionToken}`})});
            if(res.status === 200){
                let data = await res.json();
                setBarbearia(data);
            }
        }
        catch(err){
            alert(err);
        }
        setLoading(false);

    };

    useEffect(() => {
        if(webarberUser){
            fetchBarbearia();
        }
    }, [webarberUser]);

    const renderNotFound = () => {
        return (
            <h3 style={{justifyContent:"center",display:"flex", margin:"auto", color:"red", marginTop:"1%", width:"auto"}}> {"Você não possui barbearia(s) cadastrada(s)."}</h3>
        );
    };

    const renderButton = () => {
        return (
            <Button buttonColors={1} buttonText="+ Adicionar Barbearias" style={{display:"flex", margin:"auto", height:"auto"}}/>
        );
    }

    const renderMinhaBarbearia = () => {
        return (
                <div>
                    <NavBar></NavBar>
                    <Link to="/cadastrarBarbearia">
                    {!barbearia && renderButton()}
                    </Link>
                    <div>
                        {barbearia && <CardBarbearia barbearia={barbearia}> </CardBarbearia>}
                        {!barbearia && renderNotFound()};
                    </div>
                </div>
        );
    };

    return (
            <>
            <Helmet>
                <title>Minhas Barbearias</title>
            </Helmet>
            {!loading ? renderMinhaBarbearia() : <Loading/>}
            </>
    );
};

export default MinhasBarbearias;