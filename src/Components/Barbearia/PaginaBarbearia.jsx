import NavBar from '../UI/NavBar/NavBar';
import MapComponent from '../UI/Map/MapComponent';
import Loading from '../UI/Loading/Loading';
import Button from '../UI/Button/Button';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import './PaginaBarbearia.css';
import { UserContext } from '../User/UserContext';

const url = process.env.REACT_APP_BASE_URL;

export default function PaginaBarbearia(){
    const history = useHistory();
    const { id } = useParams();
    const { webarberUser } = useContext(UserContext);
    const [dadosBarbearia, setDadosBarberia] = useState();
    const [loading, setLoading] = useState(false);

    const fieldNameDictionary = {
            nome: "Nome", endereço: "Endereço", numero: "Número", complemento:"Complemento", bloco:"Bloco",
            cep:"CEP", telefone:"Telefone", horarioAbertura:"Horário Abertura", horarioFechamento:"Horário Fechamento"
        }
    
    const fetchBarbearia = async() => {
        setLoading(true);
        try{
            const barbearia = await axios.get(`${url}/barbearias/${id}`).then(d=>d.data);
            barbearia.horarioAbertura =  new Date(barbearia.horarioAbertura).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit", hour12:false})
            barbearia.horarioFechamento = new Date(barbearia.horarioFechamento).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit", hour12:false})
            setDadosBarberia(barbearia);
        }
        catch(err){
            console.log(err);
        }
        setLoading(false);
    }
    
    useEffect(() => {
        fetchBarbearia();
    }, []);

    const renderBarbeariaDataRows = (field, value) =>{
        if(fieldNameDictionary[field]){
            return(
                <div className="row" style={{justifyContent:"center", display:"flex"}}>
                    <div className="col barberField">
                        {fieldNameDictionary[field]}
                    </div>
                    <div className="col barberData">
                        {value ? value : "Sem Informações"}
                    </div>
                </div>
            )
        }
    }

    const buttonStyle = {
        display: "flex",
        justifyContent:"center",
        margin: "10px auto"
    }

    const renderEditButton = () => {
        return(
                <Button buttonColors={2} buttonText="Editar Barbearia" style={buttonStyle} handleOnClick={()=>history.push(`/editarBarbearia/${id}`)}/>
        )
    }

    const renderPaginaBarbearia = () =>{
        return (
                <div style={{width:"max-content%", display:"flex", margin:"auto"}}>
                    <div className="barberPage">
                        <div className="card-title barber">
                            <h1 className="title barber">
                                {dadosBarbearia.nome}
                            </h1>
                        </div>
                        <div className="card-body">
                        {dadosBarbearia && Object.keys(dadosBarbearia).map(field=>renderBarbeariaDataRows(field, dadosBarbearia[field]))}
                        {webarberUser.id === +id && renderEditButton()}
                        </div>
                    </div>
                    <MapComponent nomeBarbearia={dadosBarbearia.nome} endereco={`${dadosBarbearia.endereco},  ${dadosBarbearia.numero}, ${dadosBarbearia.complemento}`}></MapComponent>
                </div>
        );
    }

    const renderNotFound = () =>{
        return (
            <h1 className="notFound">
                Barbearia não encontrada
            </h1>
        );
    }

    return (
        <div>
            <NavBar></NavBar>
            {loading && <Loading/>}
            {dadosBarbearia && dadosBarbearia.ativo ? renderPaginaBarbearia(): renderNotFound()}
            
        </div>
    );
}