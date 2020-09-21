import React, { Component } from 'react';
import webarber from "../images/webarber.png";

class Login extends Component {
    state = {
       usuario: {
            nome: "",
            sobrenome: "",
            email: "",
            confirmarEmail: "",
            senha: "",
            confirmarSenha: ""
       },
       loginPage: true,
       fields: {
            nome: ["Nome:", "Digite seu nome"],
            sobrenome: ["Sobrenome:", "Digite seu Sobrenome"],
            confirmarEmail: ["Confirmar E-mail", "Confirme seu e-mail"],
            confirmarSenha: ["Confirmar Senha", "Confirme sua senha"]
       }
    }

    render() { 
        return (
            <div className="jumbotron d-flex align-items-center" style= { { backgroundColor:'black'} }>
                <div className="conteiner h-120" style={ {display: 'flex', justifyContent: 'center', alignItems:'center', backgroundColor:'black'} }>
                    <div className="card text-center" style={{width: '116rem', height: '280px', backgroundColor: 'black', justifyContent: 'center'}}>
                        <div>
                            <img className="card-img-top-center" src={webarber} alt=" " style={{width: "310px", height: "90px"}}></img>
                        </div>
                        <br></br>
                        <form>
                            {this.state.loginPage === false ? this.handleSignInPageFields('nome') : ""}
                            {this.state.loginPage === false ? this.handleSignInPageFields('sobrenome') : ""}
                            <div className="form-row">
                                <div className="col-4 offset-4">
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><b>Email</b></div>
                                        </div>
                                    <input id="email" name="email" className="form-control" type="text" placeholder="Digite seu e-mail" value={this.state.usuario.email} onChange={this.handleEmail}/>
                                    </div>
                                </div>
                            </div>
                            {this.state.loginPage === false ? this.handleSignInPageFields('confirmarEmail') : ""}
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
                            {this.state.loginPage === false ? this.handleSignInPageFields('confirmarSenha') : ""}
                                <button type="button" className={this.handleLoginButton()} onClick={this.handleLogin}>Login</button>
                                <button type="button" className={this.handleSignInButton()} onClick={this.handleSignIn}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
                )
    }
    
    handleSignInAttributes = (fieldname, event) =>{
        this.setState({ usuario: {
                    ...this.state.usuario,
                    [fieldname]: event.target.value}
                      }
                    )
    }

    handleEmail = (event) => {
        this.setState({ usuario: {
            ...this.state.usuario,
                email: event.target.value}
            }
        )
    }
    handleSenha = (event) => {
        this.setState({ usuario: {
            ...this.state.usuario,
                senha: event.target.value}
            }
        )
    }
     
    handleSignInPageFields = (fieldName) => {
        if(this.state.loginPage === true){
            return ""
        }
        else{
            return(
                <div className="form-row">
                    <div className="col-4 offset-4">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><b>{this.state.fields[fieldName][0]}</b></div>
                            </div>
                        <input id={fieldName} name={fieldName} className="form-control" type={fieldName==="confirmarSenha" ? "password" : "text"}  minLength={fieldName==="confirmarSenha" ? "8" : "1"} maxLength={fieldName==="confirmarSenha" ? "12" : "99"} placeholder={this.state.fields[fieldName][1]} value={this.state.usuario[fieldName]} onChange={(event) => {this.handleSignInAttributes(fieldName, event)}}/>
                        </div>
                    </div>
                </div>
            )
        }
    }

    handleLoginButton = () => {
        let className = "btn btn-light";
        return (this.state.usuario.email !== "" && this.state.usuario.senha !== "" && this.state.usuario.senha.length >= 8) ? `${className} active mr-2` : `${className} disabled mr-2`;
    }

    handleSignInButton = (fieldName) => {
        let className = "btn btn-light";
        let valid = (this.state.usuario.nome !== "" && this.state.usuario.sobrenome !== "" &&
                     this.state.usuario.email === this.state.usuario.confirmarEmail &&
                     this.state.usuario.email !== "" && this.state.usuario.senha !== "" &&
                     this.state.usuario.senha === this.state.usuario.confirmarSenha);
        return valid === true ? `${className} active mr-2` : `${className} disabled mr-2`;
    }

    handleLogin = async () => {
        // let baseUrl = "https://webarber-back.herokuapp.com"
        let baseUrl = 'localhost:8080';

        console.log(baseUrl);
        if(this.state.loginPage === false){
            this.setState({loginPage: true});
        }
        else{
            let users = await fetch(`${baseUrl}/login`, {
                method:"post",
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({email: this.state.usuario.email, password: this.state.usuario.senha})
            })
            users = await users.json();
            alert(users.message);
        }
    }

     handleSignIn = async () => {
        // let baseUrl = "https://webarber-back.herokuapp.com"
        let baseUrl = 'localhost:8080';
        if(this.state.loginPage === true){
            this.setState({loginPage: false});
        }
        else{
            const url = `${baseUrl}/users`;
            console.log("start")
            let user = {nome: this.state.usuario.nome, 
                        sobrenome: this.state.usuario.sobrenome,
                        email: this.state.usuario.email,
                        password: this.state.usuario.senha,
                        idTipo: 1
                        };
            const response = await fetch(url, {
                                    method: "post",
                                    headers: new Headers({ 'Content-Type': 'application/json' }),
                                    body: JSON.stringify(user)
                            })
            const message = await response.json();
            console.log(message);
            if(message.status===201){
                alert("Usuário cadastrado.");
            }
            else{
                alert("Usuário já cadastrado.");
            }
        }
    }
}
 
export default Login;