import * as React from 'react';
import { useState, useEffect } from 'react';
import { User, UserRoleType, UserInputType } from '../types';
import {validateEmail, validateDate, validateCpf, validatePassword} from './validationHelpers';
import { createUser } from './UserListQueries';
import { Redirect } from 'react-router-dom';


export const AddUserPage: React.FC = props => {

  const [userName, setUserName] = useState({ value:"", valid: true});
  const [userCpf, setUserCpf] = useState({ value:"", valid: true});
  const [userBirthDate, setUserBirthdate] = useState({ value:"", valid: true});
  const [userEmail, setUserEmail] = useState({ value:"", valid: true});
  const [userRole, setUserRole] = useState({ value:UserRoleType.user, valid: true});
  const [userPassword, setUserPassword] = useState({ value:"", valid: true});
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;

    const mapField: { [key: string]: ({value, valid} : {value: any, valid:boolean}) => void } = {
      name: setUserName,
      cpf: setUserCpf,
      birthDate: setUserBirthdate,
      email: setUserEmail,
      role: setUserRole,
      password: setUserPassword,
    };

    mapField[name]({value: value, valid: true});
  }

  async function handleSubmit(){

    var isValid = validateEmail(userEmail.value) && validateDate(userBirthDate.value) && validateCpf(userCpf.value) &&
    validatePassword(userPassword.value) && !(userName.value);

    if (isValid){
      setIsLoading(true);
      var userInput: UserInputType = {
        email: userEmail.value,
        birthDate: userBirthDate.value,
        cpf: userCpf.value,
        password: userPassword.value,
        name: userName.value,
        role: UserRoleType[userRole.value]
      }
      try{
        await createUser(userInput);
        setIsLoading(false);
        setRedirect(true);
      }
      catch(error){
        alert(error);
        setIsLoading(false);
      }

    }
    else{
      setUserEmail({value: userEmail.value, valid: validateEmail(userEmail.value)});
      setUserBirthdate({value: userBirthDate.value, valid: validateDate(userBirthDate.value)});
      setUserCpf({value: userCpf.value, valid: validateCpf(userCpf.value)});
      setUserPassword({value: userPassword.value, valid: validatePassword(userPassword.value)});
      setUserName({value: userName.value, valid: !(userName.value == "")});
      setUserRole({value: userRole.value, valid: true});
    }

  }

  if (redirect) {
    return <Redirect push to="/users" />;
  }
  return(
    <div className="body">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <h1> Cadastro de Usuário </h1>
      <div className="inputArea">
        <InputText name="name" label="Nome" value={userName.value} onChange={handleChange} className={!userName.valid ? "inputFieldError" : ""} />
        <InputText name="email" label="Email" value={userEmail.value} onChange={handleChange} className={!userEmail.valid ? "inputFieldError" : ""}/>
        <InputText name="password" label="Senha" value={userPassword.value} onChange={handleChange} type="password" className={!userPassword.valid ? "inputFieldError" : ""}/>
        <InputText name="cpf" label="CPF" value={userCpf.value} onChange={handleChange} className={!userCpf.valid ? "inputFieldError" : ""}/>
        <InputText name="birthDate" label="Data de Nascimento" value={userBirthDate.value} onChange={handleChange} type="date" className={!userBirthDate.valid ? "inputFieldError" : ""}/>
        {/* Vou componentizar mais tarde */}
        <div className="inputField">
          <label>Cargo</label> <br></br>
          <select name="role" onChange={handleChange} value={userRole.value}>
            <option value={UserRoleType.admin}> Administrador </option>
            <option value={UserRoleType.user}> Usuário </option>
          </select>
        </div>
      </div>
      <button className="submitButton secondary" onClick={() => setRedirect(true)}> Cancelar </button>
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

const InputText: React.FC<InputProps> = props => (
  <div className="inputField">
    <label>{props.label}</label> <br></br>
    <input placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.onChange}
    type={props.type} className={props.className}></input>
  </div>
);
