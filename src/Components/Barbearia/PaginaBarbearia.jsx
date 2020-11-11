import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBarbearia } from './Controllers/ControllerBarbearia';
import NavBar from './../NavBar';
import MapComponent from '../../MapComponent';
import { UserContext } from '../../UserContext';

export default function PaginaBarbearia(){
    const { id } = useParams();
    const { webarberUser } = useContext(UserContext);
    const [dadosBarbearia, setDadosBarberia] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchBarbearia(+id).then(data=>setDadosBarberia({ nome: data.nome, endereço: data.endereco, 
                                                          numero: data.numero, complemento: data.complemento, 
                                                          bloco: data.bloco, cep: data.cep, 
                                                          telefone: data.telefone, ativo: data.ativo,
                                                          horarioAbertura: new Date(data.horarioAbertura).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit", hour12:false}), 
                                                          horarioFechamento: new Date(data.horarioFechamento).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit", hour12:false}), 
                                                          userId: data.user_id,
                                                          })).catch(err=>console.log(err));
        setLoading(false);
    }, []);
    
   const renderLoading = () => {
        return (
                <div style={{display:"flex", color:"red"}}>
                    Loading
                </div>
        );
    }

    const renderBarbeariaDataRows = (field, value) =>{
        const fieldNameDictionary = {
            nome: "Nome", endereço: "Endereço", numero: "Número", complemento:"Complemento", bloco:"Bloco",
            cep:"CEP", telefone:"Telefone", horarioAbertura:"Horário Abertura", horarioFechamento:"Horário Fechamento"
        }
        return(field !=="userId" ?
                <div className="row" style={{backgroundColor:"red", justifyContent:"center", display:"flex"}}>
                    <div className="col" style={{backgroundColor:"red", justifyContent:"flex-end", display:"flex"}}>
                        {fieldNameDictionary[field]}
                    </div>
                    <div className="col" style={{backgroundColor:"red", justifyContent:"flex-start", display:"flex"}}>
                        {value ? value : "Sem Informações"}
                    </div>
                </div>
                :
                null
        )
    }

    const renderEditButton = () => {
        console.log(webarberUser.id === dadosBarbearia.userId)
        return( webarberUser.id === dadosBarbearia.userId ?
            <div>
                <button> Editar </button>
            </div>
                :
                null
        )
    }

    const renderPaginaBarbearia = () =>{
        return (
                <div style={{width:"max-content%", display:"flex", margin:"auto", backgroudColor:"pink"}}>
                    <div className="card" style={{width:"120%"}}>
                        <div className="card-title">
                            <h1 style={{color:"#2bce3b"}}>
                                {dadosBarbearia.nome}
                            </h1>
                        </div>
                        <div className="card-body">
                        {dadosBarbearia && Object.keys(dadosBarbearia).map(field=>renderBarbeariaDataRows(field, dadosBarbearia[field]))}
                        {webarberUser && renderEditButton()}
                        </div>
                    </div>
                    <MapComponent></MapComponent>
                </div>
        );
    }

    const renderNotFound = () =>{
        return (
            <div style={{display:"flex", color:"red", margin:"auto"}}>
                Barbearia não encontrada
            </div>
        );
    }

    return (
        <div>
            <NavBar></NavBar>
            {loading && renderLoading()}
            {dadosBarbearia && dadosBarbearia.ativo ? renderPaginaBarbearia(): renderNotFound()}
            
        </div>
    );
}