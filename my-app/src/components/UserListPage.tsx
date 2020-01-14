// src/components/UserListPage.tsx
import * as React from 'react';

const list = [
  {
    id: 1,
    name: 'Mark Hamill',
    email: 'mark@starwars.com',
  },
  {
    id: 2,
    name: 'John Boyega',
    email: 'johnnyboy@starwars.com',
  },
  {
    id: 3,
    name: 'Carrie Fischer',
    email: 'leiaorgana@starwars.com',
  },
  {
    id: 4,
    name: 'Liam Neelson',
    email: 'deathbydarthmaul@starwars.com',
  },
  {
    id: 5,
    name: 'Evan McGregor',
    email: 'hellothere@starwars.com',
  },
];

interface User {
  id: number;
  name: string;
  email: string;
}

function UserListPage() {
  return (
    <div className="userList" >
      <h2 className="title"> Usuários Cadastrados </h2>
      <List list={list}></List>
    </div>
  );
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
      <div>{props.item.email}</div>
    </td>
  </tr>
);
