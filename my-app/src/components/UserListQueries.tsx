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
  const USERS_QUERY = gql`
  query getUsers{
    Users(offset:${offset}, limit:${limit})
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

    const token = await getToken();
    const context = buildContext(token);
    var result = await client.query({query: USERS_QUERY, context: context})

    return result.data.Users;
}

export async function createUser(user: UserInputType) : Promise<UserInputType>
{
  const CREATE_USER_MUTATION = gql`
  mutation createUser{
    UserCreate(data:{
      name: \"${user.name}\",
      cpf: \"${user.cpf}\",
      birthDate: \"${user.birthDate}\",
      email: \"${user.email}\",
      password: \"${user.password}\",
      role: ${UserRoleType[user.role]}
    })
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
  var result = await client.mutate({mutation: CREATE_USER_MUTATION});
  return result.data.UserCreate;
}
