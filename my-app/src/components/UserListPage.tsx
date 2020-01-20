// src/components/UserListPage.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../types';
import {fetchUsers, fetchUser} from './UserListQueries';
import { Redirect } from 'react-router-dom';
import { H1 } from './atm/h1';
import { Button } from './atm/button';
import { PaginationFooter } from './mol/PaginationFooter'
import { List } from './mol/List';
import { PaginatedList } from './org/PaginatedList'


const UserListPage: React.FC = props => {
  const limit = 5;
  const [userList, setUserList] = useState();
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [redirectAddUser, setRedirectAddUser] = useState(false);
  const [redirectUserPage, setRedirectUserPage] = useState({active: false, value: 0});

  useEffect(() => {

    async function getUserList() {
      try{
        var usersData = await fetchUsers(offset,limit);
        setUserList(usersData.nodes);
        setCount(usersData.count);
      }
      catch(error){
        alert(error);
      }
    }

    getUserList();

  }, [offset, count]);

  //Negative amount = go to previous pages, positive amount = next pages
  function handleChangePage(amount: number){
    var newOffset = Math.min(offset + limit*amount, count-(count%limit));
    newOffset = Math.max(newOffset, 0); //no negative offset
    setOffset(newOffset);
  }

  async function handleUserClick(id: number){
    setRedirectUserPage({active: true, value: id})
  }
  function handleRedirect(){
    setRedirectAddUser(true);
  }

  if (redirectUserPage.active){
    return <Redirect push to={`/userdetail/${redirectUserPage.value}`}/>;
  }

  if (redirectAddUser) {
    return <Redirect push to="/adduser"/>;
  }

    return (
      <div className="userList" >
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <H1> Usuários Cadastrados </H1>
        {userList ? (
          <PaginatedList list={userList} onClick={handleUserClick} offset={offset} limit={limit}
          count={count} onChangePage={handleChangePage}/>
        ) : (
          <p> Nenhum usuário encontrado </p>
        )}
        <hr></hr>
        <Button large onClick={handleRedirect}> Adicionar Usuário </Button>
      </div>
    );
}

export default UserListPage;
