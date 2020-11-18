import "./Home.css";
import NavBar from "../UI/NavBar/NavBar";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import CardBarbearia from "../Barbearia/CardBarbearia/CardBarberia";
import Button from "../UI/Button/Button";
import Input from "../UI/Forms/Input/Input";
import axios from "axios";
import Loading from "../UI/Loading/Loading";

const url = process.env.REACT_APP_BASE_URL;

const Home = () => {
    let [barbeariasDados, setBarbeariasDados] = useState([]);
    let [loading, setLoading] = useState(false);
    let [searchFinished, setSearchFinished] = useState(false);
    let [queryValue, setQueryValue] = useState({
            elementType: "input",
            elementConfig: {
                id:"searchBar",
                type: "text",
                name: "searchBar",
                placeholder: "Digite o nome da barbearia"
            },
            value: "",
            validation: {},
            valid: false,
            touched: false
    });


    const  renderNotFound = () => {
        return (
            <h3 style={{justifyContent:"center",display:"flex", margin:"auto", color:"red", marginTop:"1%", width:"auto"}}> {`Não há barbearia(s) com o nome "${queryValue.value}"`}</h3>
        );
    };

    const validateQuery = (value) => {
        return value.trim() !== "";
    };

    const handleOnChange = (event) => {
        setSearchFinished(false);
        setQueryValue({...queryValue,  value: event.target.value, 
            valid: validateQuery(event.target.value), touched: true
        });
    };

    const fetchBarbearias = async () => {
        setLoading(true);
        try{
            let results = await axios.get(`${url}/barbearias?nome=${queryValue.value}`).then((d) => d.data);
            setSearchFinished(true);
            return results;
        }
        catch(err){
            alert(err);
        }
        setLoading(false);
    };

    const handleOnClick = async (event) => {
        event.preventDefault();
        let barbearias = await fetchBarbearias();
        setBarbeariasDados(barbearias);
    };

    const styleSearchBar = {
        display: "flex", 
        margin: "auto auto",
        width: "75%",
        height: "32px",
        textAlign:"center"
    };

    const buttonStyle = {
        margin: "10px auto"
    };

    return (
            <>
                <Helmet>
                    <title>Webarber - Tela Inicial</title>
                </Helmet>
                <div>
                    <NavBar pagina="Home"></NavBar>
                    <div>
                        <Input elementType={queryValue.elementType} value={queryValue.value} 
                               elementConfig={queryValue.elementConfig} handleOnChange={handleOnChange} 
                               style={styleSearchBar}/>
                    </div>
                    <div>
                        <Button buttonColors={2} disabled={!queryValue.valid} 
                                buttonText="Pesquisar" handleOnClick={handleOnClick}
                                style={buttonStyle}/>
                    </div>
                </div>
                <div>
                    {loading && <Loading/>}
                    {(barbeariasDados.length === 0 && queryValue.touched && searchFinished)? renderNotFound() : barbeariasDados.map((barbearia) => <CardBarbearia barbearia={barbearia}></CardBarbearia>)}
                </div>
            </>
    );

};

export default Home;