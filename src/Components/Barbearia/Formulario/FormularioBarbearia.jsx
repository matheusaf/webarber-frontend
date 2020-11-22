import React, { useEffect, useState } from "react";
import Input from "../../UI/Forms/Input/Input";

const FormularioBarbearia = ({dadosBarbearia, handleOnSubmitActiom}) => {
    const [barbeariaForm, setBarbeariaForm] = useState({
        nome: {
            elementType: "input",
            elementConfig:{
                id: "nome",
                name: "nome",
                type: "text",
                placeholder: "Nome da Barbearia"
            },
            label: "Nome da Barbearia" ,
            value: ""
        },
        endereco: {
            elementType: "address",
            elementConfig:{
                id: "endereco",
                name: "endereco",
                type: "address",
                placeholder: "Endereço"
            },
            label: "Endereço",
            value: ""
        },
        numero: {
            elementType: "input",
            elementConfig:{
                id: "numero",
                name: "numero",
                type: "text",
                maxLength:5,
                placeholder: "Número"
            },
            label: "Número",
            value: ""
        },
        bairro: {
            elementType: "input",
            elementConfig:{
                id: "bairro",
                name: "bairro",
                type: "text",
                placeholder: "Bairro"
            },
            label: "Bairro",
            value: ""
        },
        cidade: {
            elementType: "input",
            elementConfig:{
                id: "cidade",
                name: "cidade",
                type: "text",
                placeholder: "Cidade"
            },
            label: "Cidade",
            value: ""
        },
        estado: {
            elementType: "input",
            elementConfig:{
                id: "estado",
                name: "estado",
                type: "text",
                placeholder: "Estado"
            },
            label: "Estado",
            value: ""
        },
        cep: {
            elementType: "input",
            elementConfig:{
                id: "cep",
                name: "cep",
                type: "text",
                placeholder: "CEP",
                mask: "99999-999"
            },
            label: "CEP",
            value: ""
        },
        telefone: {
            elementType: "input",
            elementConfig:{
                id: "telefone",
                name: "telefone",
                type: "text",
                placeholder: "Telefone",
                mask: "(99) 99999-9999"
            },
            label: "Telefone",
            value: ""
        },
        horarioAbertura: {
            elementType: "input",
            elementConfig:{
                id: "horarioAbertura",
                name: "horarioAbertura",
                type: "time",
                placeholder: "00:00"
            },
            label: "Horário Abertura",
            value: ""
        },
        horarioFechamento: {
            elementType:"input",
            elementConfig:{
                id:"horarioFechamento",
                name: "horarioFechamento",
                type: "time",
                placeholder: "00:00"
            },
            label: "Horário Fechamento",
            value: ""
        }
    });
    
    const [addressValues, setAddressValue] = useState(null);
    const [autoFillState, setAutoFillState] = useState(false);
    
    const serverDataDictionary = {
        nome: "nome",
        endereco: "endereco",
        numero :"numero",
        bairro: "bloco",
        cep: "cep",
        telefone: "telefone",
        horarioAbertura: "horarioAbertura",
        horarioFechamento: "horarioFechamento"
    };

    useEffect(() => {
        if(dadosBarbearia){
            let tempBarbeariaForm = {...barbeariaForm};
            Object.keys(serverDataDictionary).map((field) => {
                tempBarbeariaForm = {...tempBarbeariaForm, [`${field}`]:{
                ...tempBarbeariaForm[`${field}`], value: dadosBarbearia[serverDataDictionary[`${field}`]]}};
                }
            );
            tempBarbeariaForm.horarioAbertura.value = new Date(tempBarbeariaForm.horarioAbertura.value).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit", hour12:false});
            tempBarbeariaForm.horarioFechamento.value = new Date(tempBarbeariaForm.horarioFechamento.value).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit", hour12:false});
            setBarbeariaForm({...tempBarbeariaForm});
        }
    }, [dadosBarbearia]);

    const addressDataDictionary = {
        // endereco: "route",
        enderecoNumero :"street_number",
        bairro: "sublocality_level_1",
        cep: "postal_code",
        cidade: "administrative_area_level_2",
        estado: "administrative_area_level_1",
    };

    const handleOnChange = (event) => {
        setBarbeariaForm({...barbeariaForm, [`${event.target.name}`]: {
                    ...barbeariaForm[`${event.target.name}`], value: event.target.value}});
        if(event.target.name === "endereco"){
            setAutoFillState(false);
        }
    };
    
    const autoCompleteAddressFields = () => {
        if(addressValues){
            let tempBarbeariaForm = {...barbeariaForm};
            for(let fieldsEndereco of Object.keys(addressDataDictionary)){
                let data = addressValues.filter((addressComponent) => addressComponent.types.find((type) => type === addressDataDictionary[`${fieldsEndereco}`]))[0];
                tempBarbeariaForm = {...tempBarbeariaForm, [`${fieldsEndereco}`]: {
                                                            ...tempBarbeariaForm[`${fieldsEndereco}`], 
                                                            value: data ? data.short_name: "" }
                };
            }
            setBarbeariaForm({...tempBarbeariaForm});
            setAutoFillState(true);
        }
    };
    
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        await handleOnSubmitActiom(barbeariaForm);
    };

    const inputStyle = {
        width:"50%", 
        display:"flex", 
        margin:"auto auto"
    };

    return (
            <div>
                <form id="barbearia-form" onSubmit={handleOnSubmit}>
                    {!autoFillState && autoCompleteAddressFields()}
                    {Object.keys(barbeariaForm).map((field) => 
                        <Input elementType={barbeariaForm[`${field}`].elementType} label={barbeariaForm[`${field}`].label}
                        value={barbeariaForm[`${field}`].value} elementConfig={barbeariaForm[`${field}`].elementConfig} 
                        handleOnChange={handleOnChange} setAddressValue={setAddressValue} style={inputStyle}/>)}
                </form>
            </div>
    );
};

export default FormularioBarbearia;