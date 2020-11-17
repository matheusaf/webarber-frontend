import NavBar from '../NavBar';
import React from 'react';
import './Styles/CadastrarBarbearia.css'
import InputMask from 'react-input-mask';
import { LoadScript} from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

export default function FormularioBarbearia({create, setCreate}) {
    const libraries = ["places"]
    const updateForm = (event) => setCreate({ ...create, [event.target.name]: event.target.value });
    const updateAddress = (value) => setCreate({...create, endereco: value})

    //     const [create, setCreate] = useState({
    //     nome: '', endereco: '', enderecoNumero: '', bairro: '', cep:'',
    //     cidade: '', estado: '', telefone: '', horarioAbertura: '10:10:10', horarioFechamento: '22:22:22', user_id: 1
    //     // activeDay: "Seg",
    //     // Seg: {hrAbertura: '', hrFechamento:''},
    //     // Ter: {hrAbertura: '', hrFechamento:''},
    //     // Qua: {hrAbertura: '', hrFechamento:''},
    //     // Qui: {hrAbertura: '', hrFechamento:''},
    //     // Sex: {hrAbertura: '', hrFechamento:''},
    //     // Sab: {hrAbertura: '', hrFechamento:''},
    //     // Dom: {hrAbertura: '', hrFechamento:''}
    // });

    const searchOptions = {
        highlightFirstSuggestion: true
    }

    const handleSelect = async (value) =>{
        const results = await geocodeByAddress(value);
        let x = results[0];
        let numero, estado, complemento;
        let [rua, bairro, cidade, cep, pais] = x.formatted_address.split(',');
        [cidade,estado] = cidade.split('-');
        [ , bairro] = bairro.split('-');
        console.table([numero, estado, complemento, rua, bairro, cidade, cep, pais]);
    }

    // const handleDaysButton = (event) =>{
    //     event.preventDefault();
    //     setCreate({...create, activeDay: event.target.name})
    // }

    // const handleDaysForm = (event) =>{
    //     if (create.activeDay ===  null)
    //         alert("Selecionar uma data");
    //     else{
    //         setCreate({ ...create, [create.activeDay]:{...create[create.activeDay], [event.target.name]: event.target.value}});
    //     }
    // }

    // const renderDays = () => {
    //     const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
    //     return (
    //         <>
    //         {days.map(day => 
    //         <div className="col-xs day">
    //             <button id={day} name={day} className={`btn btn-day ${create.activeDay === day ? 'active' : 'disabled'}`} onClick={handleDaysButton}>{day}</button>
    //         </div>)}
    //         </>)
    // }

    // const setAddress= ()
    return (
        <>
            <NavBar></NavBar>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={libraries}>
                <div className="container">
                        <fieldset>
                            <div className="form-group row">
                                <label className="label" htmlFor="nomeBarbearia">
                                    Nome Barbearia
                                </label>
                                <input id="nomeBarbearia" name="nome" className="form-control" type="text" placeholder="Nome Barbearia" onChange={updateForm} value={create.nome}/>
                            </div>
                            <div className="form-group row">
                                <div className="col">
                                    <label className="label" htmlFor="endereco">
                                        Endereço
                                    </label>
                                    <PlacesAutocomplete
                                        value={create.endereco}
                                        onChange={updateAddress}
                                        onSelect={handleSelect}
                                        searchOptions={searchOptions}
                                    >
                                    {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                        <div>
                                            <input {...getInputProps({id:"endereco", name:"endereco", className:"form-control", placeholder:"Digite seu Endereço", style:{display:"flex", margin:"auto",width:"100%", resize:"None"}})}/>
                                            <div>
                                            {loading?<div style={{color:"red"}}>carregando...</div>:null}
                                            {suggestions.map(suggestion => {
                                                const style = {color: suggestion.active ? "#2bce3b": "#fff"};
                                                return(
                                                        <div {...getSuggestionItemProps(suggestion, {style})}>
                                                            {suggestion.description}
                                                        </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    )}
                                    </PlacesAutocomplete>
                                </div>
                                {/* <div className="col number">
                                    <label className="label" htmlFor="enderecoNumero">
                                        Nº
                                    </label>
                                    <input id="enderecoNumero" name="enderecoNumero" className="form-control number" type="number" placeholder="Nº" onChange={updateForm} value={create.enderecoNumero}/>
                                </div> */}
                            </div>
                            <div className="form-group row">
                                <label className="label" htmlFor="bairro">
                                    Bairro
                                </label>
                                
                                <input id="bairro" name="bairro" className="form-control" type="text" placeholder="Bairro" onChange={updateForm} value={create.bairro}/>
                            </div>
                            <div className="form-group row">
                                <label className="label" htmlFor="cidade">
                                    Cidade
                                </label>
                                <input id="cidade" name="cidade" className="form-control" type="text" placeholder="Cidade" onChange={updateForm} value={create.cidade}/>
                            </div>
                            <div className="form-group row">
                                <label className="label" htmlFor="estado">
                                    Estado
                                </label>
                                <input id="estado" name="estado" className="form-control" type="text" placeholder="Estado" onChange={updateForm} value={create.estado}/>
                            </div>
                            <div className="form-group row">
                                <label className="label" htmlFor="cep">
                                    CEP
                                </label>
                                <InputMask id="cep" name="cep" className="form-control" type="phone" placeholder="00000-000" mask={"+99(99)99999-9999"} onChange={updateForm} value={create.cep}></InputMask>
                            </div>
                            <div className="form-group row">
                                <label className="label" htmlFor="telefone">
                                    Telefone
                                </label>
                                <InputMask id="telefone" name="telefone" className="form-control" type="phone" placeholder="+12 (34) 56789-1011" mask={"+99(99)99999-9999"} onChange={updateForm} value={create.telefone}></InputMask>
                            </div>
                            {/* <div className="form-group row"> */}
                                {/* {renderDays()} */}
                            {/* </div> */}
                            <div className="form-group row">
                                <div className="col">
                                    <label className="label" htmlFor="hrAbertura">
                                        Hora Abertura
                                    </label>
                                    <input id="hrAbertura" name="horarioAbertura" className="form-control" type="time" value={create.horarioAbertura} onChange={updateForm}/>
                                </div>
                                <div className="text">
                                    até
                                </div>
                                <div className="col">
                                    <label className="label" htmlFor="horarioFechamento">
                                        Hora Fechamento
                                    </label>
                                <input id="hrFechamento" name="horarioFechamento" className="form-control" type="time" value={create.horarioFechamento} onChange={updateForm}/>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </LoadScript>
          </>
    );

}

