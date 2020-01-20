// src/components/UserListPage.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../types';
import {fetchUsers, fetchUser} from './UserListQueries';
import { Redirect } from 'react-router-dom';
import { H1 } from './atm/h1';
import { Button } from './atm/button';


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
          <>
            <List list={userList} handleClick={handleUserClick}></List>
            <PaginationFooter offset={offset} limit={limit} count={count} onChangePage={handleChangePage} ></PaginationFooter>
          </>
        ) : (
          <p> Nenhum usuário encontrado </p>
        )}
        <hr></hr>
        <Button large onClick={handleRedirect}> Adicionar Usuário </Button>
      </div>
    );
}

export default UserListPage;
interface FooterProps{
  offset: number,
  limit: number,
  count: number,
  onChangePage: (amount: number) => void
}

const PaginationFooter: React.FC<FooterProps> = props => (
  <div>
    <button className='paginationButton' onClick={() => props.onChangePage(-1)}> <i className="fa fa-chevron-left"></i> </button>
      <span className='paginationText'>Página {Math.ceil(props.offset/props.limit)} de {Math.floor(props.count/props.limit)}</span>
    <button className='paginationButton' onClick={() => props.onChangePage(+1)}> <i className="fa fa-chevron-right"></i> </button>
  </div>
);

interface ListProps {
  list: User[];
  handleClick: (id:number) => void
}

const List: React.FC<ListProps> = props => (
  <table>
    <tbody>
    {props.list.map((item : User) => (
        <ListItem key={item.id} item={item} handleClick={props.handleClick}/>
    ))}
    </tbody>
  </table>
);

interface ListItemProps {
  key: number;
  item: User;
  handleClick: (id:number) => void
}

const ListItem: React.FC<ListItemProps> = props => (
  <tr>
    <td onClick={() => props.handleClick(props.item.id)}>
      <h2>{props.item.name}</h2>
      <p>{props.item.email}</p>
    </td>
  </tr>
);
