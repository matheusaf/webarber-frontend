import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import webarber from "../images/webarber.png";


export default function Log() {
    // Hooks
    const [login, setLogin] = useState({email: '', password: ''});

    const updateForm = (event) => setLogin({...login, [event.target.name]: event.target.value});

    const loginUser = async(user) => {
        try {
            await fetch("https://localhost:8080/users", {
                method: "post",
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(user)
            });
            // const json = await res.json();
            // setAlert({show: true, success: true, message: `Animal Created`})
            setLogin({});
        } catch(err) {
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(login);
        loginUser(login);
    }
    
    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><b>Nome:</b></div>
                        </div>
                        <input id="nome" name="nome" className="form-control" type="text" placeholder="Digite o seu nome" onChange={updateForm} required={true}/>
                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><b>Senha:</b></div>
                        </div>
                        <input id="password" className="form-control" name="password" minLength="8" maxLength="12" type="password" placeholder="Digite sua senha" onChange={updateForm} required={true}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Login</button>
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
