import * as React from 'react';
import { client } from '..';
import gql from 'graphql-tag';
import { User, UsersConnectionType, UserInputType, UserRoleType} from '../types';

export async function getToken()
{
  let token = await localStorage.getItem("@onboarding/token");
  return token || '';
}

function buildContext(token?: string) {
  return {
    headers: {
      Authorization: token
    }
  }
}

export async function fetchUser(id:number) : Promise<User>
{
  const USER_QUERY = gql`
  query fetchUser{
    User(id:${id})
    {
      name,
      id,
      cpf,
      birthDate,
      email,
      role
    }
  }
  `;

    const token = await getToken();
    const context = buildContext(token);
    var result = await client.query({query: USER_QUERY, context: context})

    return result.data.User;
}


export async function fetchUsers(offset:number,limit:number) : Promise<UsersConnectionType>
{

    const token = await getToken();
    const context = buildContext(token);
    var result = await client.query({query: USERS_QUERY, variables:{offset: offset, limit:limit}, context: context})

    return result.data.Users;
}

export async function createUser(user: UserInputType) : Promise<UserInputType>
{
  var result = await client.mutate({mutation: CREATE_USER_MUTATION, variables: {user: user}});
  return result.data.UserCreate;
}

const CREATE_USER_MUTATION = gql`
mutation createUser($user: UserInput!){
  UserCreate(data: $user)
  {
    name,
    id,
    cpf,
    birthDate,
    email,
    role
  }
}
`;

const USERS_QUERY = gql`
query getUsers($offset: Int, $limit: Int){
  Users(offset: $offset, limit: $limit)
  {
    count
    nodes{
      id,
      name,
      email,
      cpf,
      role,
      birthDate
    }
    pageInfo{
      hasNextPage,
      hasPreviousPage
    }
  }
}
`;
