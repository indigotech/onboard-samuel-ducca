// src/components/LoginPage.tsx

import * as React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { doLogin } from './LoginAuth';
import {validateEmail, validatePassword} from './validationHelpers';
import { H1 } from './atm/h1';
import { Button } from './atm/button';
import { LoadingButton } from './mol/loadingButton';

interface LoginPageProps {
  email?: string;
  password?: string;
}

interface LoginPageState {
  email: string;
  password: string;
  badPassword: boolean;
  badEmail: boolean;
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
        alert('Forneça um endereço de email');
      }
      else {
        alert('Email inválido');
      }
      badEmailtmp = true;
    }

    if (!validatePassword(this.state.password)){
      if (this.state.password == ""){
        alert('Forneça uma senha');
      }
      else {
        alert('A senha deve ter pelo menos 7 caracteres e conter ao menos um dígito e uma letra');
      }
      badPasswordtmp = true;
    }

    event.preventDefault();

    if (!badEmailtmp && !badPasswordtmp){
      this.setState({isLoading:true});
      try{
        await doLogin(this.state.email, this.state.password);
        this.setState({badEmail: badEmailtmp, badPassword: badPasswordtmp, redirect:true, isLoading: false});
      }
      catch(error){
        alert(error);
        this.setState({badEmail: badEmailtmp, badPassword: badPasswordtmp, redirect:false, isLoading: false});
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
            <div className="inputArea">

              <form>
                  <div className="inputField" >
                      <label>Email</label> <br></br>
                      <input className={this.state.badEmail ? 'inputFieldError': ''} name="email" value={this.state.email} onChange={this.handleChange} placeholder="nome.sobrenome@taqtile.com"></input>
                  </div>
                  <div className="inputField">
                      <label>Senha</label> <br></br>
                      <input className={this.state.badPassword ? 'inputFieldError': ''} name="password" value={this.state.password} onChange={this.handleChange}></input>
                  </div>
                  <Button onClick={this.handleSubmit} disabled={this.state.isLoading}>Teste de entrar</Button>
                  <LoadingButton onClick={this.handleSubmit} isLoading={this.state.isLoading} text="Entrar" disabled={this.state.isLoading}/>
                  <button onClick={this.handleSubmit} className='submitButton' disabled={this.state.isLoading}>
                    <i className={this.state.isLoading? 'fa fa-circle-o-notch fa-spin' : ''}></i> Entrar
                  </button>
              </form>
            </div>
          </div>
      );
    }
  }
}

export default LoginPage;





