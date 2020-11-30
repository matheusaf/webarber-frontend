import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../User/UserContext";
import Modal from "react-modal";
import Button from "../UI/Button/Button";
import RatingIcon from "../UI/RatingIcon/RatingIcon";
import Input from "../UI/Forms/Input/Input";
import Loading from "../UI/Loading/Loading";

const url = process.env.REACT_APP_BASE_URL;

const AvaliacaoModal = ({sessionToken, isOpen, setIsOpen, idAgendamento}) => {
	const [nota, setNota] = useState(0);
	const [loading, setLoading] = useState(false);
	const [avaliacaoForm, setAvaliacaoForm] = useState({
			titulo:{
				elementType: "input",
				elementConfig: {
					id: "titulo",
					name: "titulo",
					type: "text",
					placeholder: "Escreva seu Título..."
				},
				label: "Título",
				value: "",
				validation: {
					
				},
				valid: false,
				touched: false
			},
			comentario:{
				elementType: "textarea",
				elementConfig: {
					id: "comentario",
					name: "comentario",
					type: "text",
					placeholder: "Escreva seu comentário..."
				},
				label: "Comentário",
				value: "",
				validation: {

				},
				valid: false,
				touched: false
			},
			valid: false
		}
	);

	const modalStyle = {
		content:{
			backgroundColor: "black",
			height:"45%",
			top: "20%",
			left: "10%",
			right: "20%",
			bottom: "20%",
		}
	};

	const handleOnChange = (event) => {
		setAvaliacaoForm({...avaliacaoForm, [`${event.target.name}`]: {
				...avaliacaoForm[`${event.target.name}`], value: event.target.value
		}})
	};

	const fetchAvaliacao = async () => {

	};

	useEffect(() => {
		
	},[]);

	const criarAvalicao = async () => {
		try{
			let avaliacao = JSON.stringify({
				nota: nota,
				titulo: avaliacaoForm.titulo.value,
				descricao: avaliacaoForm.comentario.value,
				idAgendamento: idAgendamento
			});
			let req = await fetch(`${url}/avaliacoes`, { method: "post",
														 headers: new Headers({"Content-Type":"application/json",
																				"Authorization":`Bearer ${sessionToken}`}),
														body: avaliacao});
			if(req.status === 200){
				alert("Avaliação salva com sucesso.");
			}
			else{
				let { message } = await req.json();
				alert(message);
			}
		}
		catch(err){
			alert(err);
		}
	};

	const handleOnClick = async () => {
		setLoading(true);
		await criarAvalicao();
		setLoading(false);
	};

	const renderModal = () => {
		return(
			<Modal isOpen={isOpen} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} 
				   style={modalStyle} ariaHideApp={false}>
				<div>
					<div>
						<Button buttonColors={2} buttonText="X" handleOnClick={()=>setIsOpen(false)}/>
					</div>
					<div>
						<h3 style={{color:"#2bce3b", display:"flex", justifyContent:"center"}}>Deixe sua avaliação</h3>
					</div>
					<div style={{display:"flex", justifyContent:"center"}}>
						<RatingIcon getRatingValue={setNota}/>
					</div>
					<div>
						{Object.keys(avaliacaoForm).map((field) => {
									return (
										<Input elementType={avaliacaoForm[`${field}`].elementType} elementConfig={avaliacaoForm[`${field}`].elementConfig}
										 		label={avaliacaoForm[`${field}`].label}	value={avaliacaoForm[`${field}`].value} 
												handleOnChange={handleOnChange} />
									);
						}) }
					</div>
					<div>
						<Button buttonColors={1} buttonText="Avaliar" handleOnClick={handleOnClick}/>
					</div>
				</div>
			</Modal>
		);
	};

	return (
			<div>
				{loading ? <Loading/> : renderModal()}
			</div>
	);
};

export default AvaliacaoModal;