// src/components/UserListPage.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../types';
import {fetchUsers} from './UserListQueries'

const UserListPage: React.FC = props => {
  const limit = 5;
  const [userList, setUserList] = useState();
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

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
  function changePage(amount: number){
    var newOffset = Math.min(offset + limit*amount, count-(count%limit));
    newOffset = Math.max(newOffset, 0); //no negative offset
    setOffset(newOffset);
  }

    return (
      <div className="userList" >
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <h2 className="title"> Usuários Cadastrados </h2>
        {userList ? (
          <>
            <List list={userList}></List>
            <PaginationFooter offset={offset} limit={limit} count={count} changePage={changePage} ></PaginationFooter>
          </>
        ) : (
          <p> Nenhum usuário encontrado </p>
        )}

      </div>
    );
}

export default UserListPage;
interface FooterProps{
  offset: number,
  limit: number,
  count: number,
  changePage: (amount: number) => void
}

const PaginationFooter: React.FC<FooterProps> = props => (
  <div>
    <button className='paginationButton' onClick={() => props.changePage(-1)}> <i className="fa fa-chevron-left"></i> </button>
      <span className='paginationText'>Página {Math.ceil(props.offset/props.limit)} de {Math.floor(props.count/props.limit)}</span>
    <button className='paginationButton' onClick={() => props.changePage(+1)}> <i className="fa fa-chevron-right"></i> </button>
  </div>
);

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
      <p>{props.item.email}</p>
    </td>
  </tr>
);
