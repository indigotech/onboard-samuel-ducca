
import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUser } from './UserListQueries';
import { User } from '../types';
import { userInfo } from 'os';

interface UseParamsType {
  id?: string;
}

 const UserDetailPage: React.FC = props => {
   const id: UseParamsType = useParams();
   const [user, setUser] = useState();
   const [redirect, setRedirect] = useState(false)

   useEffect(() => {

    async function getUser() {
      var idNum = parseInt(id.id ? id.id : "");
      try{
        var response = await fetchUser(idNum);
        setUser(response);
      }
      catch(error){
        alert(error);
      }
    }

    getUser();

  }, []);

  if (redirect) {
    return <Redirect push to="/users" />;
  }

   return(
    <div className="body">
      <h1> Dados do Usuário </h1>
      {user ? (
        <>
          <UserInfo user={user}/>
          <button className="submitButton secondary" onClick={() => setRedirect(true)}> Voltar </button>
        </>
      ) : (
        <h2> Carregando... </h2>
      )}

    </div>
  );
}

export default UserDetailPage;

interface UserInfoProps{
  user: User
}

const UserInfo: React.FC<UserInfoProps> = props => (
  <div className="userInfo">
      <h2>{props.user.name}</h2>
      <p><b>Email: </b>{props.user.email}</p>
      <p><b>CPF: </b>{props.user.cpf}</p>
      <p><b>Data de Nascimento: </b>{props.user.birthDate}</p>
      <p><b>Cargo: </b>{props.user.role}</p>
      <hr></hr>
  </div>
);

