import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../types';
import {validateEmail, validateDate, validateCpf} from './validationHelpers';


export const AddUserPage: React.FC = props => {

  const [userName, setUserName] = useState({ value:"", valid: true});
  const [userCpf, setUserCpf] = useState({ value:"", valid: true});
  const [userBirthDate, setUserBirthdate] = useState({ value:"", valid: true});
  const [userEmail, setUserEmail] = useState({ value:"", valid: true});
  const [userRole, setUserRole] = useState({ value:"", valid: true});
  const [userPassword, setUserPassword] = useState({ value:"", valid: true});

  function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;

    const mapField: { [key: string]: ({value, valid} : {value: string, valid:boolean}) => void } = {
      name: setUserName,
      cpf: setUserCpf,
      birthDate: setUserBirthdate,
      email: setUserEmail,
      role: setUserRole,
    };

    mapField[name]({value: value, valid: true});
  }

  function handleSubmit(){

    setUserEmail({value: userEmail.value, valid: validateEmail(userEmail.value)});
    setUserBirthdate({value: userBirthDate.value, valid: validateDate(userBirthDate.value)});
    setUserCpf({value: userCpf.value, valid: validateCpf(userCpf.value)});
    setUserName({value: userName.value, valid: !(userName.value == "")});
    setUserRole({value: userRole.value, valid: !(userRole.value == "")})

  }

  return(
    <div className="body">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <h1> Cadastro de Usuário </h1>
      <div className="inputArea">
        <Input name="name" label="Nome" value={userName.value} onChange={handleChange} className={!userName.valid ? "inputFieldError" : ""} />
        <Input name="email" label="Email" value={userEmail.value} onChange={handleChange} className={!userEmail.valid ? "inputFieldError" : ""}/>
        <Input name="cpf" label="CPF" value={userCpf.value} onChange={handleChange} className={!userCpf.valid ? "inputFieldError" : ""}/>
        <Input name="birthDate" label="Data de Nascimento" value={userBirthDate.value} onChange={handleChange} type="date" className={!userBirthDate.valid ? "inputFieldError" : ""}/>
        <Input name="role" label="Cargo" value={userRole.value} onChange={handleChange} className={!userRole.valid ? "inputFieldError" : ""}/>
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
