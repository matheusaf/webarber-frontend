import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import webarber from "../images/webarber.png";


export default function Register() {
    // Hooks
    const [registrationForm, setRegistrationForm] = useState('');

    const updateForm = (event) => setRegistrationForm({ ...registrationForm, [event.target.name]: event.target.value });

    const createUser = async (user) => {
        try {
            await fetch("https://localhost:8080/users", {
                method: "post",
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(user)
            });
            // const json = await res.json();
            // setAlert({show: true, success: true, message: `Animal Created`})
            setRegistrationForm({});
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        console.log(registrationForm);
        event.preventDefault();
        createUser(registrationForm);
    }

    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><b>Nome:</b></div>
                        </div>
                        <input id="nome" name="nome" className="form-control" type="text" placeholder="Digite o seu nome" onChange={updateForm} required={true} />
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><b>Sobrenome:</b></div>
                        </div>
                        <input id="sobrenome" name="sobrenome" className="form-control" type="text" placeholder="Digite o seu sobrenome" onChange={updateForm} required={true} />
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><b>Senha:</b></div>
                        </div>
                        <input id="password" className="form-control" name="password" minLength="8" maxLength="12" type="password" placeholder="Digite sua senha" onChange={updateForm} required={true} />
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><b>Confirme a sua Senha:</b></div>
                        </div>
                        <input id="confirmacaoSenha" className="form-control" name="confirmacaoSenha" minLength="8" maxLength="12" type="password" placeholder="Confime a sua senha" onChange={updateForm} required={true} />
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><b>CPF/CNPJ:</b></div>
                        </div>
                        <input id="CPF" className="form-control" name="CPF" minLength="11" maxLength="15" type="text" placeholder="123.456.789-10" pattern="(\d{3}\.){3}(\d{2})" onChange={updateForm} required={true} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </fieldset>
            </form>
        </div>
    )
}


// import React from 'react';
// import { render } from '@testing-library/react';
// import Experiment from '../Experiment';

// test('renders learn react link', () => {
//     const { getByText } = render(<Experiment />);
//     const linkElement = getByText(/Hey, stranger/i);
//     expect(linkElement).toBeInTheDocument();
// });
