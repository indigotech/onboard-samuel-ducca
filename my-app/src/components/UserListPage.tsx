// src/components/UserListPage.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../types';
import {fetchUsers} from './UserListQueries'

const UserListPage: React.FC = props => {
  const [userList, setUserList] = useState();

  useEffect(() => {

    async function getUserList() {
      try{
        setUserList(await fetchUsers());
      }
      catch(error){
        alert(error);
      }
    }

    getUserList();

  }, []);

  if (userList == null){
    return (
      <div className="userList" >
      <h2 className="title"> Usuários Cadastrados </h2>
        <p> Nenhum usuário encontrado </p>
    </div>
    )
  }
  else {
    return (
      <div className="userList" >
        <h2 className="title"> Usuários Cadastrados </h2>
        <List list={userList}></List>
      </div>
    );
  }
}

export default UserListPage;

interface ListProps {
  list: User[];
}

const List: React.FC<ListProps> = props => (
  <table>
    <tbody>
    {props.list.map((item : User) => (
        <ListItem key={item.id} item={item} />
    ))}
    </tbody>
  </table>
);

interface ListItemProps {
  key: number;
  item: User;
}

const ListItem: React.FC<ListItemProps> = props => (
  <tr>
    <td>
      <h2>{props.item.name}</h2>
      <p> <b>Email:</b> {props.item.email}</p>
      <p> <b>CPF:</b> {props.item.cpf}</p>
      <p> <b>Cargo:</b> {props.item.role}</p>
      <p> <b>Nascimento:</b> {props.item.birthDate}</p>
    </td>
  </tr>
);
