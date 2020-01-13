// src/components/LoginPage.tsx

import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { func } from 'prop-types';
import { client } from '..';
import { Redirect } from 'react-router-dom';

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
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState>  {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {email: '', password: '', badPassword: false, badEmail: false, redirect: false};

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

      try{
        await doLogin(this.state.email, this.state.password);
        this.setState({badEmail: badEmailtmp, badPassword: badPasswordtmp, redirect:true});
      }
      catch(error){
        alert(error);
        this.setState({badEmail: badEmailtmp, badPassword: badPasswordtmp, redirect:false});
      }

    }

  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/users"></Redirect>
    }
    else {
      return (
          <div className="login">
            <h1 className="greeting">
              Bem-vindo(a) à Taqtile!
            </h1>
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
                  <button onClick={this.handleSubmit} className="submitButton">Entrar</button>
              </form>
            </div>
          </div>
      );
    }
  }
}

export default LoginPage;

function validateEmail(email: string)
{
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(password: string)
{
  var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
  return re.test(password);
}

function storeToken(token: string)
{
  localStorage.setItem("@onboarding/token", token);
}

function mostraToken(){
  var testeToken = localStorage.getItem("@onboarding/token");
  alert("O token eh " + testeToken);
}

async function doLogin(email:string,password:string) : Promise<void>
{
  const LOGIN_MUTATION = gql`
  mutation Authenticate{
    Login(data: {email: "${email}", password: "${password}"})
    {
      token
    }
  }
  `;

  var result = await client.mutate({mutation: LOGIN_MUTATION});
  storeToken(result.data.Login.token);
}

