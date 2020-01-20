// src/components/LoginPage.tsx

import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { doLogin } from './LoginAuth';
import {validateEmail, validatePassword} from './validationHelpers';
import { H1 } from './atm/h1';
import { LoadingButton } from './mol/loadingButton';
import { InputText } from './mol/InputText';

interface LoginPageProps {
  email?: string;
  password?: string;
}

interface LoginPageState {
  email: string;
  password: string;
  badPassword: boolean;
  badEmail: boolean;
  emailError: string,
  passwordError: string,
  redirect: boolean;
  isLoading: boolean;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState>  {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      badPassword: false,
      badEmail: false,
      emailError: '',
      passwordError: '',
      redirect: false,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleChange(event: any) {
    const name = event.target.name;

    if (name == "password"){
      this.setState({password: event.target.value});
    }
    else if (name == "email"){
      this.setState({email: event.target.value});
    }
  }

  async handleSubmit(event: any) {

    var badEmailtmp = false, badPasswordtmp = false;

    if (!validateEmail(this.state.email)){
      if (this.state.email == ""){
        this.setState({emailError: "Forneça um endereço de email"});
      }
      else {
        this.setState({emailError: "Email inválido"});
      }
      badEmailtmp = true;
    }

    if (!validatePassword(this.state.password)){
      if (this.state.password == ""){
        this.setState({passwordError: "Forneça uma senha"});
      }
      else {
        this.setState({passwordError: "A senha deve ter pelo menos 7 caracteres e conter ao menos um dígito e uma letra"});
      }
      badPasswordtmp = true;
    }

    event.preventDefault();
    this.setState({badEmail: badEmailtmp, badPassword: badPasswordtmp});

    if (!badEmailtmp && !badPasswordtmp){
      this.setState({isLoading:true});
      try{
        await doLogin(this.state.email, this.state.password);
        this.setState({redirect:true, isLoading: false});
      }
      catch(error){
        alert(error);
        this.setState({redirect:false, isLoading: false});
      }

    }


  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/users"></Redirect>
    }
    else {
      return (
          <div className="body">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <H1>Bem-vindo(a) à Taqtile!</H1>

            <InputText name="email" value={this.state.email} onChange={this.handleChange} label="Email"
                errorCaption={this.state.emailError} error={this.state.badEmail} placeholder="nome.sobrenome@taqtile.com"/>
            <InputText name="password" value={this.state.password} onChange={this.handleChange} label="Senha"
                errorCaption={this.state.passwordError} error={this.state.badPassword} type="password"/>
            <LoadingButton onClick={this.handleSubmit} isLoading={this.state.isLoading} text="Entrar" disabled={this.state.isLoading}/>

          </div>
      );
    }
  }
}

export default LoginPage;





