import * as React from 'react';
import { client } from '..';
import gql from 'graphql-tag';
import { User, UsersConnectionType, UserInputType} from '../types';

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

export async function createUser(user: UserInputType) : Promise<User>
{
  const CREATE_USER_MUTATION = gql`
  mutation createUser{
    UserCreate(data: {user: ${user})
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
