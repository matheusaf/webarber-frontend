import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Flag from '../Alert/Flag';
import { Zoo } from '../../Models/Zoo';
import webarber from "../images/webarber.png";


export default function Create() {
    // Hooks
    const [registrationForm, setRegistrationForm] = useState('');

    const updateForm = (event) => setRegistrationForm({...registrationForm, [event.target.name]: event.target.value});

    const createUser = async(user) => {
        try {
            await fetch("https://localhost:8080/users", {
                method: "post",
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(user)
            });
            // const json = await res.json();
            // setAlert({show: true, success: true, message: `Animal Created`})
            setRegistrationForm({});
        } catch(err) {
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createUser(registrationForm);
    }
    
    return (
        <div className="conteiner d-flex justify-content-center">
            <div className="card text-center">
                <div class="card-header">
                    <img className="card-img-top-center" src={webarber} alt="webarber logo" style={{width: "310px", height: "90px"}}></img>
                </div>
                <div class="card-body">
                    <br></br>
                    <form onSubmit={handleSubmit} >
                        <fieldset>
                            <div className="form-row">
                                <div className="col-4 offset-4">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><b>E-mail</b></div>
                                        </div>
                                    <input id="email" name="email" className="form-control" type="text" placeholder="Digite seu e-mail" onChange={updateForm
                                    }/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-4 offset-4">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><b>Senha:</b></div>
                                        </div>
                                        <input id="senha" className="form-control" name="password" minLength="8" maxLength="12" type="password" value = {this.state.usuario.senha} placeholder="Digite sua senha" onChange={this.handleSenha}/>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className={this.handleSignInButton()} onClick={this.handleSignIn}>Cadastrar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
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
