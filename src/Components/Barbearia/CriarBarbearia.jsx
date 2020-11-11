import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import FormularioBarbearia from './FormularioBarbearia'
import { UserContext } from '../../UserContext'
// import { fromAddress } from 'react-geocode';
import { Helmet } from 'react-helmet';

export default function CriarBarbearia(){
    const { webarberUser } = useContext(UserContext);
    const [create, setCreate] = useState({
        nome: '', endereco: '', enderecoNumero: '', bairro: '', cep:'',
        cidade: '', estado: '', telefone: '', horarioAbertura: '10:10:10', horarioFechamento: '22:22:22', user_id: 1
        // activeDay: "Seg",
        // Seg: {hrAbertura: '', hrFechamento:''},
        // Ter: {hrAbertura: '', hrFechamento:''},
        // Qua: {hrAbertura: '', hrFechamento:''},
        // Qui: {hrAbertura: '', hrFechamento:''},
        // Sex: {hrAbertura: '', hrFechamento:''},
        // Sab: {hrAbertura: '', hrFechamento:''},
        // Dom: {hrAbertura: '', hrFechamento:''}
    });
    const [alert, setAlert] = useState({show: false, message: `Erro ao criar`});


        const handleSubmit = async (e) => {
        e.preventDefault();
        // create.endereco = [create.rua, create.enderecoNumero, create.bairro, create.cidade, create.estado].join(',');
        try {
            let horarioAbertura = new Date();
            horarioAbertura.setHours(...create.horarioAbertura.split(':'));
            create.horarioAbertura = horarioAbertura;

            let horarioFechamento = new Date();
            horarioFechamento.setHours(...create.horarioFechamento.split(':'));
            create.horarioFechamento = horarioFechamento

            const url = "http://localhost:8080"
            const response = await fetch(`${url}/barbearias`, {
                method: "post",
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(create)
            })
            let json = await response.json();
            if (response.status !== 201) {
                throw new Error(json.message);
            }
            setCreate({
                nome: '', endereco: '', enderecoNumero: '', bairro: '',
                cidade: '', estado: '', telefone: '', horarioAbertura: '10:10:10', horarioFechamento: '22:22:22', user_id: Number(localStorage.getItem('userId'))
            });
        } catch (err) {
            setAlert({show: true, ...alert})
        }
    }
       const handleButtonState = () => {
        for (let prop of Object.keys(create)) {
            if (!create[prop] && create[prop].length < 2)
                return false;
        }
        return true;
    }

       const handleButtonClass = () => {
        return `btn btn-custom ${(handleButtonState())? "active" : "disabled"}`;
    }

        const handleCreateError = () => {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>{alert.message}</strong>
            </div>
        );
    }

    return (
            <>
                <Helmet>
                    <title>Cadastrar barbearia</title>
                </Helmet>
                <div>
                    <form onSubmit={handleSubmit}>
                        <FormularioBarbearia create={create} setCreate={setCreate} ></FormularioBarbearia>
                        <button disabled={!handleButtonState} className={handleButtonClass()} style = {{ margin: "auto", display:"flex", justifyContent:"center" }}>Cadastrar Barbearia</button>
                        {alert.show && handleCreateError()}
                    </form> 
                </div>
            </>
    )
}
