import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../types';
import {validateEmail, validateDate, validateCpf} from './validationHelpers';


export const AddUserPage: React.FC = props => {

  const [userName, setUserName] = useState("");
  const [badName, setBadName] = useState(false);
  const [userCpf, setUserCpf] = useState("");
  const [badCpf, setBadCpf] = useState(false);
  const [userBirthDate, setUserBirthdate] = useState("");
  const [badDate, setBadDate] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [badRole, setBadRole] = useState(false);

  function handleChange(event: any) {
    const name = event.target.name;

    switch(name){
      case "name":
        setUserName(event.target.value);
        break;
      case "cpf":
        setUserCpf(event.target.value);
        break;
      case "birthDate":
        setUserBirthdate(event.target.value);
          break;
      case "email":
        setUserEmail(event.target.value);
          break;
      case "role":
        setUserRole(event.target.value);
        break;
      default:
    }
  }

  function handleSubmit(){

    var badEmailtmp = false, badCpftmp = false, badDatetmp = false;

    if (!validateEmail(userEmail)){
      if (userEmail == ""){
        alert('Forneça um endereço de email');
      }
      else {
        alert('Email inválido');
      }
      badEmailtmp = true;
    }
    else{
      badEmailtmp = false;
    }
    if (!validateDate(userBirthDate)){
      alert('Data inválida');
      badDatetmp = true;
    }
    else{
      badDatetmp = false;
    }

    if (!validateCpf(userCpf)){
      if (userCpf == ""){
        alert('Forneça o CPF');
      }
      else {
        alert('CPF inválido');
      }
      badCpftmp = true;
    }
    else{
      badCpftmp = false;
    }

    if (userName == ""){
      setBadName(true);
      alert("Adicione nome");
    }
    else{
      setBadName(false);
    }

    if (userRole == ""){
      setBadRole(true);
      alert("Adicione cargo");
    }
    else{
      setBadRole(false);
    }

    setBadDate(badDatetmp);
    setBadCpf(badCpftmp);
    setBadEmail(badEmailtmp);
  }

  return(
    <div className="body">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <h1> Cadastro de Usuário </h1>
      <div className="inputArea">
        <Input name="name" label="Nome" value={userName} onChange={handleChange} className={badName ? "inputFieldError" : ""} />
        <Input name="email" label="Email" value={userEmail} onChange={handleChange} className={badEmail ? "inputFieldError" : ""}/>
        <Input name="cpf" label="CPF" value={userCpf} onChange={handleChange} className={badCpf ? "inputFieldError" : ""}/>
        <Input name="birthDate" label="Data de Nascimento" value={userBirthDate} onChange={handleChange} type="date" className={badDate ? "inputFieldError" : ""}/>
        <Input name="role" label="Cargo" value={userRole} onChange={handleChange} className={badRole ? "inputFieldError" : ""}/>
      </div>
      <button className="submitButton secondary"> Cancelar </button>
      <button className="submitButton" onClick={handleSubmit}> Salvar</button>
    </div>

  );
}

interface InputProps{
  label?: string,
  name: string,
  value: any,
  placeholder?: any,
  type?: string,
  className?: string,
  onChange: (event: any) => void
}

const Input: React.FC<InputProps> = props => (
  <div className="inputField">
    <label>{props.label}</label> <br></br>
    <input placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange}
    type={props.type} className={props.className}></input>
  </div>
);
