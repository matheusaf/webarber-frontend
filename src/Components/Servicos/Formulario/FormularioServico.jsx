import React, { useState, useEffect, useContext } from 'react';
import Input from '../../UI/Forms/Input/Input';
import Button from '../../UI/Button/Button';
import NavBar from '../../UI/NavBar/NavBar';
import Loading from '../../UI/Loading/Loading';
import { UserContext } from '../../User/UserContext';

const CadastrarServico = () => {
	const { webarberUser } = useContext(UserContext);
	const { servicoForm, setServicoForm} = useState({
		nome: {
			elementType: "text",
			elementConfig:{
				id: "nome",
				name:"nome",
				type: "text",
				placeholder: "Nome"
			},
			label: "Nome Serviço",
			value: ""
		},
		preco: {
			elementType: "text",
			elementConfig:{
				id: "preco",
				name:"preco",
				type: "text",
				placeholder: "Preço"
			},
			label: "Preço Serviço",
			value: ""
		},
		descricao: {
			elementType: "text",
			elementConfig:{
				id: "descricao",
				name:"descricao",
				type: "text",
				placeholder: "Descrição"
			},
			label: "descricao",
			value: ""
		}
	})

	const handleOnClick = () => {
		console.log('here');
	}

	const handleOnChange = (event) => {
		setServicoForm({...servicoForm, [event.target.name]: {
			...servicoForm[event.target.name], value: event.target.value
		}})
	}
	return (
		<>
			<NavBar/>
			{console.log(Object.keys(servicoForm))}
			{Object.keys(servicoForm).map(field => 
				<Input elementType={servicoForm[field].elementType} elementConfig={servicoForm[field].elementConfig}
						label={servicoForm[field].label} value={servicoForm[field].value}
						handleOnChange={handleOnChange}/>)}
		</>
	)
}

export default CadastrarServico;