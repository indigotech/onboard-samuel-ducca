import * as React from 'react';
import { client } from '..';
import gql from 'graphql-tag';
import { User, UsersConnectionType } from '../types';

export async function getToken()
{
  let token = await localStorage.getItem("@onboarding/token");
  if (token == null){
    return '';
  }
  else{
    return token;
  }
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
