import React, { useContext, useEffect, useState} from "react";
import Input from "../UI/Forms/Input/Input";
import Button from "../UI/Button/Button";
import Helmet from "react-helmet";
import NavBar from "../UI/NavBar/NavBar";
import Loading from "../UI/Loading/Loading";
import { UserContext } from "../User/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const CadastrarAgendamento = () => {
	const { id } = useParams();
	const {webarberUser} = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [servicos, setServicos] = useState([]);
	const [cadastrarServicoForm, setCadastrarServicoForm] = useState({
		tipoServico:{
			elementType: "select",
			elementConfig: {
				id:"tipoServico",
				name: "tipoServico",
				placeholder: "Escolha o serviço",
				options:[
				],
			},
			label: "Tipo Serviço",
			value: "",
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
			disabled: true,
			label: "Preço",
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
			value: "",
			validation:{},
			valid: false,
			touched: false,
		}
	});

	const fetchServicos = async() => {
		try{
			let servicos = await axios.get(`${url}/servicos/barbearia/${id}`).then((d) => d.data);
			debugger;
			setServicos(servicos);
			let servicosOptions = servicos.reduce((arr, obj) => [...arr, {optionValue: obj.id, optionText: obj.titulo}], []);
			setCadastrarServicoForm({...cadastrarServicoForm, ["tipoServico"] : {
										...cadastrarServicoForm["tipoServico"],  ["elementConfig"]: {
											...cadastrarServicoForm["tipoServico"]["elementConfig"], options:[...servicosOptions]}}});
		}
		catch(err){
			alert(err);
		}
		setLoading(false);
	}

	console.log(cadastrarServicoForm);
	useEffect(() => {
		if(webarberUser){
			fetchServicos();
		}
	}, [webarberUser])

	const handleOnChange = (event) => {
		setCadastrarServicoForm({...cadastrarServicoForm, [`${event.target.name}`]:{
			...cadastrarServicoForm[`${event.target.name}`], value: event.target.value}});
	};

	const criarAgendamento = async () => {
		try {
			const response = await fetch(`${url}/agendamentos`, {
				method: "POST",
				body: JSON.stringify(cadastrarServicoForm),
				headers: new Headers(`Bearer ${JSON.parse(localStorage.getItem("webarberUser")).sessionToken}`)
			});
			alert(await response.json())
		} catch (error) {
			console.log(error);
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
			<div className="container">
				{servicos.length > 0 && Object.keys(cadastrarServicoForm).map((field) => 
					<Input elementType={cadastrarServicoForm[`${field}`].elementType} label={cadastrarServicoForm[`${field}`].label}
						value={cadastrarServicoForm[`${field}`].value} elementConfig={cadastrarServicoForm[`${field}`].elementConfig}
						options={cadastrarServicoForm[`${field}`].options} disabled={cadastrarServicoForm[`${field}`].disabled}
						handleOnChange={handleOnChange} style={null}/>
					)}
				<Button buttonColors={1} id="btn agendamento" buttonText="Realizar Agendamento" handleOnClick={() => criarAgendamento()} style={buttonStyle}/>
			</div>
		</>

	)
}

export default CadastrarAgendamento;