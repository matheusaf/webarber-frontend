import React, { useContext, useEffect, useState, useCallback } from "react";
import Input from "../UI/Forms/Input/Input";
import Button from "../UI/Button/Button";
import Helmet from "react-helmet";
import NavBar from "../UI/NavBar/NavBar";
import Loading from "../UI/Loading/Loading";
import { UserContext } from "../User/UserContext";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const CadastrarAgendamento = () => {
	const { id } = useParams();
	const history = useHistory();
	const {webarberUser} = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [servicos, setServicos] = useState([]);
	const [agendamentoForm, setAgendamentoForm] = useState({
		tipoServico:{
			elementType: "select",
			elementConfig: {
				id:"tipoServico",
				name: "tipoServico",
				placeholder: "Escolha o serviço",
				options:[
				],
			},
			label: "Serviço",
			value: "",
			readOnly: false,
			validation:{},
			valid: false,
			touched: false,
		},
		preco:{
			elementType: "input",
			elementConfig: {
				id:"preco",
				name: "preco",
				type: "text",
			},
			label: "Preço",
			value: `R$ 0.00`,
			readOnly: true,
			validation:{},
			valid: false,
			touched: false,
		},
		data:{
			elementType: "input",
			elementConfig: {
				id:"data",
				name: "data",
				placeholder: "Data",
				type: "date"
			},
			label: "Data",
			readOnly: false,
			value: "",
			validation:{},
			valid: false,
			touched: false,
		},
		horario:{
			elementType: "input",
			elementConfig: {
				id:"horario",
				name: "horario",
				placeholder: "Horário",
				type: "time"
			},
			label: "Horário",
			readOnly: false,
			value: "",
			validation:{},
			valid: false,
			touched: false,
		}
	});

	const fetchServicos = useCallback(async() => {
		try{
			let servicos = await axios.get(`${url}/servicos/barbearia/${id}`).then((d) => d.data);
			setServicos(servicos);
			let servicosOptions = servicos.reduce((arr, obj) => [...arr, {optionValue: obj.id, optionText: obj.titulo}], []);
			setAgendamentoForm({...agendamentoForm, tipoServico : {
										...agendamentoForm.tipoServico,  elementConfig : {
											...agendamentoForm.tipoServico.elementConfig, options:[...servicosOptions]}}});
		}
		catch(err){
			alert(err);
		}
		setLoading(false);
	}, [id, agendamentoForm]);

	useEffect(() => {
		if(webarberUser){
			fetchServicos();
		}
	}, [webarberUser, fetchServicos])

	const handleOnChange = (event) => {
		let tempAgendamentoForm = {...agendamentoForm};
		tempAgendamentoForm = {...tempAgendamentoForm, [`${event.target.name}`]:{
			...tempAgendamentoForm[`${event.target.name}`], value: event.target.value}};
		if(event.target.name === "tipoServico"){
			let arr = servicos.filter((servico) => servico.id === +event.target.value);
			let preco = 0;
			if(arr.length > 0){
				preco = arr[0].preco;
			}
			tempAgendamentoForm = {...tempAgendamentoForm, preco: {
											...tempAgendamentoForm.preco, value: `R$ ${preco.toFixed(2)}`}};
		}
		setAgendamentoForm(tempAgendamentoForm);
	};

	const criarAgendamento = async () => {
		try {
			if(agendamentoForm.tipoServico.value === "default" || agendamentoForm.tipoServico.value === ""){
				alert("Selecionar um serviço válido");
				return;
			}
			const dataAgendamento = new Date (agendamentoForm.data.value).setHours(...agendamentoForm.horario.value.split(":"));
			const agendamento = {idBarbearia: id, idServico: agendamentoForm.tipoServico.value, data: new Date(dataAgendamento).toISOString()};
			const response = await fetch(`${url}/agendamentos`, {
				method: "POST",
				headers: new Headers({"Content-Type" : "application/json", "Authorization": `Bearer ${webarberUser.sessionToken}`}),
				body: JSON.stringify(agendamento),
			});
			if(response.status === 201){
				alert("Agendamento realizado com sucesso");
				history.push(`/barbearia/${id}`);
			}
			else{
				let { message } = await response.json();
				alert(message);
			}
		} 
		catch (error) {
			alert(error);
		}
	};

	const renderContainer = () => {
		if(loading){
			return (<Loading/>);
		}
		else{
			return(
				<div className="container">
					{servicos.length > 0 && Object.keys(agendamentoForm).map((field) => 
					<Input elementType={agendamentoForm[`${field}`].elementType} label={agendamentoForm[`${field}`].label}
							value={agendamentoForm[`${field}`].value} elementConfig={agendamentoForm[`${field}`].elementConfig}
							options={agendamentoForm[`${field}`].options} readOnly={agendamentoForm[`${field}`].readOnly}
							handleOnChange={handleOnChange} style={null}/>
					)}
					<Button buttonColors={1} id="btn agendamento" buttonText="Realizar Agendamento" handleOnClick={() => criarAgendamento()} style={buttonStyle}/>
				</div>
			);
		}
	};
	
	const buttonStyle = {
		margin : "10px auto",
		display : "flex",
		justifyContent : "center"
	};

	return (
		<>
			<Helmet>
				<title>Realizar Agendamento</title>
			</Helmet>
			<NavBar/>
			{renderContainer()}
		</>

	)
}

export default CadastrarAgendamento;