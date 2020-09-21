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
            nome: ["Nome", "Digite seu nome"],
            email: ["E-mail", "Digite seu e-mail"],
            sobrenome: ["Sobrenome", "Digite seu Sobrenome"],
            confirmarEmail: ["Confirmar E-mail", "Confirme seu e-mail"],
            senha: ["Senha", "Digite sua sneha"],
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
                            {this.handleSignInPageFields('email')}
                            {this.state.loginPage === false ? this.handleSignInPageFields('confirmarEmail') : ""}
                            {this.handleSignInPageFields('senha')}
                            {this.state.loginPage === false ? this.handleSignInPageFields('confirmarSenha') : ""}
                                <button type="button" className={this.handleLoginButton()} onClick={this.handleLogin}>Login</button>
                                <button type="button" className={this.handleSignInButton()} onClick={this.handleSignIn}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
                )
    }
    
    handleAttributes = (fieldname, event) =>{
        this.setState({ usuario: {
                    ...this.state.usuario,
                    [fieldname]: event.target.value}
                      }
                    )
    }
     
    handleSignInPageFields = (fieldName) => {
        if(this.state.loginPage === true && fieldName !== "email" && fieldName !== "senha"){
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
                        <input id={fieldName} name={fieldName} className="form-control" type={fieldName==="confirmarSenha" || fieldName === "senha" ? "password" : "text"}  minLength={fieldName==="confirmarSenha" ? "8" : "1"} maxLength={fieldName==="confirmarSenha" ? "12" : "99"} placeholder={this.state.fields[fieldName][1]} value={this.state.usuario[fieldName]} onChange={(event) => {this.handleAttributes(fieldName, event)}}/>
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
        let baseUrl = "https://webarber-back.herokuapp.com"        
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
        let baseUrl = "https://webarber-back.herokuapp.com"
        if(this.state.loginPage === true){
            this.setState({loginPage: false});
        }
        else{
            if(this.state.usuario.email !== this.state.usuario.confirmarEmail){
                alert("E-mail incompatíveis.")
            }
            else if(this.state.usuario.senha === this.state.usuario.confirmarSenha){
                alert("Senhas incompatíveis.")
            }
            else if(this.state.usuario.senha.length <8 && this.state.usuario.confirmarSenha.length < 8){
                alert("Senha precisa entre 8 e 12 caracteres.")
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
                if(response.status !== 400){
                    alert("Usuário cadastrado.");
                }
                else{
                    alert("Usuário já cadastrado.");
                }
            }
        }
    }
}
 
export default Login;